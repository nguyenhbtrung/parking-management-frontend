import { Box, Paper, Typography } from "@mui/material";

// Dữ liệu mũi tên
const arrows = [
    { id: 1, x: 150, y: 45, direction: "left" },
    { id: 2, x: 150, y: 530, direction: "right" },
    { id: 3, x: 390, y: 45, direction: "left" },
    { id: 4, x: 390, y: 530, direction: "right" },
    { id: 5, x: 630, y: 45, direction: "left" },
    { id: 6, x: 630, y: 530, direction: "right" },

    { id: 7, x: 20, y: 170, direction: "down" },
    { id: 8, x: 20, y: 420, direction: "down" },

    { id: 9, x: 760, y: 170, direction: "down" },
    { id: 10, x: 760, y: 420, direction: "down" },

    { id: 11, x: 270, y: 170, direction: "down" },
    { id: 12, x: 270, y: 420, direction: "down" },

    { id: 13, x: 510, y: 170, direction: "down" },
    { id: 14, x: 510, y: 420, direction: "down" },
];

const doubleArrows = [
    { id: 1, x: 140, y: 300, direction: "right" },
    { id: 2, x: 380, y: 300, direction: "right" },
    { id: 3, x: 620, y: 300, direction: "right" },
];




// Component vẽ ô
const Slot = ({ id, status, x, y, licensePlate, openSide, scale = 1, isAdmin = true, onSlotClick }) => {
    let bg = "white";
    let color = "black";
    let borderColor = "#aaa";

    if (!isAdmin) {
        if (status !== "available") {
            bg = "#FFB3B3";
            // borderColor = "#D00000";
            color = "darkred";
        }
    } else {
        if (status === "booked") {
            bg = "#FFEB99";
            // borderColor = "#E0B000";
        }
        if (status === "occupied") {
            bg = "#FFB3B3";
            // borderColor = "#D00000";
            color = "darkred";
        }
    }

    const borders = {
        borderTop: `2px solid ${borderColor}`,
        borderRight: `2px solid ${borderColor}`,
        borderBottom: `2px solid ${borderColor}`,
        borderLeft: `2px solid ${borderColor}`,
    };

    if (openSide) {
        borders[`border${openSide.charAt(0).toUpperCase() + openSide.slice(1)}`] = "none";
    }

    return (
        <Box
            onClick={() => onSlotClick && onSlotClick(id)} // 👈 Thêm hàm xử lý sự kiện click
            sx={{
                position: "absolute",
                left: x * scale,
                top: 16 + y * scale,
                width: 80 * scale,
                height: 40 * scale,
                bgcolor: bg,
                ...borders,
                borderRadius: "2px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 12 * scale,
                fontWeight: 500,
                color,
                cursor: 'pointer',
                transition: 'transform 0.2s',
                '&:hover': {
                    transform: 'scale(1.05)',
                    bgcolor: "#6c90beff",
                    color: "white"
                },
                '&:active': {
                    transform: 'scale(0.95)',
                }
            }}
        >
            <div>{id}</div>
            {(licensePlate && isAdmin) && <div style={{ fontSize: 9 * scale }}>{licensePlate}</div>}
        </Box>
    );
};



const Arrow = ({ x, y, direction = "left", color = "#bbb", length = 40, height = 20, scale = 1 }) => {
    let rotate = 0;
    switch (direction) {
        case "right":
            rotate = 0;
            break;
        case "left":
            rotate = 180;
            break;
        case "up":
            rotate = -90;
            break;
        case "down":
            rotate = 90;
            break;
    }

    const headLength = height / 2; // phần đầu tam giác
    const shaftLength = length - headLength;
    const shaftTopWidth = height * 0.6;   // đáy trên nhỏ hơn đáy dưới
    const shaftBottomWidth = height * 0.8; // đáy dưới lớn hơn

    return (
        <Box
            sx={{
                position: "absolute",
                left: x * scale,
                top: y * scale,
                transform: `rotate(${rotate}deg)`,
                transformOrigin: "center",
            }}
        >
            <svg
                width={length * scale}
                height={height * scale}
                viewBox={`0 0 ${length} ${height}`}
            >
                {/* Thân mũi tên (hình thang) */}
                <polygon
                    points={`
                        0,${(height - shaftBottomWidth) / 2}
                        ${shaftLength},${(height - shaftTopWidth) / 2}
                        ${shaftLength},${(height + shaftTopWidth) / 2}
                        0,${(height + shaftBottomWidth) / 2}
                    `}
                    fill={color}
                />
                {/* Đầu mũi tên (tam giác) */}
                <polygon
                    points={`
                        ${shaftLength},0
                        ${length},${height / 2}
                        ${shaftLength},${height}
                    `}
                    fill={color}
                />
            </svg>
        </Box>
    );
};

