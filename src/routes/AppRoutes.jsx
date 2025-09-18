import { Routes, Route } from "react-router-dom";

function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<div>Home</div>} />
            <Route path="/about" element={<div>About</div>} />
            <Route path="*" element={<div>404</div>} />
        </Routes>
    );
}

export default AppRoutes;
