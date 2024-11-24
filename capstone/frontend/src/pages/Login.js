import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, message, Typography, Row, Spin, Divider, Input } from "antd";
const { Title } = Typography;

function Login({ setIsAuthenticated }) {
  const [showLoader, setShowLoader] = useState(false);
  const [state, setState] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleLogin = async () => {
    setShowLoader(true);
    try {
      await fetch("http://3.129.207.78:5000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(state),
      }).then(response => response.json())  // Parse JSON response
      .then(data => {
        setIsAuthenticated(true);
        localStorage.setItem("role", data.data.role);
        localStorage.setItem("id", data.data.id);
        localStorage.setItem("name", data.data.name);
        localStorage.setItem("email", data.data.email);
        navigate(data.data.role === "Admin" ? "/users" : "/projects");
        setShowLoader(false);
      }).catch(error => {
        message.error(
          "Failed to login. Please check your credentials or server."
        );
        setShowLoader(false);
      });
    } catch (error) {
      message.error(
        "Failed to login. Please check your credentials or server."
      );
      setShowLoader(false);
    }
    setIsAuthenticated(true);
    navigate("/users");
  };

  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  return (
    <div className="users-list-layout">
      <Spin spinning={showLoader} size="large" fullscreen />
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
            LOGIN
          </Title>
        </Divider>
      </Row>
      <Row align={"center"}>
        <Input
          placeholder="Enter Email"
          value={state.email}
          onChange={handleChange}
          name="email"
          maxLength={30}
          style={{ width: "300px" }}
        />
      </Row>
      <Row align={"center"} className="mt-8">
        <Input.Password
          placeholder="Enter Password"
          value={state.password}
          onChange={handleChange}
          name="password"
          maxLength={30}
          style={{ width: "300px" }}
        />
      </Row>
      <Row align={"center"}>
        <Button
          type="primary"
          onClick={handleLogin}
          iconPosition={"end"}
          className="logout-btn mt-12"
          style={{ width: "300px", fontWeight: 700 }}
        >
          Login
        </Button>
      </Row>
    </div>
  );
}

export default Login;
