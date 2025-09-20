import React from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Typography,
    Box,
    Button,
    Chip
} from "@mui/material";

const statusLabels = {
    available: "Trống",
    booked: "Đã đặt",
    occupied: "Đang đỗ"
};

const statusColors = {
    available: "success",
    booked: "warning",
    occupied: "error"
};

export default function ParkingSlotDialog({
    open,
    slot,
    onClose,
    onCheckIn,
    onCancel,
    onCheckOut
}) {
    if (!slot) return null;

    const { id, licensePlate, status, updatedAt } = slot;

    const getTimeLabel = () => {
        if (status === "booked") return "Thời điểm đặt:";
        if (status === "occupied") return "Thời điểm vào:";
        return null;
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
            <DialogTitle
                align="center"
                sx={{ fontWeight: "bold" }}
            >
                Thông tin chỗ đỗ xe
            </DialogTitle>
            <DialogContent >
                <Box display="flex" justifyContent="space-between" mb={1}>
                    <Typography fontWeight={600} color="text.secondary">
                        Vị trí đỗ:
                    </Typography>
                    <Typography>{id}</Typography>
                </Box>

                {status && (
                    <Box display="flex" justifyContent="space-between" mb={1}>
                        <Typography fontWeight={600} color="text.secondary">
                            Trạng thái:
                        </Typography>
                        <Chip
                            label={statusLabels[status] || status}
                            color={statusColors[status]}
                            size="small"
                            sx={{ fontWeight: "bold" }}
                        />
                    </Box>
                )}

                {licensePlate && (
                    <Box display="flex" justifyContent="space-between" mb={1}>
                        <Typography fontWeight={600} color="text.secondary">
                            Biển số xe:
                        </Typography>
                        <Typography>{licensePlate}</Typography>
                    </Box>
                )}

                {updatedAt && getTimeLabel() && (
                    <Box display="flex" justifyContent="space-between" mb={1}>
                        <Typography fontWeight={600} color="text.secondary">
                            {getTimeLabel()}
                        </Typography>
                        <Typography>
                            {new Date(updatedAt).toLocaleString("vi-VN")}
                        </Typography>
                    </Box>
                )}
            </DialogContent>
            <DialogActions>
                {status === "available" && (
                    <Button onClick={() => onCheckIn(slot)} variant="contained" color="success">
                        Check in
                    </Button>
                )}
                {status === "booked" && (
                    <>
                        <Button onClick={() => onCheckIn(slot)} variant="contained" color="success">
                            Check in
                        </Button>
                        <Button onClick={() => onCancel(slot)} variant="outlined" color="warning">
                            Huỷ
                        </Button>
                    </>
                )}
                {status === "occupied" && (
                    <Button onClick={() => onCheckOut(slot)} variant="contained" color="error">
                        Check out
                    </Button>
                )}
                <Button onClick={onClose} variant="contained" color="primary">
                    Đóng
                </Button>
            </DialogActions>
        </Dialog>
    );
}
