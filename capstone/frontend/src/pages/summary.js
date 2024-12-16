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
  Card,
} from "antd";
import { useNavigate } from "react-router-dom";
const { Paragraph, Title } = Typography;
import {
  BulbFilled,
  DollarCircleFilled,
  UserSwitchOutlined,
  UsergroupAddOutlined,
  SettingFilled,
} from "@ant-design/icons";

function Summary() {
  return (
    <>
      <Col span={18}>
        <Title level={1} style={{ fontWeight: "700", color: "#faad14" }}>
          How it Works
        </Title>
        <Row style={{ padding: "2%", backgroundColor: "#faad1440" }}>
          <Col span={6}>
            <Row>
              <Col span={24}>
                <BulbFilled style={{ fontSize: "2rem", color: "#faad14" }} />
              </Col>
              <Col span={24}>
                <Title
                  level={4}
                  style={{ fontWeight: "700", color: "#faad14" }}
                >
                  Innovation
                </Title>
              </Col>
              <Col span={24}>
                <Paragraph
                  style={{
                    fontSize: "16px",
                    fontWeight: 600,
                    color: "rgb(0, 0, 0)",
                    paddingRight: "5%",
                  }}
                >
                  Potential sponsors propose a project for review by College of
                  Engineering faculty
                </Paragraph>
              </Col>
            </Row>
          </Col>
          <Col span={6}>
            <Row>
              <Col span={24}>
                <DollarCircleFilled
                  style={{ fontSize: "2rem", color: "#faad14" }}
                />
              </Col>
              <Col span={24}>
                <Title
                  level={4}
                  style={{ fontWeight: "700", color: "#faad14" }}
                >
                  Sponsorship
                </Title>
              </Col>
              <Col span={24}>
                <Paragraph
                  style={{
                    fontWeight: 600,
                    fontSize: "16px",
                    color: "rgb(0, 0, 0)",
                    paddingRight: "5%",
                  }}
                >
                  Organizations commit financially to cover project costs and
                  program fee
                </Paragraph>
              </Col>
            </Row>
          </Col>
          <Col span={6}>
            <Row>
              <Col span={24}>
                <UserSwitchOutlined
                  style={{ fontSize: "2rem", color: "#faad14" }}
                />
              </Col>
              <Col span={24}>
                <Title
                  level={4}
                  style={{ fontWeight: "700", color: "#faad14" }}
                >
                  Team matching
                </Title>
              </Col>
              <Col span={24}>
                <Paragraph
                  style={{
                    fontWeight: 600,
                    fontSize: "16px",
                    color: "rgb(0, 0, 0)",
                    paddingRight: "5%",
                  }}
                >
                  Students are matched to an approved project and faculty mentor
                </Paragraph>
              </Col>
            </Row>
          </Col>
          <Col span={6}>
            <Row>
              <Col span={24}>
                <UsergroupAddOutlined
                  style={{ fontSize: "2rem", color: "#faad14" }}
                />
              </Col>
              <Col span={24}>
                <Title
                  level={4}
                  style={{ fontWeight: "700", color: "#faad14" }}
                >
                  Mentorship
                </Title>
              </Col>
              <Col span={24}>
                <Paragraph
                  style={{
                    fontWeight: 600,
                    fontSize: "16px",
                    color: "rgb(0, 0, 0)",
                    paddingRight: "5%",
                  }}
                >
                  Technical mentor meets with the team weekly for project
                  duration (January – June)
                </Paragraph>
              </Col>
            </Row>
          </Col>
        </Row>
        <Title
          level={1}
          style={{ fontWeight: "700", color: "#faad14", paddingTop: "5%" }}
        >
          Benefits to sponsors
        </Title>
        <Row style={{ padding: "2% 0" }}>
          <Col span={11} style={{ margin: "1% 2% 1% 0%", borderBottom: "1px solid #dee2e6" }}>
            <Row>
              <Col span={22}>
                <Title
                  level={3}
                  style={{ fontWeight: "700", color: "#85754d" }}
                >
                  Meaningful engagement
                </Title>
              </Col>
              <Col span={2}>
                <SettingFilled
                  style={{
                    fontSize: "28px",
                    paddingTop: "12%",
                    color: "#faad14",
                  }}
                />
              </Col>
            </Row>
            <Paragraph
              style={{ fontSize: "18px", color: "#000", fontWeight: "400" }}
            >
              Customized opportunities to assess student talent and recruit for
              jobs
            </Paragraph>
          </Col>
          <Col span={11} style={{ margin: "1% 0% 1% 2%", borderBottom: "1px solid #dee2e6" }}>
            <Row>
              <Col span={22}>
                <Title
                  level={3}
                  style={{ fontWeight: "700", color: "#85754d" }}
                >
                  Brand recognition
                </Title>
              </Col>
              <Col span={2}>
                <SettingFilled
                  style={{
                    fontSize: "28px",
                    paddingTop: "12%",
                    color: "#faad14",
                  }}
                />
              </Col>
            </Row>
            <Paragraph
              style={{ fontSize: "18px", color: "#000", fontWeight: "400" }}
            >
              Boost public awareness of your organization through student
              engagement
            </Paragraph>
          </Col>
          <Col span={11} style={{ margin: "1% 2% 1% 0%", borderBottom: "1px solid #dee2e6" }}>
            <Row>
              <Col span={22}>
                <Title
                  level={3}
                  style={{ fontWeight: "700", color: "#85754d" }}
                >
                  Creative problem-solving
                </Title>
              </Col>
              <Col span={2}>
                <SettingFilled
                  style={{
                    fontSize: "28px",
                    paddingTop: "12%",
                    color: "#faad14",
                  }}
                />
              </Col>
            </Row>
            <Paragraph
              style={{ fontSize: "18px", color: "#000", fontWeight: "400" }}
            >
              Low-cost opportunity for a fresh look at a problem
            </Paragraph>
          </Col>
          <Col span={11} style={{ margin: "1% 0% 1% 2%", borderBottom: "1px solid #dee2e6" }}>
            <Row>
              <Col span={22}>
                <Title
                  level={3}
                  style={{ fontWeight: "700", color: "#85754d" }}
                >
                  UW partnerships
                </Title>
              </Col>
              <Col span={2}>
                <SettingFilled
                  style={{
                    fontSize: "28px",
                    paddingTop: "12%",
                    color: "#faad14",
                  }}
                />
              </Col>
            </Row>
            <Paragraph
              style={{ fontSize: "18px", color: "#000", fontWeight: "400" }}
            >
              Build impactful connections within the UW College of Engineering
            </Paragraph>
          </Col>
          <Col span={11} style={{ margin: "1% 2% 1% 0%" }}>
            <Row>
              <Col span={22}>
                <Title
                  level={3}
                  style={{ fontWeight: "700", color: "#85754d" }}
                >
                  Professional development
                </Title>
              </Col>
              <Col span={2}>
                <SettingFilled
                  style={{
                    fontSize: "28px",
                    paddingTop: "12%",
                    color: "#faad14",
                  }}
                />
              </Col>
            </Row>
            <Paragraph
              style={{ fontSize: "18px", color: "#000", fontWeight: "400" }}
            >
              Opportunity for technical mentor to practice and apply leadership
              skills
            </Paragraph>
          </Col>
          <Col span={11} style={{ margin: "1% 0% 1% 2%" }}>
            <Row>
              <Col span={22}>
                <Title
                  level={3}
                  style={{ fontWeight: "700", color: "#85754d" }}
                >
                  Commercial licenses
                </Title>
              </Col>
              <Col span={2}>
                <SettingFilled
                  style={{
                    fontSize: "28px",
                    paddingTop: "12%",
                    color: "#faad14",
                  }}
                />
              </Col>
            </Row>
            <Paragraph
              style={{ fontSize: "18px", color: "#000", fontWeight: "400" }}
            >
              Non-exclusive commercial license to any IP developed through
              project
            </Paragraph>
          </Col>
        </Row>
      </Col>
      <Col span={6} style={{ padding: "0 2%" }}>
        <Row>
          <Col span={24} className="cardBgColor">
            <Card
              title="Title"
              bordered={true}
              style={{ width: 300, borderRadius: "0px" }}
            >
              <Card bordered={false}>
                <Row>
                  <img
                    src={
                      "https://www.engr.washington.edu/files/industry/imgs/jill-dalinkus.png"
                    }
                  />
                </Row>
                <Row style={{ border: "1px solid #0000002e", padding: "10px" }}>
                  <Row>
                    <p
                      style={{
                        fontWeight: "600",
                        color: "#000",
                        fontSize: "14px",
                      }}
                    >
                      <Title
                        level={5}
                        style={{ fontWeight: "700", color: "#000" }}
                      >
                        Name
                      </Title>
                      CoE Industry <br />
                      Capstone Program Director
                      <br />
                      206-221-7955
                      <br />
                      <a href="mailto:jmd4@uw.edu">jmd4@uw.edu</a>
                      <br />
                      201 Engineering Annex
                    </p>
                  </Row>
                </Row>
              </Card>
              <Card bordered={false}>
                <Row>
                  <img
                    src={
                      "https://www.engr.washington.edu/files/industry/imgs/jill-dalinkus.png"
                    }
                  />
                </Row>
                <Row style={{ border: "1px solid #0000002e", padding: "10px" }}>
                  <Row>
                    <p
                      style={{
                        fontWeight: "600",
                        color: "#000",
                        fontSize: "14px",
                      }}
                    >
                      <Title
                        level={5}
                        style={{ fontWeight: "700", color: "#000" }}
                      >
                        Name
                      </Title>
                      CoE Industry <br />
                      Capstone Program Director
                      <br />
                      206-221-7955
                      <br />
                      <a href="mailto:jmd4@uw.edu">jmd4@uw.edu</a>
                      <br />
                      201 Engineering Annex
                    </p>
                  </Row>
                </Row>
              </Card>
            </Card>
          </Col>
        </Row>
      </Col>
    </>
  );
}

export default Summary;
