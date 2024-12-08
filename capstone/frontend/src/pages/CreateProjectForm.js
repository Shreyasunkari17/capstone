import React, { useState } from "react";
import { UploadOutlined } from "@ant-design/icons";
import { Row, Col, Input, Select, Upload, Button, Form, message } from "antd";
//import axios from "axios"; // Import axios for making HTTP requests
import Title from "antd/es/typography/Title";

function CreateProjectForm({
  formData,
  setFormData,
  userList,
  mode,
  departments,
}) {
  const years = [2020, 2021, 2022, 2023, 2024, 2025];
  const sponsors = ['MNM', 'DNM', 'VNM'];

  // Handle file change (this is where we store the actual file object)
  const handleFileChange = (info) => {
    const file = info.file;
    setFormData({ ...formData, file });  // Update formData with actual file object
  };

  // Handle form data change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async () => {
    // Check if a file is selected
    if (!formData.file) {
      message.error("Please select a file.");
      return;
    }

    // Prepare FormData for submission
    const data = new FormData();
    
    // Append all form fields to FormData (except for the 'file' field)
    Object.keys(formData).forEach((key) => {
      if (key !== "file") {
        data.append(key, formData[key]);
      }
    });

    // Append the file to FormData
    data.append("file", formData.file);  // Append the actual file object

    // try {
    //   // Send the POST request to Flask backend
    //   const response = await axios.post("http://localhost:5000/upload_project", data, {
    //     headers: {
    //       "Content-Type": "multipart/form-data", // Tell the server that it's a file upload
    //     },
    //   });

    //   // Success message
    //   message.success("Project uploaded successfully!");
    //   console.log(response.data);
    // } catch (error) {
    //   console.error("Error uploading project:", error);
    //   message.error("Failed to upload project.");
    // }
  };

  return (
    <Form onFinish={handleSubmit}>
      <Row className="mb-4">
        <Col span={24} className="mb-4">
          <Form.Item
            label="Title"
            name="title"
            rules={[{ required: true, message: "Please enter a project title" }]}
          >
            <Input
              placeholder="Enter Title"
              value={formData.title}
              onChange={handleChange}
              name="title"
              maxLength={200}
            />
          </Form.Item>
        </Col>
        <Col span={24} className="mb-4">
          <Form.Item
            label="Abstract"
            name="abstract"
            rules={[{ required: true, message: "Please enter a project abstract" }]}
          >
            <Input.TextArea
              placeholder="Enter Description"
              value={formData.abstract}
              onChange={handleChange}
              name="abstract"
              maxLength={1000000}
            />
          </Form.Item>
        </Col>
        <Col span={12} className="mb-4">
          <Form.Item label="Team Members" name="team_members">
            <Input
              placeholder="Enter Team Members"
              style={{ width: "90%" }}
              value={formData.team_members}
              onChange={handleChange}
              name="team_members"
              maxLength={200}
            />
          </Form.Item>
        </Col>
        <Col span={12} className="mb-4">
          <Form.Item label="Sponsor" name="sponsor">
            <Select
              value={formData?.sponsor}
              allowClear
              options={sponsors.map((s) => ({ value: s, label: s }))}
              name="sponsor"
              onChange={(e) => setFormData({ ...formData, sponsor: e })}
              placeholder="Select Sponsor"
            />
          </Form.Item>
        </Col>
        <Col span={12} className="mb-4">
          <Form.Item label="Created By" name="created_by">
            <Select
              value={formData?.created_by}
              style={{ width: "90%" }}
              allowClear
              options={userList?.map(({ id, name, department }) => ({
                value: id,
                label: `${name} - ${department}`,
              }))}
              name="created_by"
              onChange={(e) => setFormData({ ...formData, created_by: e })}
              placeholder="Select User"
            />
          </Form.Item>
        </Col>
        <Col span={12} className="mb-4">
          <Form.Item label="Year" name="year">
            <Select
              value={formData?.year}
              allowClear
              options={years.map((year) => ({ value: year, label: year }))}
              name="year"
              onChange={(e) => setFormData({ ...formData, year: e })}
              placeholder="Select Year"
            />
          </Form.Item>
        </Col>
        <Col span={24} className="mb-4">
          <Form.Item label="Project File" name="file">
            <Upload
              onChange={handleFileChange}
              showUploadList={false} // Prevent automatic file list display
              beforeUpload={() => false} // Prevent auto-upload, handle manually
            >
              <Button icon={<UploadOutlined />}>Select File</Button>
            </Upload>
            {formData.file && (
              <div style={{ marginTop: 10 }}>
                <Title level={5}>{formData.file.name}</Title>
              </div>
            )}
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
}

export default CreateProjectForm;
