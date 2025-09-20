import React, { useState } from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button
} from "@mui/material";

export default function CheckInDialog({ open, onClose, onSubmit }) {
    const [licensePlate, setLicensePlate] = useState("");

    const handleSubmit = () => {
        if (licensePlate.trim() === "") return;
        onSubmit(licensePlate);
        setLicensePlate("");
    };

    const handleClose = () => {
        setLicensePlate("");
        onClose();
    };

    return (
        <Dialog open={open} onClose={handleClose} maxWidth="xs" fullWidth>
            <DialogTitle align="center" sx={{ fontWeight: "bold" }}>
                Nhập biển số xe
            </DialogTitle>
            <DialogContent dividers>
                <TextField
                    autoFocus
                    fullWidth
                    label="Biển số xe"
                    value={licensePlate}
                    onChange={(e) => setLicensePlate(e.target.value)}
                />
            </DialogContent>
            <DialogActions>
                <Button
                    onClick={handleClose}
                    variant="outlined"
                    color="inherit"
                    sx={{ textTransform: "none" }}
                >
                    Huỷ
                </Button>
                <Button
                    onClick={handleSubmit}
                    variant="contained"
                    color="primary"
                    sx={{ textTransform: "none" }}
                >
                    Xác nhận
                </Button>
            </DialogActions>
        </Dialog>
    );
}
