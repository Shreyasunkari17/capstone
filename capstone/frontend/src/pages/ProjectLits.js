import React, { useState, useEffect } from "react";
import {
  Button,
  message,
  Table,
  Typography,
  Row,
  Col,
  Popconfirm,
  Modal,
  Spin,
  Input,
} from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  UsergroupAddOutlined,
  QuestionCircleOutlined,
  HeartOutlined,
  HeartFilled,
  BookOutlined,
  BookFilled
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import CreateProjectForm from "./CreateProjectForm";
const { Title } = Typography;
const { Search } = Input;

function ProjectLits({ isAuthenticated }) {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState();
  const [openModal, setOpenModal] = useState(false);
  const [mode, setMode] = useState("create");
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    abstract: "",
    team_members: "",
    created_by: "",
    department: "",
    year: "",
    sponsor: "",
    is_featured: false,
    file: null,
  });
  const [showLoader, setShowLoader] = useState(false);
  const urlParams = new URLSearchParams(window.location.search);
  const searchKey = urlParams.get("search");
  const [searchQuery, setSearchQuery] = useState(searchKey || "");

  const handleSearch = () => {};

  const confirm = async () => {
    setShowLoader(true);
    setOpen(false);
    try {
      const body = {
        project_id: selectedRecord.id
      }
      const response = await fetch(
        `http://3.129.207.78:5000/api/remove_project`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body)
        }
      );
      const data = await response.json();
      setShowLoader(false);
      message.success("Project Deleted Successfully");
      fetchProjects()
    } catch (error) {
      setShowLoader(false);
      message.error("Error while deleting the Project");
    }
    setSelectedRecord(null);
  };

  const cancel = () => {
    setOpen(false);
    setSelectedRecord(null);
  };

  const handleOpenChange = (newOpen, record) => {
    setOpen(newOpen);
    setSelectedRecord(!newOpen ? null : record);
  };

  const fetchUsers = async () => {
    setShowLoader(true);
    try {
      const response = await fetch("http://3.129.207.78:5000/api/users");
      const data = await response.json();
      setUsers(data);
      setShowLoader(false);
    } catch (error) {
      setShowLoader(false);
      console.error("Failed to fetch users", error);
    }
    setOpenModal(true);
    setFormData({
      title: "",
      abstract: "",
      team_members: "",
      created_by: "",
      department: "",
      year: "",
      sponsor: "",
      is_featured: false,
      file: null,
    });
    setSelectedRecord(null);
  };

  const fetchDepartments = async () => {
    setShowLoader(true);
    try {
      const response = await fetch("http://3.129.207.78:5000/api/departments", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch departments");
      }
      setShowLoader(false);
      const data = await response.json();
      setDepartments(data);
    } catch (error) {
      setShowLoader(false);
      message.error("Failed to load departments. Please try again later.");
    }
  };

  const showModal = () => {
    setMode("create");
    fetchDepartments();
    fetchUsers();
  };

  const handleOk = async () => {
    setShowLoader(true);
    const requestBody = new FormData();
  
    // Append all form fields to FormData
    requestBody.append("title", formData.title);
    requestBody.append("abstract", formData.abstract);
    requestBody.append("team_members", formData.team_members);
    requestBody.append("year", formData.year);
    requestBody.append("sponsor", formData.sponsor);
    requestBody.append("created_by", formData.created_by); // Add selected user ID
  
    // If file is selected, append it to FormData
    if (formData.file) {
      requestBody.append("file", formData.file);
    }
  
    // Log the FormData before sending it
    console.log("FormData to be sent:", requestBody);
  
    try {
      const response = await fetch("http://3.129.207.78:5000/api/upload_project", {
        method: "POST",
        body: requestBody, // Send the FormData object directly
        // Do not set the Content-Type header. The browser will do that for you.
      });
  
      if (response.ok) {
        // Reset form data on success
        setFormData({
          title: "",
          abstract: "",
          team_members: "",
          created_by: "",
          department: "",
          year: "",
          sponsor: "",
          is_featured: false,
          file: null,
        });
        setOpenModal(false);
        setSelectedRecord(null);
        setShowLoader(false);
        message.success("Project Added Successfully");
      } else {
        setShowLoader(false);
        message.error("Error while creating the project");
      }
    } catch (error) {
      setShowLoader(false);
      console.error("Error creating project:", error);
      message.error("Error while submitting the form");
    }
  };
  

  const handleSubmit = async () => {
    setShowLoader(true);
    const requestBody = new FormData();
    requestBody.append("title", formData.title);
    requestBody.append("abstract", formData.abstract);
    requestBody.append("team_members", formData.team_members);
    requestBody.append("created_by", formData.created_by); // Add selected user ID
    if (formData.file) requestBody.append("file", formData.file);
    try {
      const response = await fetch(
        `http://3.129.207.78:5000/api/project/${selectedRecord.id}`,
        {
          method: "PUT",
          body: JSON.stringify(requestBody),
        }
      );

      if (response.ok) {
        setFormData({
          title: "",
          abstract: "",
          team_members: "",
          created_by: "",
          department: "",
          year: "",
          sponsor: "",
          is_featured: false,
          file: null,
        });
        setOpenModal(false);
        setSelectedRecord(null);
        message.success("Project Created Successfully");
      } else {
        message.error("Error while creating the Project");
      }
    } catch (error) {
      console.error("Error creating Project:", error);
    }
  };

  const handleCancel = (record) => {
    setOpenModal(false);
    setSelectedRecord(null);
  };

  const fetchProjectDetails = async (record) => {
    let projectData 
    setShowLoader(true);
    try {
      const response = await fetch(
        `http://3.129.207.78:5000/api/project/${record.id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        message.error("Failed to fetch project details");
      }
      const data = await response.json();
      projectData = data
      setShowLoader(false);
    } catch (error) {
      setShowLoader(false);
      message.error("Error fetching project details:", error);
    }
    // let projectData = {
    //   abstract: "Real Time Analysis of Live Data",
    //   created_by: {
    //     email: "alice.admin@example.com",
    //     name: "Alice Admin",
    //   },
    //   department: "Computer Science",
    //   id: 1,
    //   media_files: [
    //     {
    //       file_name: "report.pdf",
    //       file_path: "/files/project_a/report.pdf",
    //     },
    //   ],
    //   team_members: ["John", "Jane"],
    //   title: "Real Time Analysis ",
    // };
    await fetchDepartments();
    await fetchUsers();
    setFormData({
      title: projectData.title,
      abstract: projectData.abstract,
      team_members: projectData.team_members.join(", "),
      created_by: projectData.created_by.name,
      department: projectData.department,
      year: projectData.year,
      sponsor: projectData.sponsor,
      is_featured: projectData.is_featured,
      file: projectData.media_files[0],
    });
    setSelectedRecord(projectData);
    setOpenModal(true);
    setMode("edit");
  };

  const addToFavourites = async (record) => {
    setShowLoader(true);
    try {
      const user = localStorage.getItem('id')
      const body = {
        user_id: parseInt(user),
        project_id: record.id
      }
      const response = await fetch(
        `http://3.129.207.78:5000/api/add_bookmark`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body)
        }
      );

      if (!response.ok) {
        message.error("Failed to add project to favourites");
      } else {
        message.success("Added to favorites successfully");
        fetchProjects()
      }
      setShowLoader(false);
    } catch (error) {
      setShowLoader(false);
      message.error("Error adding project to favourites:", error);
    }
  };

  const removeFromFavourites = async (record) => {
    setShowLoader(true);
    try {
      const user = localStorage.getItem('id')
      const body = {
        user_id: parseInt(user),
        project_id: record.id
      }
      const response = await fetch(
        `http://3.129.207.78:5000/api/remove_bookmark`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body)
        }
      );

      if (!response.ok) {
        message.error("Failed to remove project from favourites");
      } else {
        message.success("Removed project from favorites");
        fetchProjects()
      }
      setShowLoader(false);
    } catch (error) {
      setShowLoader(false);
      message.error("Error removing project from favourites:", error);
    }
  };

  const addToFeatured = async (record) => {
    setShowLoader(true);
    try {
      const user = localStorage.getItem('id')
      const body = {
        user_id: parseInt(user),
        project_id: record.id
      }
      const response = await fetch(
        `http://3.129.207.78:5000/api/add_featured`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body)
        }
      );

      if (!response.ok) {
        message.error("Failed to add project to featured list");
      } else {
        message.success("Added to featured list successfully");
        fetchProjects()
      }
      setShowLoader(false);
    } catch (error) {
      setShowLoader(false);
      message.error("Error adding project to featured list:", error);
    }
  };

  const removeFromFeatured = async (record) => {
    setShowLoader(true);
    try {
      const user = localStorage.getItem('id')
      const body = {
        user_id: parseInt(user),
        project_id: record.id
      }
      const response = await fetch(
        `http://3.129.207.78:5000/api/remove_featured`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body)
        }
      );

      if (!response.ok) {
        message.error("Failed to remove project from featured list");
      } else {
        message.success("Removed project from featured list");
        fetchProjects()
      }
      setShowLoader(false);
    } catch (error) {
      setShowLoader(false);
      message.error("Error removing project from featured list:", error);
    }
  };

  const userId = parseInt(localStorage.getItem('id'))
  const isAdmin = localStorage.getItem('role') == "Admin"

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
    },
    {
      title: "Project Title",
      dataIndex: "title",
      sorter: (a, b) => a.title > b.title,
      render: (text, record, index) => (
        <Title
          level={5}
          onClick={() => navigate(`/project/${record.id}`)}
          className="project-title-style "
        >
          {record.title}
        </Title>
      ),
    },
    {
      title: "Year",
      dataIndex: "year",
      sorter: (a, b) => a.year > b.year,
      filterMode: "tree",
      filterSearch: true,
      filters: [
        ...new Map(
          projects
            ?.map(({ year }) => {
              return { value: year, text: year };
            })
            ?.map((item) => [item["text"], item])
        ).values(),
      ],
      onFilter: (value, record) => record.year === value,
    },
    {
      title: "Department",
      dataIndex: "department",
      sorter: (a, b) => a.department > b.department,
      filterMode: "tree",
      filterSearch: true,
      filters: [
        ...new Map(
          projects
            ?.map(({ department }) => {
              return { value: department, text: department };
            })
            ?.map((item) => [item["text"], item])
        ).values(),
      ],
      onFilter: (value, record) => record.department.startsWith(value),
    },
    {
      title: "Sponsor",
      dataIndex: "sponsor",
      sorter: (a, b) => a.sponsor > b.sponsor,
      filterMode: "tree",
      filterSearch: true,
      filters: [
        ...new Map(
          projects
            ?.map(({ sponsor }) => {
              return { value: sponsor, text: sponsor };
            })
            ?.map((item) => [item["text"], item])
        ).values(),
      ],
      onFilter: (value, record) => record.sponsor.startsWith(value),
    },
    {
      title: "Action",
      dataIndex: "",
      key: "x",
      hidden: !isAuthenticated,
      render: (text, record, index) => (
        <>
          {(isAdmin || record.created_by == userId) && (<EditOutlined
            onClick={() => {
              fetchProjectDetails(record);
            }}
            className="action-pointers"
          />)}
          {(isAdmin || record.created_by == userId) && (<Popconfirm
            title="Delete the project"
            open={open && selectedRecord?.id === record.id}
            onOpenChange={(newOpen) => handleOpenChange(newOpen, record)}
            onConfirm={confirm}
            onCancel={cancel}
            okText="Yes"
            cancelText="No"
            description="Are you sure to delete this Project?"
            icon={<QuestionCircleOutlined style={{ color: "red" }} />}
          >
            <DeleteOutlined className="action-pointers" />
          </Popconfirm>)}
          {record.favorite ? (!isAdmin && <HeartFilled
            title="Remove from favourites"
            onClick={() => {
              removeFromFavourites(record);
            }}
            className="action-pointers"
          >
            <DeleteOutlined className="action-pointers" />
          </HeartFilled>) : (!isAdmin && <HeartOutlined
            title="Add to favourites"
            onClick={() => {
              addToFavourites(record);
            }}
            className="action-pointers"
          >
            <DeleteOutlined className="action-pointers" />
          </HeartOutlined>)}
          {record.is_featured ? (isAdmin && <BookFilled
            title="Remove as featured"
            onClick={() => {
              removeFromFeatured(record);
            }}
            className="action-pointers"
          >
            <DeleteOutlined className="action-pointers" />
          </BookFilled>) : (isAdmin && <BookOutlined
            title="Mark as featured"
            onClick={() => {
              addToFeatured(record);
            }}
            className="action-pointers"
          >
            <DeleteOutlined className="action-pointers" />
          </BookOutlined>)}
        </>
      ),
    },
  ];

  const fetchProjects = async () => {
    setShowLoader(true);
    try {
      const response = await fetch(`http://3.129.207.78:5000/api/projects?userId=${userId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch projects");
      }

      const data = await response.json();
      setProjects(data);
      setShowLoader(false);
    } catch (error) {
      setShowLoader(false);
      message.error("Failed to load projects. Please try again later.");
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <div className="users-list-layout">
      <Spin spinning={showLoader} size="large" fullscreen />
      <Row>
        <Col span={localStorage.getItem("role") === "Admin" ? 11 : 16}>
          <Title level={2}>Projects</Title>
        </Col>
        <Col span={8} className="search-btn" style={{ textAlign: "right" }}>
          <Search
            placeholder="Search projects..."
            allowClear
            onSearch={handleSearch}
            onChange={(e) => setSearchQuery(e.target.value)}
            enterButton
            value={searchQuery}
          />
        </Col>
        {localStorage.getItem("role") === "Admin" && (
          <Col span={5} style={{ textAlign: "right" }}>
            <Button
              type="primary"
              icon={<UsergroupAddOutlined />}
              iconPosition={"start"}
              className="logout-btn"
              onClick={showModal}
            >
              Create Project
            </Button>
          </Col>
        )}
      </Row>
      <Table
        columns={columns}
        dataSource={projects?.filter((val) =>
          (val?.title?.toLowerCase().includes(searchQuery?.toLowerCase()) || val?.abstract?.toLowerCase().includes(searchQuery?.toLowerCase()))
        )}
        rowSelection={null}
      />
      <Modal
        open={openModal}
        title={
          <Title level={2}>
            {mode === "edit" ? "Edit Project" : "Create Project"}
          </Title>
        }
        onCancel={handleCancel}
        width="60%"
        maskClosable={false}
        footer={(_, { OkBtn, CancelBtn }) => (
          <>
            <CancelBtn />
            <Button
              type="primary"
              className="logout-btn"
              onClick={mode === "edit" ? handleSubmit : handleOk}
            >
              Save
            </Button>
          </>
        )}
      >
        <CreateProjectForm
          formData={formData}
          setFormData={setFormData}
          userList={users}
          mode={mode}
          departments={departments}
        />
      </Modal>
    </div>
  );
}

export default ProjectLits;
