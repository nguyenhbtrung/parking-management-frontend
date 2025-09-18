import React, { useState } from "react";
import {
    Box, Button, Typography, Dialog, DialogTitle, DialogContent,
    DialogActions, TextField, Drawer, Table, TableBody, TableCell,
    TableContainer, TableHead, TableRow, Paper
} from "@mui/material";

const initialSpots = [
    { id: 1, x: 1, y: 1, status: "empty", plate: null },
    { id: 2, x: 2, y: 1, status: "occupied", plate: "29A-1234" },
    { id: 3, x: 3, y: 1, status: "reserved", plate: null },
    { id: 4, x: 1, y: 2, status: "empty", plate: null },
    { id: 5, x: 2, y: 2, status: "occupied", plate: "30B-5678" },
    { id: 6, x: 3, y: 2, status: "empty", plate: null },
];

export default function ParkingManagementPage() {
    const [parkingSpots, setParkingSpots] = useState(initialSpots);
    const [selectedSpot, setSelectedSpot] = useState(null);
    const [openDialog, setOpenDialog] = useState(false);
    const [plateInput, setPlateInput] = useState("");
    const [records, setRecords] = useState([]);

    const handleAddCar = () => {
        if (!selectedSpot) return;
        const updated = parkingSpots.map((s) =>
            s.id === selectedSpot.id ? { ...s, status: "occupied", plate: plateInput } : s
        );
        setParkingSpots(updated);
        setRecords([
            ...records,
            { id: records.length + 1, plate: plateInput, status: "check-in", spot: selectedSpot.id },
        ]);
        setPlateInput("");
        setOpenDialog(false);
    };

    const handleCheckout = (recordId) => {
        const record = records.find((r) => r.id === recordId);
        const updatedRecords = records.map((r) =>
            r.id === recordId ? { ...r, status: "check-out" } : r
        );
        setRecords(updatedRecords);
        const updatedSpots = parkingSpots.map((s) =>
            s.id === record.spot ? { ...s, status: "empty", plate: null } : s
        );
        setParkingSpots(updatedSpots);
    };

    return (
        <Box>
            <Typography variant="h4" gutterBottom>
                Quản lý chỗ đỗ
            </Typography>

            {/* Parking Map */}
            <Typography variant="h6">Sơ đồ bãi</Typography>
            <Box
                sx={{
                    display: "grid",
                    gridTemplateColumns: "repeat(3, 100px)",
                    gridTemplateRows: "repeat(2, 100px)",
                    gap: 2,
                    mb: 3,
                }}
            >
                {parkingSpots.map((spot) => (
                    <Button
                        key={spot.id}
                        variant="contained"
                        sx={{
                            gridColumn: spot.x,
                            gridRow: spot.y,
                            whiteSpace: "pre-line",
                        }}
                        color={
                            spot.status === "occupied"
                                ? "error"
                                : spot.status === "reserved"
                                    ? "warning"
                                    : "success"
                        }
                        onClick={() => setSelectedSpot(spot)}
                    >
                        {`#${spot.id}`} {spot.plate ? `\n${spot.plate}` : ""}
                    </Button>
                ))}
            </Box>

            {/* Spot Detail */}
            <Drawer anchor="right" open={!!selectedSpot} onClose={() => setSelectedSpot(null)}>
                <Box p={2} width={300}>
                    {selectedSpot && (
                        <>
                            <Typography variant="h6">Chỗ #{selectedSpot.id}</Typography>
                            <Typography>Trạng thái: {selectedSpot.status}</Typography>
                            {selectedSpot.plate && <Typography>Biển số: {selectedSpot.plate}</Typography>}

                            {selectedSpot.status === "empty" && (
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={() => setOpenDialog(true)}
                                    sx={{ mt: 2 }}
                                >
                                    Thêm xe
                                </Button>
                            )}
                        </>
                    )}
                </Box>
            </Drawer>

            {/* Add Car Dialog */}
            <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
                <DialogTitle>Thêm xe</DialogTitle>
                <DialogContent>
                    <TextField
                        label="Biển số"
                        fullWidth
                        value={plateInput}
                        onChange={(e) => setPlateInput(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenDialog(false)}>Hủy</Button>
                    <Button variant="contained" onClick={handleAddCar}>
                        Xác nhận
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Records Table */}
            <Typography variant="h6" mt={4}>
                Lượt gửi
            </Typography>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Biển số</TableCell>
                            <TableCell>Trạng thái</TableCell>
                            <TableCell>Chỗ</TableCell>
                            <TableCell>Thao tác</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {records.map((r) => (
                            <TableRow key={r.id}>
                                <TableCell>{r.id}</TableCell>
                                <TableCell>{r.plate}</TableCell>
                                <TableCell>{r.status}</TableCell>
                                <TableCell>{r.spot}</TableCell>
                                <TableCell>
                                    {r.status === "check-in" && (
                                        <Button
                                            variant="contained"
                                            color="secondary"
                                            onClick={() => handleCheckout(r.id)}
                                        >
                                            Check-out
                                        </Button>
                                    )}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
}
