import React from "react";
import {
	AppBar,
	Toolbar,
	Typography,
	Button,
	Box,
	Menu,
	MenuItem,
} from "@mui/material";
import DirectionsCar from "@mui/icons-material/DirectionsCar";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { getUserProfile } from "../../services/user/user.service";
import { useEffect } from "react";
import { removeAccessToken } from "../../services/auth.service";


export default function UserLayout() {
	const [anchorEl, setAnchorEl] = React.useState(null);
	const [username, setUsername] = React.useState("");

	const getUserProfileAsync = async () => {
		try {
			const res = await getUserProfile();
			if (res.data && res.data.data) {
				setUsername(res.data.data.username); // Access the nested data
			} else {
				console.error("Unexpected API response structure:", res);
			}
		} catch (error) {
			console.error("Error fetching user profile:", error);
		}
	};

	useEffect(() => {
		getUserProfileAsync();
	}, []);


	const handleMenu = (event) => {
		setAnchorEl(event.currentTarget);
	};
	const navigate = useNavigate();

	const handleClose = () => {
		removeAccessToken();
		navigate("/login");
		setAnchorEl(null);
	};

	const navigateBooking = () => {
		navigate("/");
	}

	const navigateHistory = () => {
		navigate("/history");
	}

	return <Box>
		<AppBar position="fixed" color="white" sx={{ p: 1, bgcolor: "#2C2C2C", color: "white" }}>
			<Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
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
				</Box>
				<Box sx={{ display: "flex" }}>
					<Button onClick={navigateHistory} variant="text" sx={{ mr: 2, color: "white" }}>
						Lịch sử
					</Button>
					<Button onClick={navigateBooking} variant="text" sx={{ mr: 2, color: "lightGreen" }}>
						Đặt chỗ
					</Button>
					<Box onClick={handleMenu} sx={{ p: 1, display: "flex" }}>
						<Typography variant="body1" sx={{ ml: 1 }}>
							{username}
						</Typography>
						<KeyboardArrowDownIcon />
					</Box>
					<Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
						<MenuItem onClick={handleClose}>Đăng xuất</MenuItem>
					</Menu>
				</Box>
			</Toolbar>
		</AppBar>
		<Toolbar /> {/* Spacer for fixed AppBar */}
		<Outlet />
	</Box>
}