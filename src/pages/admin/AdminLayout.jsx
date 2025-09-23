// AdminLayout.jsx
import React, { useState } from "react";
import {
    Box,
    Drawer,
    IconButton,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Tooltip,
    Divider,
    Typography,
} from "@mui/material";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import {
    Menu as MenuIcon,
    GridView,
    ListAlt,
    Edit,
    Logout,
    DirectionsCar,
    Map,
    Person,
} from "@mui/icons-material";
import { collapsedWidth, drawerWidth } from "../../appConst";
import { removeAccessToken } from "../../services/auth.service";

const menuItems = [
    { text: "Sơ đồ bãi xe", icon: <Map />, path: "/admin" },
    { text: "Lượt gửi xe", icon: <ListAlt />, path: "/admin/records" },
    { text: "Người dùng", icon: <Person />, path: "/admin/users" },
];

export default function AdminLayout() {
    const [open, setOpen] = useState(true);
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = () => {
        removeAccessToken();
        navigate("/login");
    };

    return (
        <Box sx={{ display: "flex", height: "100vh", maxWidth: "100%" }}>
            {/* Sidebar */}
            <Drawer
                variant="permanent"
                sx={{
                    width: open ? drawerWidth : collapsedWidth,
                    flexShrink: 0,
                    "& .MuiDrawer-paper": {
                        width: open ? drawerWidth : collapsedWidth,
                        boxSizing: "border-box",
                        bgcolor: "#2C2C2C",
                        color: "white",
                        transition: "width 0.3s",
                    },
                }}
            >
                {/* Header */}
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        p: 2,
                        justifyContent: open ? "space-between" : "center",
                    }}
                >
                    {open && (
                        <Typography
                            variant="h6"
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 1,
                            }}
                        >
                            <DirectionsCar sx={{ color: "#BFB2FF", fontSize: 32 }} /> Parking Lot
                        </Typography>
                    )}
                    <IconButton onClick={() => setOpen(!open)} sx={{ color: "#555555ff" }}>
                        <MenuIcon />
                    </IconButton>
                </Box>

                <Divider sx={{ borderColor: "rgba(255,255,255,0.1)" }} />

                {/* Menu Items */}
                <List sx={{ flexGrow: 1, px: 1, py: 2 }}>
                    {menuItems.map((item) => {
                        const selected = location.pathname === item.path;
                        return (
                            <Tooltip
                                key={item.text}
                                title={!open ? item.text : ""}
                                placement="right"
                                arrow
                            >
                                <ListItemButton
                                    onClick={() => navigate(item.path)}
                                    sx={{
                                        borderRadius: 1.5,
                                        "&:hover": { bgcolor: "#333333" },
                                        mb: 0.5,
                                    }}
                                >
                                    <ListItemIcon
                                        sx={{
                                            color: selected && !open ? "#BFB2FF" : "white",
                                            minWidth: 40,
                                        }}
                                    >
                                        {item.icon}
                                    </ListItemIcon>
                                    {open && (
                                        <ListItemText
                                            primary={item.text}
                                            primaryTypographyProps={{
                                                style: {
                                                    color: selected ? "#BFB2FF" : "#686868",
                                                    fontSize: "0.9rem",   // giảm cỡ chữ
                                                },
                                            }}
                                        />
                                    )}
                                </ListItemButton>
                            </Tooltip>
                        );
                    })}
                </List>

                {/* Logout */}
                <Box sx={{ mt: "auto", px: 1, pb: 2 }}>
                    <Tooltip title={!open ? "Đăng xuất" : ""} placement="right" arrow>
                        <ListItemButton
                            onClick={handleLogout}
                            sx={{
                                borderRadius: 1.5,
                                "&:hover": { bgcolor: "#333333" },
                            }}
                        >
                            <ListItemIcon sx={{ color: "white", minWidth: 40 }}>
                                <Logout />
                            </ListItemIcon>
                            {open && (
                                <ListItemText
                                    primary="Đăng xuất"
                                    primaryTypographyProps={{
                                        style: { color: "#686868", fontSize: "0.9rem" },
                                    }}
                                />
                            )}
                        </ListItemButton>
                    </Tooltip>
                </Box>


            </Drawer>

            {/* Nội dung */}
            <Box component="main" sx={{ flexGrow: 1, p: 3, display: "flex", flexDirection: "column", width: "100%" }}>
                <Outlet />
            </Box>
        </Box>
    );
}
