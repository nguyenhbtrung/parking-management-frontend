import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import AdminLayout from "../pages/admin/AdminLayout";
import ParkingManagementPage from "../pages/admin/ParkingMapPage";
import MapEditorPage from "../pages/admin/MapEditorPage";
import BookingHistory from "../pages/user/BookingHistory";
import UserLayout from "../pages/user/UserLayout";
import BookingParkingMap from "../pages/user/BookingParkingMap";
import Login from "../pages/auth/LogIn";
import Register from "../pages/auth/Register";
import ParkingRecordsPage from "../pages/admin/ParkingRecordsPage";
import ManageUsersPage from "../pages/admin/ManageUsersPage";
import { ACCESS_TOKEN_KEY_NAME } from "../appConst";


function AppRoutes() {
    return (
        <Routes>
            <Route path="/about" element={<div>About</div>} />

            {/* Admin */}
            <Route element={<RequireAuth />}>
                <Route path="/admin" element={<AdminLayout />}>
                    <Route index element={<ParkingManagementPage />} />
                    <Route path="records" element={<ParkingRecordsPage />} />
                    <Route path="users" element={<ManageUsersPage />} />
                </Route>
            </Route>
            <Route element={<RequireAuth />}>
                <Route path="/" element={<UserLayout />} >
                    <Route index element={<BookingParkingMap />} />
                    <Route path="history" element={<BookingHistory />} />
                </Route>
            </Route>

            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            <Route path="*" element={<div>404</div>} />
        </Routes>
    );
}

function RequireAuth() {
    const accessToken = localStorage.getItem(ACCESS_TOKEN_KEY_NAME);

    if (!accessToken) {
        return <Navigate to="/login" replace />;
    }

    return <Outlet />;
}

export default AppRoutes;
