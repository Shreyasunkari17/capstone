import React from "react";
import { UploadOutlined } from "@ant-design/icons";
import { Row, Col, Input, Select, Upload, Button } from "antd";
import Title from "antd/es/typography/Title";

function CreateProjectForm({
  formData,
  setFormData,
  userList,
  mode,
  departments,
}) {
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const years = [2020,2021,2022,2023,2024,2025]

  const sponsors = ['MNM', 'DNM', 'VNM']

  return (
    <form>
      <Row className="mb-4">
        <Col span={24} className="mb-4">
          <label className="block mb-2">Title:</label>
          <Input
            placeholder="Enter Title"
            value={formData.title}
            onChange={handleChange}
            name="title"
            maxLength={200}
          />
        </Col>
        <Col span={24} className="mb-4">
          <label className="block mb-2">Abstract:</label>
          <Input.TextArea
            placeholder="Enter Description"
            value={formData.abstract}
            onChange={handleChange}
            name="abstract"
            maxLength={1000000}
          />
        </Col>
        <Col span={12} className="mb-4">
          <label className="block mb-2">Team Members:</label>
          <Input
            placeholder="Enter Title"
            style={{ width: "98%" }}
            value={formData.team_members}
            onChange={handleChange}
            name="team_members"
            maxLength={200}
          />
        </Col>
        <Col span={12} className="mb-4">
          <label className="block mb-2">Sponsor:</label>
          <Select
            value={formData?.sponsor}
            style={{ width: "98%" }}
            allowClear
            options={sponsors?.map((s) => {
              return { value: s, label: s };
            })}
            name="sponsor"
            onChange={(e) => setFormData({ ...formData, sponsor: e })}
            placeholder="Select Sponsor"
          />
        </Col>
        <Col span={12} className="mb-4">
          <label className="block mb-2">Created By:</label>
          <Select
            value={formData?.created_by}
            style={{ width: "98%" }}
            allowClear
            options={userList?.map(({ id, name, department }) => {
              return { value: id, label: name + " - " + department };
            })}
            name="created_by"
            onChange={(e) => setFormData({ ...formData, created_by: e })}
            placeholder="Select User"
          />
        </Col>
        <Col span={12} className="mb-4">
          <label className="block mb-2">Year:</label>
          <Select
            value={formData?.year}
            style={{ width: "98%" }}
            allowClear
            options={years?.map((year) => {
              return { value: year, label: year };
            })}
            name="year"
            onChange={(e) => setFormData({ ...formData, year: e })}
            placeholder="Select Year"
          />
        </Col>
        <Col span={24} className="mb-4">
          <label className="block mb-2">Project File:</label>
          <Upload
            value={formData.file}
            maxCount={1}
            multiple={false}
            onChange={(e) => {
              setFormData({ ...formData, file: e.file });
            }}
          >
            <Button icon={<UploadOutlined />}>Select File</Button>
          </Upload>
          {mode === "edit" && formData.file && (
            <a
              target="_blank"
              href={`http://3.129.207.78:5000${formData.file.file_path}`}
            >
              <Title level={5}>{formData.file.file_name}</Title>
            </a>
          )}
        </Col>
      </Row>
    </form>
  );
}

export default CreateProjectForm;
