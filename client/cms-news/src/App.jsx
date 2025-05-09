import './App.css'
import { BrowserRouter, Route, Routes } from "react-router";
import Login from "./pages/Login";
import AuthLayout from "./layouts/AuthLayout";
import MainLayout from "./layouts/MainLayout";
import Dashboard from "./pages/Dashboard";
import Edit from './pages/Edit';
import Add from './pages/Add';
import Categories from './pages/Categories';
import AddUser from './pages/AddUser';
import UploadImage from './pages/UploadImage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
        </Route>

        <Route element={<MainLayout />}>
          <Route path="/" element={<Dashboard />}/>
          <Route path="/articles/:id/edit" element={<Edit />}/>
          <Route path="/articles/:id/upload" element={<UploadImage />}/>
          <Route path="/articles/add" element={<Add />}/>
          <Route path="/categories" element={<Categories />}/>
          <Route path="/add-user" element={<AddUser />}/>
        </Route>
        
      </Routes>
    </BrowserRouter>
  )
}