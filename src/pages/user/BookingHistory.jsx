import React from "react";
import {
  Typography,
  Button,
  Box,
  Card,
  CardContent,
  Grid,
} from "@mui/material";
import { cancelBooking } from "../../services/user/user.service";
import { getBookings } from "../../services/user/user.service";
import { useEffect } from "react";


export default function BookingHistory() {
  const [history, setHistory] = React.useState([]);

const getBookingsHistory = async () => {
  try {
    const res = await getBookings();

    setHistory(Array.isArray(res.data.data) ? res.data.data : []);
  } catch (error) {
    console.error("Error fetching bookings:", error);
    setHistory([]); // Fallback to an empty array on error
  }
};

  useEffect(() => {
		getBookingsHistory();
	}, []);

  const statusMapping = {
  booked: "Đã đặt",
  "checked-in": "Đang đỗ",
  "check-out": "Hoàn thành",
  cancelled: "Đã hủy",
};


  const handleCancel = async (id) => {
    const res = await cancelBooking({ id });
    if (res.status === 200) {
      alert("Hủy thành công");
      getBookingsHistory();
    } else {
      alert("Hủy thất bại");
    }
  };

  return (
    <Box sx={{ display: "flex", height: "100vh", flexDirection: "column",  alignItems: "center" }}>
      <Box  sx={{ mt: 4,
                  px: 4,
                  minWidth: "99vw",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center"
            }}>
              {history.length === 0 && (
  <Typography sx={{ fontSize: "1.5rem", mt: 4 }}>No bookings found.</Typography>
)}
        {history.map((booking) => (
          <Card key={booking.id} sx={{ mb: 2, minWidth:"80vw", backgroundColor:
        booking.status === "cancelled"
          ? "#ff7474" 
          : booking.status === "check-in" || booking.status === "booked"
          ? "#deff8c" 
          : "#7aff85" 
          }}>
            <CardContent>
              <Grid
                container
                spacing={2}
                sx={{fontSize: "2rem"}}
              >
                <Grid item xs={12} sm={3} size={5}>
                  <Typography sx={{fontSize: "1.5rem"}}>ID: {booking.id}</Typography>
                  <Typography sx={{fontSize: "1.5rem"}}>Trạng thái: {statusMapping[booking.status] || "Không xác định"}</Typography>
                  <Typography sx={{fontSize: "1.5rem"}}>Thời gian vào: {booking.checkInTime
              ? new Date(booking.checkInTime).toLocaleString()
              : "N/A"}</Typography>
                </Grid>
                <Grid item xs={12} sm={3} size={5}>
                  <Typography sx={{fontSize: "1.5rem"}}>Vị trí: {booking.parkingSlotId}</Typography>
                  <Typography sx={{fontSize: "1.5rem"}}>Thời gian đặt: {booking.bookingTime
              ? new Date(booking.bookingTime).toLocaleString()
              : "N/A"}</Typography>
                  <Typography sx={{fontSize: "1.5rem"}}>Thời gian ra: {booking.checkOutTime
              ? new Date(booking.checkOutTime).toLocaleString()
              : "N/A"}</Typography>
                </Grid>
                <Grid item xs={12} sm={3} size="grow" sx={{display:"flex", alignItems: "center"}}>
                  {booking.status == "booked" && (
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() => handleCancel(booking.id)}
                      sx={{fontSize: "1.5rem"}}
                    >
                      Hủy
                    </Button>
                  )}
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
}
