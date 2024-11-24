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

    localStorage.setItem("role", "Admin");
    localStorage.setItem("id", "7");
    localStorage.setItem("name", "Admin");
    localStorage.setItem("email", "admin@example.com");
    
    try {
      const response = await fetch("http://3.129.207.78:5000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(state),
        credentials: "include",
      });

      if (response.ok) {
        setIsAuthenticated(true);
        localStorage.setItem("role", response.data.role);
        localStorage.setItem("id", response.data.id);
        localStorage.setItem("name", response.data.name);
        localStorage.setItem("email", response.data.email);
        navigate(response.data.role === "Admin" ? "/users" : "/projects");
        setShowLoader(false);
      } else {
        const errorData = await response.json();
        setShowLoader(false);
        message.error(errorData.message);
      }
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
