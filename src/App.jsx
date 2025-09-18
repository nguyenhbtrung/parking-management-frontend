import { CssBaseline } from '@mui/material';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import { ToastContainer } from 'react-toastify';

function AppContent() {
  return (
    <>
      <CssBaseline />
      <ToastContainer position="top-right" autoClose={3000} />
      <AppRoutes />
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <CssBaseline />
      <ToastContainer position="top-right" autoClose={3000} />
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;
