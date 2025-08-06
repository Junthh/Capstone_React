import { Outlet } from "react-router-dom" 
import Header from "./_components/Header"

export default function HomeTemplate() {
  return (
    <div>
      <Header />
      <Outlet />
    </div>
    
  )
}