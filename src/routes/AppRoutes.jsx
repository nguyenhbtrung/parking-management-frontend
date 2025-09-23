import { Routes, Route } from "react-router-dom";
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


function AppRoutes() {
    return (
        <Routes>
            <Route path="/about" element={<div>About</div>} />

            {/* Admin */}
            <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<ParkingManagementPage />} />
                <Route path="records" element={<ParkingRecordsPage />} />
                <Route path="users" element={<ManageUsersPage />} />
            </Route>
            <Route path="/" element={<UserLayout />} >
                <Route index element={<BookingParkingMap />} />
                <Route path="history" element={<BookingHistory />} />
            </Route>

            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            <Route path="*" element={<div>404</div>} />
        </Routes>
    );
}

export default AppRoutes;
