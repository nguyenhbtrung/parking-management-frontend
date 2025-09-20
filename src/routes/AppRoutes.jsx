import { Routes, Route } from "react-router-dom";
import AdminLayout from "../pages/admin/AdminLayout";
import ParkingManagementPage from "../pages/admin/ParkingMapPage";
import MapEditorPage from "../pages/admin/MapEditorPage";
import BookingHistory from "../pages/user/BookingHistory";
import UserLayout from "../pages/user/UserLayout";
import BookingParkingMap from "../pages/user/BookingParkingMap";

function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<div>Home</div>} />
            <Route path="/about" element={<div>About</div>} />

            {/* Admin */}
            <Route path="/admin" element={<AdminLayout />}>
                <Route path="parking" element={<ParkingManagementPage />} />
                <Route path="editor" element={<MapEditorPage />} />
            </Route>
            <Route path="/user" element={<UserLayout/>} >
                <Route path="history" element={<BookingHistory />} />
                <Route path="booking" element={<BookingParkingMap/>} />
            </Route>
            

            <Route path="*" element={<div>404</div>} />
        </Routes>
    );
}

export default AppRoutes;
