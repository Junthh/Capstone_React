import { Outlet, useLocation } from "react-router-dom" 
import Header from "./_components/Header"
import Footer from "./_components/Footer";

export default function HomeTemplate() {
  const location = useLocation();
  const noHeader = ["/login", "/register"];
  const noFooter = ["/login", "/register"];
  const hideHeader = noHeader.includes(location.pathname);
  const hideFooter = noHeader.includes(location.pathname);

  return (
    <div>
      {!hideHeader && <Header />}
      <Outlet />
      {!hideFooter && <Footer />}
    </div>
    
  )
}