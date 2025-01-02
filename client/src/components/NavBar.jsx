import Wrapper from "../assets/wrappers/Navbar"
import {FaAlignLeft} from 'react-icons/fa'
import Logo from "./logo";
import { useDashboardContext } from "../pages/DashboardLayout";
import { LogoutContainer } from "./LogoutContainer";
import ThemeToggle from "./ThemeToggle";

 const NavBar = () => {
  const {toggleSidebar}=useDashboardContext();
  return (
    <Wrapper>
     <div className="nav-center">
      <button type='button' className="toggle-btn" onClick={toggleSidebar}>
        <FaAlignLeft/>
      </button>
      <div>
        <Logo/>
        <h4>Dashborad</h4>
      </div>
      <div className='btn-container'>
        <ThemeToggle />
        <LogoutContainer/>
      </div>
      </div>
    </Wrapper>
  )
}
export default NavBar;
