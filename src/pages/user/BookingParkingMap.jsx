import ParkingMap from "../../components/ParkingMap";
import { Box, Typography } from "@mui/material";
import { drawerWidth } from "../../appConst";
import { useEffect, useState } from "react";
import { Button, TextField, Paper } from "@mui/material";
import { getParkingSlotsInfo } from "../../services/user/user.service";
import { slotPositions } from "../../data/slotPositions";
import { booking } from "../../services/user/user.service";

export default function BookingParkingMap() {
	const [slots, setSlots] = useState([]); // state cuối cùng để truyền vào ParkingMap
  const [selectedSlot, setSelectedSlot] = useState(null);
	const [bookingTime, setBookingTime] = useState("");


    const mapWidth = 840;
    const mapHeight = 610;
    const availableWidth = window.innerWidth - drawerWidth;
    const scale = (availableWidth / mapWidth) * 0.8;

    const getParkingSlotsAsync = async () => {
        const response = await getParkingSlotsInfo();
        if (response.status === 200) {
            const data = response.data.data;
            const stateMap = {};
        data.forEach((slot) => {
            stateMap[slot.id] = {
                ...slot,
                licensePlate: slot.licensePlate || null, // Default to null if missing
                updatedAt: slot.updatedAt || null,       // Default to null if missing
            };
        });

        // Merge slotPositions with the stateMap
        const mergedSlots = slotPositions.map((pos) => ({
            ...pos,
            ...(stateMap[pos.id] || {}), // Merge state data if available
        }));

        setSlots(mergedSlots);
        } else {
            alert("Lấy thông tin chỗ đỗ thất bại");
        }
    }

	  useEffect(() => {
       getParkingSlotsAsync()
    }, []);

    const onSlotClick = (id) => {
        const slot = slots.find(s => s.id === id);
        setSelectedSlot(slot);
    };

	  const handleSubmit = async () => {
      if (!selectedSlot) {
        alert("Hãy chọn một chỗ trong sơ đồ trước!");
        return;
      }
      if (!bookingTime) {
        alert("Hãy chọn thời gian muốn đặt!");
        return;
      }
      try {
    // Prepare the data in the format the API expects
        const requestData = {
          bookingTime, // From the form
          parkingSlotId: selectedSlot.id, // From the selected slot
        };

        // Call the booking API
        const response = await booking(requestData);

        if (response.status === 201) {
          alert("Đặt chỗ thành công!");
          console.log("Booking response:", response.data);
        } else {
          alert("Đặt chỗ thất bại!");
        }
      } catch (error) {
        console.error("Error during booking:", error);
        alert("Có lỗi xảy ra khi đặt chỗ!");
      }
    };

	return (
	<Box sx={{ ml: 4, mt: 4, display: "flex", gap: 4 }}>
		<Paper sx={{ flex: 1, p: 3, display: "flex", flexDirection: "column", gap: 2 }}>
        <Typography variant="h6">Đặt chỗ</Typography>

        <TextField
          label="Vị trí"
          value={selectedSlot ? selectedSlot.id : ""}
          InputProps={{ readOnly: true }}
        />

        <TextField
          label="Thời gian muốn đặt"
          type="datetime-local"
          InputLabelProps={{ shrink: true }}
          value={bookingTime}
          onChange={(e) => setBookingTime(e.target.value)}
        />

        <Button
          variant="contained"
          disabled={!selectedSlot || !bookingTime}
          onClick={handleSubmit}
        >
          Xác nhận đặt chỗ
        </Button>
      </Paper>
      {/* Bên trái: sơ đồ */}
      <Box sx={{ flex: 2 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Sơ đồ bãi xe
        </Typography>
        <ParkingMap
          mapWidth={mapWidth}
          mapHeight={mapHeight}
          scale={scale}
          slots={slots}
          isAdmin={false}
          onSlotClick={onSlotClick}
        />
      </Box>

      {/* Bên phải: form */}
    </Box>
	);
}