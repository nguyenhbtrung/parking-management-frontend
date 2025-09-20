import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Menu,
  MenuItem,
  Card,
  CardContent,
  Grid,
} from "@mui/material";

const bookings = [
  {
    id: 1,
    bienSo: "30A-12345",
    viTri: "A1",
    thoiGianDat: "2025-09-19 10:00",
    trangThai: "Đã đặt",
  },
  {
    id: 2,
    bienSo: "29B-56789",
    viTri: "B2",
    thoiGianDat: "2025-09-18 14:00",
    trangThai: "Hủy",
  },
  {
    id: 2,
    bienSo: "29B-56789",
    viTri: "B2",
    thoiGianDat: "2025-09-18 14:00",
    thoiGianVao: "2025-09-18 14:15",
    thoiGianRa: "2025-09-18 15:30",
    trangThai: "Hoàn thành",
  },
  {
    id: 2,
    bienSo: "29B-56789",
    viTri: "B2",
    thoiGianDat: "2025-09-18 14:00",
    thoiGianVao: "2025-09-18 14:15",
    thoiGianRa: "2025-09-18 15:30",
    trangThai: "Hoàn thành",
  },
  {
    id: 2,
    bienSo: "29B-56789",
    viTri: "B2",
    thoiGianDat: "2025-09-18 14:00",
    thoiGianVao: "2025-09-18 14:15",
    thoiGianRa: "2025-09-18 15:30",
    trangThai: "Hoàn thành",
  },
  {
    id: 2,
    bienSo: "29B-56789",
    viTri: "B2",
    thoiGianDat: "2025-09-18 14:00",
    thoiGianVao: "2025-09-18 14:15",
    thoiGianRa: "2025-09-18 15:30",
    trangThai: "Hoàn thành",
  },
];

export default function BookingHistory() {
  const [history, setHistory] = React.useState(bookings);
  const handleCancel = (id) => {
    setHistory((prev) =>
      prev.map((b) => (b.id === id ? { ...b, trangThai: "Hủy" } : b))
    );
  };

  return (
    <Box sx={{ display: "flex", height: "100vh", flexDirection: "column",  alignItems: "center" }}>
      {/* Header */}
      {/* Booking History */}
      <Box  sx={{ mt: 4,
                  px: 4,
                  minWidth: "99vw",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center"
            }}>
        {history.map((booking) => (
          <Card key={booking.id} sx={{ mb: 2, minWidth:"60vw", backgroundColor:
        booking.trangThai === "Hủy"
          ? "#ff7474" 
          : booking.trangThai === "Đang đỗ" || booking.trangThai === "Đã đặt"
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
                  <Typography sx={{fontSize: "1.5rem"}}>Trạng thái: {booking.trangThai}</Typography>
                  <Typography sx={{fontSize: "1.5rem"}}>Thời gian vào: {booking.thoiGianVao}</Typography>
                </Grid>
                <Grid item xs={12} sm={3} size={5}>
                  <Typography sx={{fontSize: "1.5rem"}}>Vị trí: {booking.viTri}</Typography>
                  <Typography sx={{fontSize: "1.5rem"}}>Thời gian đặt: {booking.thoiGianDat}</Typography>
                  <Typography sx={{fontSize: "1.5rem"}}>Thời gian ra: {booking.thoiGianRa}</Typography>
                </Grid>
                <Grid item xs={12} sm={3} size="grow" sx={{display:"flex", alignItems: "center"}}>
                  {booking.trangThai == "Đã đặt" && (
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
