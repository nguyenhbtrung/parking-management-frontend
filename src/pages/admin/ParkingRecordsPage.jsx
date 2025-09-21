// ParkingRecordsPage.jsx
import React, { useEffect, useState, useRef } from "react";
import {
    Box, TextField, MenuItem, Select, InputLabel, FormControl,
    Table, TableHead, TableRow, TableCell, TableBody, TableSortLabel,
    TableContainer, Paper, IconButton, Button, Chip,
    TablePagination, Dialog, DialogTitle, DialogContent, DialogActions,
    Snackbar, Alert, Typography, Stack, InputAdornment
} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

// import mock API (replace with real axios calls in production)
import { postAction } from "./mockApi";
import { getParkingRecords } from "../../services/admin/parkingRecord.service";

const statusColor = (s) => {
    switch (s) {
        case "booked": return "info";
        case "checked-in": return "success";
        case "check-out": return "default";
        case "cancelled": return "error";
        default: return "default";
    }
};

export default function ParkingRecordsPage() {
    const [rows, setRows] = useState([]);
    const [page, setPage] = useState(0); // 0-based for TablePagination
    const [limit, setLimit] = useState(10);
    const [total, setTotal] = useState(0);

    const [search, setSearch] = useState("");
    const [parkingRecordId, setParkingRecordId] = useState("");
    const [status, setStatus] = useState("");
    const [parkingSlotId, setParkingSlotId] = useState("");

    const [sortBy, setSortBy] = useState("createdAt");
    const [sortOrder, setSortOrder] = useState("DESC");

    const [loading, setLoading] = useState(false);

    // Dialog SNACK
    const [snackbar, setSnackbar] = useState({ open: false, severity: 'success', message: '' });

    // confirmation dialog
    const [confirm, setConfirm] = useState({ open: false, id: null, action: null });

    const searchRef = useRef(null); // debounce

    // Fetch function
    async function fetchData() {
        setLoading(true);
        try {
            const p = page + 1; // API is 1-based
            const res = await getParkingRecords({
                page: p,
                limit,
                search,
                parkingRecordId: parkingRecordId || undefined,
                status: status || undefined,
                parkingSlotId: parkingSlotId || undefined,
                sortBy,
                sortOrder
            });
            if (res.status === 200) {
                setRows(res.data.data);
                setTotal(res.data.pagination.total);
            } else {
                // console.error(err);
                setSnackbar({ open: true, severity: 'error', message: "Lấy dữ liệu thất bại" });
            }
        } catch (err) {
            console.error(err);
            setSnackbar({ open: true, severity: 'error', message: err.message || "Lấy dữ liệu thất bại" });
        } finally {
            setLoading(false);
        }
    }

    // initial + dependencies fetch
    useEffect(() => {
        fetchData();
        // eslint-disable-next-line
    }, [page, limit, sortBy, sortOrder]);

    // debounce search + filters
    useEffect(() => {
        if (searchRef.current) clearTimeout(searchRef.current);
        searchRef.current = setTimeout(() => {
            setPage(0); // reset to first page whenever search/filters change
            fetchData();
        }, 400);
        return () => clearTimeout(searchRef.current);
        // eslint-disable-next-line
    }, [search, parkingRecordId, status, parkingSlotId]);

    // sorting handler
    const handleSort = (field) => {
        if (sortBy === field) {
            setSortOrder(prev => (prev === "ASC" ? "DESC" : "ASC"));
        } else {
            setSortBy(field);
            setSortOrder("DESC");
        }
    };

    // Pagination handlers
    const handleChangePage = (event, newPage) => setPage(newPage);
    const handleChangeRowsPerPage = (event) => {
        setLimit(parseInt(event.target.value, 10));
        setPage(0);
    };

    // Actions: open confirm dialog
    const openConfirm = (id, action) => setConfirm({ open: true, id, action });
    const closeConfirm = () => setConfirm({ open: false, id: null, action: null });

    const doAction = async () => {
        const { id, action } = confirm;
        if (!id || !action) return;
        closeConfirm();
        try {
            // optimistic: update UI after success
            await postAction(id, action); // in real: call axios POST to backend
            setSnackbar({ open: true, severity: 'success', message: `Thực hiện ${action} thành công` });
            // refetch
            fetchData();
        } catch (err) {
            setSnackbar({ open: true, severity: 'error', message: err.message || "Thao tác thất bại" });
        }
    };

    const closeSnackbar = () => setSnackbar(s => ({ ...s, open: false }));

    return (
        <Box p={2}>
            <Typography variant="h5" gutterBottom>Lượt gửi xe</Typography>

            <Paper sx={{ p: 2, mb: 2 }}>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} alignItems="center">
                    <TextField
                        size="small"
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        placeholder="Tìm theo biển số (VD: 34E-1111)"
                        InputProps={{
                            startAdornment: <InputAdornment position="start"><SearchIcon /></InputAdornment>
                        }}
                        sx={{ minWidth: 260 }}
                    />

                    <TextField
                        size="small"
                        label="Mã gửi xe (ID)"
                        value={parkingRecordId}
                        onChange={e => setParkingRecordId(e.target.value.replace(/\D/g, ''))}
                        sx={{ width: 140 }}
                    />

                    <TextField
                        select
                        size="small"
                        label="Trạng thái"
                        value={status}
                        onChange={e => setStatus(e.target.value)}
                        sx={{ width: 180 }}
                    >
                        <MenuItem value="">Tất cả</MenuItem>
                        <MenuItem value="booked">booked</MenuItem>
                        <MenuItem value="checked-in">checked-in</MenuItem>
                        <MenuItem value="check-out">check-out</MenuItem>
                        <MenuItem value="cancelled">cancelled</MenuItem>
                    </TextField>

                    <TextField
                        size="small"
                        label="Vị trí đỗ (slot)"
                        value={parkingSlotId}
                        onChange={e => setParkingSlotId(e.target.value.replace(/\D/g, ''))}
                        sx={{ width: 160 }}
                    />

                    <Box flexGrow={1} />

                    <Button onClick={() => { setSearch(""); setParkingRecordId(""); setStatus(""); setParkingSlotId(""); setPage(0); fetchData(); }}>
                        Reset bộ lọc
                    </Button>
                </Stack>
            </Paper>

            <Paper>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell sortDirection={sortBy === "id" ? sortOrder.toLowerCase() : false}>
                                    <TableSortLabel active={sortBy === "id"} direction={sortOrder.toLowerCase()} onClick={() => handleSort("id")}>ID</TableSortLabel>
                                </TableCell>
                                <TableCell>
                                    Biển số
                                </TableCell>
                                <TableCell>
                                    Người dùng
                                </TableCell>
                                <TableCell>
                                    Vị trí
                                </TableCell>
                                <TableCell sortDirection={sortBy === "status" ? sortOrder.toLowerCase() : false}>
                                    <TableSortLabel active={sortBy === "status"} direction={sortOrder.toLowerCase()} onClick={() => handleSort("status")}>Trạng thái</TableSortLabel>
                                </TableCell>
                                <TableCell sortDirection={sortBy === "bookingTime" ? sortOrder.toLowerCase() : false}>
                                    <TableSortLabel active={sortBy === "bookingTime"} direction={sortOrder.toLowerCase()} onClick={() => handleSort("bookingTime")}>Thời gian đặt</TableSortLabel>
                                </TableCell>
                                <TableCell>Check-in</TableCell>
                                <TableCell>Check-out</TableCell>
                                <TableCell align="right">Hành động</TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {rows.map(row => (
                                <TableRow key={row.id} hover>
                                    <TableCell>{row.id}</TableCell>
                                    <TableCell>{(row.licensePlate || "").trim() || <em>—</em>}</TableCell>
                                    <TableCell>{row.user?.username || "—"}</TableCell>
                                    <TableCell>{row.parkingSlotId ?? "—"}</TableCell>
                                    <TableCell>
                                        <Chip label={row.status} color={statusColor(row.status)} size="small" />
                                    </TableCell>
                                    <TableCell>{row.bookingTime ? new Date(row.bookingTime).toLocaleString() : "—"}</TableCell>
                                    <TableCell>{row.checkInTime ? new Date(row.checkInTime).toLocaleString() : "—"}</TableCell>
                                    <TableCell>{row.checkOutTime ? new Date(row.checkOutTime).toLocaleString() : "—"}</TableCell>
                                    <TableCell align="right">
                                        <Stack direction="row" spacing={1} justifyContent="flex-end">
                                            {row.status === "booked" && (
                                                <>
                                                    <Button
                                                        size="small"
                                                        variant="contained"
                                                        startIcon={<CheckIcon />}
                                                        onClick={() => openConfirm(row.id, "check-in")}
                                                    >
                                                        Check in
                                                    </Button>
                                                    <Button
                                                        size="small"
                                                        variant="outlined"
                                                        color="error"
                                                        startIcon={<CloseIcon />}
                                                        onClick={() => openConfirm(row.id, "cancel")}
                                                    >
                                                        Huỷ
                                                    </Button>
                                                </>
                                            )}

                                            {row.status === "checked-in" && (
                                                <Button
                                                    size="small"
                                                    variant="contained"
                                                    color="secondary"
                                                    startIcon={<ExitToAppIcon />}
                                                    onClick={() => openConfirm(row.id, "check-out")}
                                                >
                                                    Check out
                                                </Button>
                                            )}

                                            {(row.status !== "booked" && row.status !== "checked-in") && (
                                                <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>—</Typography>
                                            )}
                                        </Stack>
                                    </TableCell>
                                </TableRow>
                            ))}

                            {rows.length === 0 && (
                                <TableRow>
                                    <TableCell colSpan={9} align="center" sx={{ py: 4 }}>
                                        Không có dữ liệu
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>

                <TablePagination
                    component="div"
                    count={total}
                    page={page}
                    onPageChange={handleChangePage}
                    rowsPerPage={limit}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    rowsPerPageOptions={[5, 10, 20, 50]}
                />
            </Paper>

            {/* Confirm dialog */}
            <Dialog open={confirm.open} onClose={closeConfirm}>
                <DialogTitle>Xác nhận</DialogTitle>
                <DialogContent>
                    <Typography>
                        Bạn có chắc muốn thực hiện hành động <strong>{confirm.action}</strong> cho bản ghi <strong>{confirm.id}</strong> ?
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={closeConfirm}>Huỷ</Button>
                    <Button onClick={doAction} variant="contained">Xác nhận</Button>
                </DialogActions>
            </Dialog>

            {/* Snackbar */}
            <Snackbar open={snackbar.open} autoHideDuration={4000} onClose={closeSnackbar}>
                <Alert onClose={closeSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </Box>
    );
}