const DoubleArrow = ({ x, y, direction = "left", color = "#bbb", length = 60, height = 20, scale = 1 }) => {
    let rotate = 0;
    switch (direction) {
        case "right":
            rotate = 0;
            break;
        case "left":
            rotate = 180;
            break;
        case "up":
            rotate = -90;
            break;
        case "down":
            rotate = 90;
            break;
    }

    const headLength = height / 2; // chiều dài mỗi đầu tam giác
    const shaftLength = length - 2 * headLength; // thân nằm giữa
    const shaftTopWidth = height * 0.6;
    const shaftBottomWidth = height * 0.8;

    return (
        <Box
            sx={{
                position: "absolute",
                left: x * scale,
                top: y * scale,
                transform: `rotate(${rotate}deg)`,
                transformOrigin: "center",
            }}
        >
            <svg
                width={length * scale}
                height={height * scale}
                viewBox={`0 0 ${length} ${height}`}
            >
                {/* Đầu trái tam giác */}
                <polygon
                    points={`
                        0,${height / 2}
                        ${headLength},0
                        ${headLength},${height}
                    `}
                    fill={color}
                />
                {/* Thân hình thang */}
                <polygon
                    points={`
                        ${headLength},${(height - shaftTopWidth) / 2}
                        ${headLength + shaftLength},${(height - shaftTopWidth) / 2}
                        ${headLength + shaftLength},${(height + shaftTopWidth) / 2}
                        ${headLength},${(height + shaftTopWidth) / 2}
                    `}
                    fill={color}
                />
                {/* Đầu phải tam giác */}
                <polygon
                    points={`
                        ${headLength + shaftLength},0
                        ${length},${height / 2}
                        ${headLength + shaftLength},${height}
                    `}
                    fill={color}
                />
            </svg>
        </Box>
    );
};

const ParkingMap = ({ mapWidth, mapHeight, scale, slots, isAdmin, onSlotClick }) => {
    return (
        <Box sx={{ position: "relative", width: mapWidth * scale, height: mapHeight * scale, ml: 4 }}>
            {/* Vẽ slot */}
            {slots.map((slot) => (
                <Slot
                    key={slot.id}
                    {...slot}
                    scale={scale}
                    isAdmin={isAdmin}
                    onSlotClick={onSlotClick}
                />
            ))}

            {/* Lối vào / Lối ra */}
            <Paper
                sx={{ position: "absolute", right: 0 * scale, top: 30 * scale, backgroundColor: "#03ca00ff", width: 10 * scale, height: 60 * scale, borderRadius: '4px 0px 0px 4px' }}
            />
            <Typography
                sx={{ position: "absolute", right: 20 * scale, top: 50 * scale, color: "#03ca00ff", fontWeight: "bold" }}
            >
                Lối vào
            </Typography>
            <Paper
                elevation={0}
                sx={{ position: "absolute", right: 0 * scale, top: 120 * scale, backgroundColor: "#edededff", width: 10 * scale, height: 370 * scale, borderRadius: '4px 0px 0px 4px' }}
            />
            <Paper
                sx={{ position: "absolute", right: 0 * scale, bottom: 30 * scale, backgroundColor: "red", width: 10 * scale, height: 60 * scale, borderRadius: '4px 0px 0px 4px' }}
            />
            <Typography
                sx={{ position: "absolute", right: 20 * scale, bottom: 50 * scale, color: "red", fontWeight: "bold" }}
            >
                Lối ra
            </Typography>

            {/* Các mũi tên (chỉ minh họa) */}
            {arrows.map((arrow) => (
                <Arrow key={arrow.id} {...arrow} scale={scale} />
            ))}

            {doubleArrows.map((arrow) => (
                <DoubleArrow key={arrow.id} {...arrow} scale={scale} />
            ))}


        </Box>
    );
};

export default ParkingMap;