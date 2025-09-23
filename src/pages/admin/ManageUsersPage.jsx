import React, { useEffect, useState, useRef } from "react";
import {
    Box, TextField, MenuItem, Select, InputLabel, FormControl,
    Table, TableHead, TableRow, TableCell, TableBody, TableSortLabel,
    TableContainer, Paper, IconButton, Button, Chip,
    TablePagination, Dialog, DialogTitle, DialogContent, DialogActions,
    Snackbar, Alert, Typography, Stack, InputAdornment
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import { getUsers, createUser, updateUser, deleteUser } from "../../services/admin/user.service";

// Helper check thành công
const isSuccess = (res) => res && (res.status === 200 || res.status === 201 || res.status === 204);

const roleColor = (role) => {
    switch (role) {
        case "admin": return "error";
        case "user": return "default";
        default: return "default";
    }
};

export default function ManageUsersPage() {
    const [rows, setRows] = useState([]);
    const [page, setPage] = useState(0);
    const [limit, setLimit] = useState(10);
    const [total, setTotal] = useState(0);

    const [search, setSearch] = useState("");
    const [role, setRole] = useState("");

    const [sortBy, setSortBy] = useState("createdAt");
    const [sortOrder, setSortOrder] = useState("DESC");

    const [snackbar, setSnackbar] = useState({ open: false, severity: "success", message: "" });
    const [confirm, setConfirm] = useState({ open: false, id: null });
    const [dialog, setDialog] = useState({ open: false, mode: "create", user: null });

    const searchRef = useRef(null);

    async function fetchData() {
        try {
            const p = page + 1;
            const res = await getUsers({
                page: p,
                limit,
                username: search || undefined,
                role: role || undefined,
                sortBy,
                sortOrder,
            });

            if (isSuccess(res)) {
                setRows(res.data.data);
                setTotal(res.data.pagination.total);
            } else {
                setSnackbar({
                    open: true,
                    severity: "error",
                    message: `Lỗi: ${res.status} ${res.statusText || ""}`
                });
            }
        } catch (err) {
            setSnackbar({ open: true, severity: "error", message: err.message || "Lấy dữ liệu thất bại" });
        }
    }

    useEffect(() => { fetchData(); }, [page, limit, sortBy, sortOrder]);
    useEffect(() => {
        if (searchRef.current) clearTimeout(searchRef.current);
        searchRef.current = setTimeout(() => {
            setPage(0);
            fetchData();
        }, 400);
        return () => clearTimeout(searchRef.current);
    }, [search, role]);

    const handleSort = (field) => {
        if (sortBy === field) {
            setSortOrder(prev => prev === "ASC" ? "DESC" : "ASC");
        } else {
            setSortBy(field);
            setSortOrder("DESC");
        }
    };

    const handleChangePage = (e, newPage) => setPage(newPage);
    const handleChangeRowsPerPage = (e) => {
        setLimit(parseInt(e.target.value, 10));
        setPage(0);
    };

    const closeSnackbar = () => setSnackbar(s => ({ ...s, open: false }));

    // CRUD
    const handleSaveUser = async (user) => {
        try {
            let res;
            if (dialog.mode === "create") {
                res = await createUser(user);
                if (isSuccess(res)) {
                    setSnackbar({ open: true, severity: "success", message: "Thêm người dùng thành công" });
                } else {
                    throw new Error(`Lỗi ${res.status}`);
                }
            } else {
                res = await updateUser(dialog.user.id, user);
                if (isSuccess(res)) {
                    setSnackbar({ open: true, severity: "success", message: "Cập nhật người dùng thành công" });
                } else {
                    throw new Error(`Lỗi ${res.status}`);
                }
            }
            setDialog({ open: false, mode: "create", user: null });
            fetchData();
        } catch (err) {
            setSnackbar({ open: true, severity: "error", message: err.message || "Thao tác thất bại" });
        }
    };

    const handleDeleteUser = async () => {
        try {
            const res = await deleteUser(confirm.id);
            if (isSuccess(res)) {
                setSnackbar({ open: true, severity: "success", message: "Xóa người dùng thành công" });
                fetchData();
            } else {
                throw new Error(`Lỗi ${res.status}`);
            }
        } catch (err) {
            setSnackbar({ open: true, severity: "error", message: err.message || "Xóa thất bại" });
        } finally {
            setConfirm({ open: false, id: null });
        }
    };

    return (
        <Box p={2}>
            <Typography variant="h5" gutterBottom>Quản lý người dùng</Typography>

            {/* Bộ lọc */}
            <Paper sx={{ p: 2, mb: 2 }}>
                <Stack direction={{ xs: "column", sm: "row" }} spacing={2} alignItems="center">
                    <TextField
                        size="small"
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        placeholder="Tìm theo username"
                        InputProps={{ startAdornment: <InputAdornment position="start"><SearchIcon /></InputAdornment> }}
                        sx={{ minWidth: 240 }}
                    />
                    <TextField
                        select
                        size="small"
                        label="Vai trò"
                        value={role}
                        onChange={e => setRole(e.target.value)}
                        sx={{ width: 160 }}
                    >
                        <MenuItem value="">Tất cả</MenuItem>
                        <MenuItem value="admin">Admin</MenuItem>
                        <MenuItem value="user">User</MenuItem>
                    </TextField>

                    <Box flexGrow={1} />
                    <Button startIcon={<AddIcon />} variant="contained" onClick={() => setDialog({ open: true, mode: "create", user: null })}>
                        Thêm người dùng
                    </Button>
                </Stack>
            </Paper>

            {/* Bảng */}
            <Paper>
                <TableContainer sx={{ width: "100%" }}>
                    <Table sx={{ width: "100%", tableLayout: "fixed" }}>
                        <TableHead>
                            <TableRow>
                                <TableCell sortDirection={sortBy === "id" ? sortOrder.toLowerCase() : false}>
                                    <TableSortLabel active={sortBy === "id"} direction={sortOrder.toLowerCase()} onClick={() => handleSort("id")}>ID</TableSortLabel>
                                </TableCell>
                                <TableCell>Username</TableCell>
                                <TableCell>Họ tên</TableCell>
                                <TableCell>Email</TableCell>
                                <TableCell>Phone</TableCell>
                                <TableCell sortDirection={sortBy === "role" ? sortOrder.toLowerCase() : false}>
                                    <TableSortLabel active={sortBy === "role"} direction={sortOrder.toLowerCase()} onClick={() => handleSort("role")}>Role</TableSortLabel>
                                </TableCell>
                                <TableCell align="right">Hành động</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map(u => (
                                <TableRow key={u.id} hover>
                                    <TableCell>{u.id}</TableCell>
                                    <TableCell>{u.username}</TableCell>
                                    <TableCell>{u.name}</TableCell>
                                    <TableCell>{u.email}</TableCell>
                                    <TableCell>{u.phone}</TableCell>
                                    <TableCell><Chip label={u.role} color={roleColor(u.role)} size="small" /></TableCell>
                                    <TableCell align="right">
                                        <Stack direction="row" spacing={1} justifyContent="flex-end">
                                            <IconButton color="primary" onClick={() => setDialog({ open: true, mode: "edit", user: u })}><EditIcon /></IconButton>
                                            <IconButton color="error" onClick={() => setConfirm({ open: true, id: u.id })}><DeleteIcon /></IconButton>
                                        </Stack>
                                    </TableCell>
                                </TableRow>
                            ))}
                            {rows.length === 0 && (
                                <TableRow>
                                    <TableCell colSpan={7} align="center" sx={{ py: 4 }}>Không có dữ liệu</TableCell>
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

            {/* Dialog Thêm/Sửa */}
            <UserDialog
                open={dialog.open}
                mode={dialog.mode}
                user={dialog.user}
                onClose={() => setDialog({ open: false, mode: "create", user: null })}
                onSave={handleSaveUser}
            />

            {/* Dialog Xác nhận xóa */}
            <Dialog open={confirm.open} onClose={() => setConfirm({ open: false, id: null })}>
                <DialogTitle>Xác nhận</DialogTitle>
                <DialogContent>Bạn có chắc muốn xóa người dùng ID <b>{confirm.id}</b>?</DialogContent>
                <DialogActions>
                    <Button onClick={() => setConfirm({ open: false, id: null })}>Hủy</Button>
                    <Button color="error" variant="contained" onClick={handleDeleteUser}>Xóa</Button>
                </DialogActions>
            </Dialog>

            {/* Snackbar */}
            <Snackbar open={snackbar.open} autoHideDuration={4000} onClose={closeSnackbar}>
                <Alert severity={snackbar.severity} onClose={closeSnackbar}>{snackbar.message}</Alert>
            </Snackbar>
        </Box>
    );
}

// --- Dialog thêm/sửa ---
function UserDialog({ open, mode, user, onClose, onSave }) {
    const [form, setForm] = useState({ username: "", password: "", name: "", email: "", phone: "", role: "user" });

    useEffect(() => {
        if (mode === "edit" && user) {
            setForm({ ...user, password: "" });
        } else {
            setForm({ username: "", password: "", name: "", email: "", phone: "", role: "user" });
        }
    }, [mode, user]);

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = () => {
        // Chuyển giá trị rỗng "" thành undefined
        const cleanedForm = Object.fromEntries(
            Object.entries(form).map(([k, v]) => [k, v === "" ? undefined : v])
        );
        onSave(cleanedForm);
    };

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
            <DialogTitle>{mode === "create" ? "Thêm người dùng" : "Cập nhật người dùng"}</DialogTitle>
            <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
                <TextField label="Username" name="username" value={form.username} onChange={handleChange} fullWidth />
                <TextField label="Mật khẩu" name="password" type="password" value={form.password} onChange={handleChange} fullWidth />
                <TextField label="Họ tên" name="name" value={form.name} onChange={handleChange} fullWidth />
                <TextField label="Email" name="email" value={form.email} onChange={handleChange} fullWidth />
                <TextField label="Phone" name="phone" value={form.phone} onChange={handleChange} fullWidth />
                <FormControl fullWidth>
                    <InputLabel>Vai trò</InputLabel>
                    <Select name="role" value={form.role} onChange={handleChange} label="Vai trò">
                        <MenuItem value="admin">Admin</MenuItem>
                        <MenuItem value="user">User</MenuItem>
                    </Select>
                </FormControl>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Hủy</Button>
                <Button variant="contained" onClick={handleSubmit}>{mode === "create" ? "Thêm" : "Cập nhật"}</Button>
            </DialogActions>
        </Dialog>
    );
}
