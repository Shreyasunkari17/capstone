import React, { useState, useEffect } from "react";
import {
  Button,
  Typography,
  Row,
  Col,
  Divider,
  Input,
  Table,
  message,
} from "antd";
import { useNavigate } from "react-router-dom";
import Summary from "./summary";
const { Title } = Typography;
const { Search } = Input;

function Home() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [featuredProjects, setFeaturedProjects] = useState([]);

  const handleSearch = () => {
    navigate(`/projects?search=${searchQuery}`);
  };

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
      title: "Department",
      dataIndex: "department",
      sorter: (a, b) => a.department > b.department,
      filterMode: "tree",
      filterSearch: true,
      filters: [
        ...new Map(
          featuredProjects
            ?.map(({ department }) => {
              return { value: department, text: department };
            })
            ?.map((item) => [item["text"], item])
        ).values(),
      ],
      onFilter: (value, record) => record.department.startsWith(value),
    },
    {
      title: "Bookmarks",
      dataIndex: "bookmark_count",
    },
    {
      title: "Views",
      dataIndex: "no_of_views",
    },
  ];

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch(
          "http://3.129.207.78:5000/api/get_featured_projects",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch featured projects");
        }

        const data = await response.json();
        setFeaturedProjects(data);
      } catch (error) {
        message.error(
          "Failed to load featured projects. Please try again later."
        );
      }
    };

    fetchProjects();
  }, []);

  return (
    <div className="home-layout">
      <Row align={"center"}>
        <Divider
          style={{
            borderColor: "#faad14",
          }}
        >
          <Title
            level={3}
            style={{ color: "#faad14", textTransform: "uppercase" }}
          >
            Welcome to the Capstone Portfolio
          </Title>
        </Divider>
      </Row>
      <Row align={"center"} style={{ margin: "10px 10%" }}>
        <Title level={5} style={{ color: "#000", textAlign: "center" }}>
          Browse, upload, and discover capstone projects from students and
          faculty.
        </Title>
      </Row>
      <Row align={"center"} style={{ margin: "10px 10%" }}>
        <Title level={5} style={{ color: "#000", textAlign: "center" }}>
          <b>Student Portfolio Projects: </b> UMBC graduate Program students
          work 1-on-1 with their instructors to design and create a capstone
          project at the end of their programs.
        </Title>
      </Row>
      <Row align={"center"} style={{ margin: "10px 10%" }}>
        <Title level={5} style={{ color: "#000", textAlign: "center" }}>
          Through this project, students are able to implement and showcase the
          software skills they learned during their training. Once completed,
          capstone projects serve as portfolio pieces that students can feel
          proud to call their own and utilize at job interviews to demonstrate
          their real-world knowledge and abilities.
        </Title>
      </Row>
      <Row align={"center"} style={{ margin: "10px 10%" }}>
        <Col span={10}>
          <Button
            type="primary"
            style={{ width: "200px" }}
            className="logout-btn btn-font"
            onClick={() => navigate("/projects")}
          >
            Explore All Projects
          </Button>
        </Col>
        <Col span={10} className="search-btn">
          <form onSubmit={handleSearch}>
            <Search
              placeholder="Search projects..."
              allowClear
              onSearch={handleSearch}
              onChange={(e) => setSearchQuery(e.target.value)}
              enterButton
              value={searchQuery}
            />
          </form>
        </Col>
      </Row>
      <Row style={{ padding: "3% 0" }}>
          <Summary />
      </Row>
      <div className="users-list-layout" style={{ margin: "10px 10%" }}>
        <Row>
          <Col span={24}>
            <Title level={2}>Featured Projects</Title>
          </Col>
        </Row>
        <Table
          columns={columns}
          dataSource={featuredProjects}
          rowSelection={null}
        />
      </div>
    </div>
  );
}

export default Home;
