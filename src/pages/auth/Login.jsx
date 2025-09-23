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

const LoginPage = () => {
  const [form, setForm] = useState({ username: "", password: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Login info:", form);
    // TODO: gọi API xác thực đăng nhập
  };

  return (
   <Container
  component="main"
  maxWidth="xs"
  sx={{
    minHeight: "100vh", // Chiều cao toàn màn hình
    minWidth: "100vw", // Chiều rộng toàn
    display: "flex", // Dùng flexbox
    alignItems: "center", // Căn giữa theo trục dọc
    justifyContent: "center", // Căn giữa theo trục ngang
    margin: 0,
    padding: 0,
  }}
>
  <Paper
    elevation={6}
    sx={{
      p: 4,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      borderRadius: 3,
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
      <Grid container justifyContent="space-between">
        <Grid item xs>
          <Link href="#" variant="body2">
            Quên mật khẩu?
          </Link>
        </Grid>
        <Grid item>
          <Link href="#" variant="body2" sx={{ ml: 2 }}>
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
