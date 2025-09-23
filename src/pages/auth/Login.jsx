import React, { useState } from "react";
import {
  Avatar,
  Button,
  TextField,
  FormControlLabel,
  Checkbox,
  Link,
  Grid,
  Box,
  Typography,
  Container,
  Paper,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import bgImage from "../../../bg.webp"; // Import the background image
import { login, saveAccessToken } from "../../services/auth.service";

const LoginPage = () => {
  const [form, setForm] = useState({ username: "", password: "" });
  const navigate = useNavigate(); // Initialize useNavigate

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await login(form);
      if (response.status === 200) {
        alert("Đăng nhập thành công!");
        console.log("Login response:", response.data);
        saveAccessToken(response.data.data.token);
        navigate("/"); // Redirect to the booking page after login
      } else {
        alert("Đăng nhập thất bại!");
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert("Có lỗi xảy ra khi đăng nhập!");
    }
  };

  return (
    <Container
      component="main"
      maxWidth="sm"
      sx={{
        minHeight: "100vh",
        minWidth: "100vw",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        margin: 0,
        padding: 0,
        backgroundImage: `url(${bgImage})`, // Set the background image
        backgroundSize: "cover", // Ensure the image covers the entire container
        backgroundPosition: "center", // Center the image
        backgroundRepeat: "no-repeat", // Prevent the image from repeating
      }}
    >
      <Paper
        elevation={6}
        sx={{
          p: 4,
          width: "100%",
          maxWidth: 400,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          borderRadius: 3,
          backgroundColor: "rgba(255, 255, 255, 0.9)", // Add a semi-transparent background
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          HỆ THỐNG BÃI ĐỖ XE
        </Typography>
        <Typography component="h1" variant="h5">
          ĐĂNG NHẬP
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="Tên đăng nhập"
            name="username"
            autoFocus
            value={form.username}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Mật khẩu"
            type="password"
            id="password"
            value={form.password}
            onChange={handleChange}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Ghi nhớ đăng nhập"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2, py: 1.2 }}
          >
            Đăng nhập
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link
                variant="body2"
                sx={{ ml: 2, cursor: "pointer" }}
                onClick={() => navigate("/register")}
              >
                {"Đăng ký"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Container>
  );
};

export default LoginPage;
