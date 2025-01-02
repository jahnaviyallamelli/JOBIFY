import Links from '../utils/Links'
import { useDashboardContext } from '../pages/DashboardLayout';
import { NavLink } from 'react-router-dom';

 // eslint-disable-next-line react/prop-types
 const NavLinks = ({isBigsidebar}) => {
    const {toggleSidebar,user} =useDashboardContext();

  return (
    <div className="nav-links">
        {Links.map((link)=>{
          const {text,path,icon}=link;
          const { role } = user;
          if (role !== 'admin' && path === 'admin') return;
          return (<NavLink to={path} key={text} className='nav-link' onClick={isBigsidebar ? null : toggleSidebar} end>
            <span className='icon'>{icon}</span>
            {text}
          </NavLink>);
        })}
    </div>
  )
}


export default NavLinks;
