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
import {
  BulbFilled,
  DollarCircleFilled,
  UserSwitchOutlined,
  UsergroupAddOutlined,
  SettingFilled,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
const { Paragraph, Title } = Typography;

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
                  Prospective sponsors submit a project for evaluation by College of Engineering faculty
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
                  Organizations provide financial support to cover project expenses and program fees
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
                  Students are assigned to a selected project and paired with a faculty advisor
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
                  Weekly sessions with the technical mentor are scheduled for the entire project duration (January – June)
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
              Cultivate productive relationships through hands-on projects.
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
              Enhance visibility and reputation within the academic community.
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
              Gain fresh insights and innovative solutions to tackle complex challenges
            </Paragraph>
          </Col>
          <Col span={11} style={{ margin: "1% 0% 1% 2%", borderBottom: "1px solid #dee2e6" }}>
            <Row>
              <Col span={22}>
                <Title
                  level={3}
                  style={{ fontWeight: "700", color: "#85754d" }}
                >
                  UMBC partnerships
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
              Build meaningful partnerships within the university ecosystem
            </Paragraph>
          </Col>
        </Row>
      </Col>
      <Col span={6} style={{ padding: "0 2%" }}>
        <Row>
          <Col span={24} className="cardBgColor">
            <Card
              title="Software Engineering Faculty"
              bordered={true}
              style={{ width: 300, borderRadius: "0px" }}
            >
              <Card bordered={false}>
                <Row>
                  <img
                    src={
                      "https://webadmin.umbc.edu/admin/CV/Photo?campus_id=VN52654"
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
                        level={3}
                        style={{ fontWeight: "700", color: "#000" }}
                      >
                        Mohammad Samarah
                      </Title>
                      <Title level={5}>Professor of the Practice, <br />
                      Software Engineering, Information Systems</Title>
                      <a href="mailto:msamarah@umbc.edu">msamarah@umbc.edu</a>
                    </p>
                  </Row>
                </Row>
              </Card>
              <Card bordered={false}>
                <Row>
                  <img
                    src={
                      "https://lh3.googleusercontent.com/a-/ALV-UjXP_4kv82JpoxXCl1U7ypgODNRjRmpl8DDbNQ089myV0COoebA=s544-p-k-no"
                    }
                    width={"100%"}
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
                        level={3}
                        style={{ fontWeight: "700", color: "#000" }}
                      >
                        Melissa Morris
                      </Title>
                      <Title level={5}>Faculty Member, <br />
                      Ph.D. Mechanical Engineering</Title>
                      <a href="mailto:melissam@umbc.edu">melissam@umbc.edu</a>
                      <br />
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
