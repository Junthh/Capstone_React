import { Outlet, useLocation } from "react-router-dom" 
import Header from "./_components/Header"

export default function HomeTemplate() {
  const location = useLocation();
  const noHeader = ["/login", "/register"];
  const hideHeader = noHeader.includes(location.pathname);

  return (
    <div>
      {!hideHeader && <Header />}
      <Outlet />
    </div>
    
  )
}