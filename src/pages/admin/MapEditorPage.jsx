import React, { useState } from "react";
import { Paper, Button, IconButton, Menu, MenuItem } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { Rnd } from "react-rnd";

const statusColors = {
    available: "rgba(0,200,0,0.3)",
    reserved: "rgba(255,200,0,0.3)",
    occupied: "rgba(200,0,0,0.3)"
};

export default function MapEditorPage() {
    const [slots, setSlots] = useState([
        { id: 1, x: 50, y: 50, w: 80, h: 120, status: "available" },
        { id: 2, x: 200, y: 100, w: 80, h: 120, status: "occupied" }
    ]);
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedSlot, setSelectedSlot] = useState(null);

    const addSlot = () => {
        const newSlot = {
            id: Date.now(),
            x: 100,
            y: 100,
            w: 80,
            h: 120,
            status: "available"
        };
        setSlots([...slots, newSlot]);
    };

    const updateSlot = (id, data) => {
        setSlots(slots.map(s => (s.id === id ? { ...s, ...data } : s)));
    };

    const removeSlot = (id) => {
        setSlots(slots.filter(s => s.id !== id));
    };

    const handleOpenMenu = (event, slot) => {
        setAnchorEl(event.currentTarget);
        setSelectedSlot(slot);
    };

    const handleChangeStatus = (status) => {
        updateSlot(selectedSlot.id, { status });
        setAnchorEl(null);
        setSelectedSlot(null);
    };

    return (
        <div>
            <Button variant="contained" onClick={addSlot}>
                + Thêm chỗ đỗ
            </Button>
            <Button
                variant="outlined"
                sx={{ ml: 2 }}
                onClick={() => alert("TODO: call API lưu sơ đồ")}
            >
                Lưu sơ đồ
            </Button>

            <Paper
                sx={{
                    mt: 2,
                    width: "800px",
                    height: "600px",
                    position: "relative",
                    backgroundColor: "#f4f4f4",
                    border: "2px dashed #ccc"
                }}
            >
                {slots.map((slot) => (
                    <Rnd
                        key={slot.id}
                        size={{ width: slot.w, height: slot.h }}
                        position={{ x: slot.x, y: slot.y }}
                        onDragStop={(e, d) => updateSlot(slot.id, { x: d.x, y: d.y })}
                        onResizeStop={(e, direction, ref, delta, position) =>
                            updateSlot(slot.id, {
                                w: parseInt(ref.style.width),
                                h: parseInt(ref.style.height),
                                ...position
                            })
                        }
                        bounds="parent"
                        style={{
                            border: "2px solid #333",
                            backgroundColor: statusColors[slot.status],
                            position: "absolute"
                        }}
                        onContextMenu={(e) => {
                            e.preventDefault();
                            handleOpenMenu(e, slot);
                        }}
                    >
                        <div style={{ width: "100%", height: "100%", position: "relative" }}>
                            <IconButton
                                size="small"
                                sx={{
                                    position: "absolute",
                                    top: 0,
                                    right: 0,
                                    background: "white"
                                }}
                                onClick={() => removeSlot(slot.id)}
                            >
                                <DeleteIcon fontSize="small" />
                            </IconButton>
                            <span style={{ position: "absolute", bottom: 2, left: 2 }}>
                                {slot.id}
                            </span>
                        </div>
                    </Rnd>
                ))}
            </Paper>

            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={() => setAnchorEl(null)}
            >
                <MenuItem onClick={() => handleChangeStatus("available")}>
                    Để trống
                </MenuItem>
                <MenuItem onClick={() => handleChangeStatus("reserved")}>
                    Đặt trước
                </MenuItem>
                <MenuItem onClick={() => handleChangeStatus("occupied")}>
                    Đang đỗ
                </MenuItem>
            </Menu>
        </div>
    );
}
