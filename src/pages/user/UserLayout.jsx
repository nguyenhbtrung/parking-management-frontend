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

export default function UserLayout() {
	const [anchorEl, setAnchorEl] = React.useState(null);
	const handleMenu = (event) => {
		setAnchorEl(event.currentTarget);
	};
	const navigate = useNavigate();

	const handleClose = () => {
		setAnchorEl(null);
	};

	const navigateBooking = () => {
		navigate("/user/booking");
	}

	return <Box>
	<AppBar position="fixed" color="white" sx={{ p: 1, bgcolor: "#2C2C2C", color: "white"  }}>
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
          <Box sx={{ display:"flex"}}>
            <Button onClick={navigateBooking} variant="outlined" sx={{ mr: 2, color:"lightGreen", borderColor:"lightGreen" }}>
              Đặt chỗ
            </Button>
            <Box onClick={handleMenu} sx={{ p: 1, display:"flex"}}>
              <Typography variant="body1" sx={{ ml: 1 }}>
                username
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