import { Link, Outlet } from "react-router-dom";

export default function AdminTemplate() {
  return (
    <div>
        <h1>Admin</h1>
        <Outlet />
    </div>
    
  )
}
