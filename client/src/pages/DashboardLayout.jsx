import { Outlet,redirect, useLoaderData,useNavigate } from "react-router-dom"
import Wrapper from "../assets/wrappers/Dashboard"
import { SmallSidebar } from "../components"
import BigSideBar from "../components/BigSideBar"
import NavBar from "../components/NavBar"
import { createContext, useContext, useState } from "react"
import { checkDefaultTheme } from "../App"
import customFetch from "../utils/customFetch"
import { toast } from "react-toastify"


export const loader =async  ()=>{
  try {
    const {data}=await customFetch.get('/users/current-user');
    return data;
  } catch (error) {
    return redirect('/')
  }
}
const DashboardContext=createContext();

const DashboardLayout = () => {
  const {user}= useLoaderData();
  const navigate=useNavigate();

  const [showSidebar,setShowSidebar]=useState(false);
  const [isDarkTheme,setIsDarkTheme]=useState(checkDefaultTheme());

  const toggleDarkTheme=()=>{
    const newDarkTheme=!isDarkTheme;
    setIsDarkTheme(newDarkTheme);
    document.body.classList.toggle('dark-theme',newDarkTheme);
    localStorage.setItem('darkTheme',newDarkTheme);
  };

  const toggleSidebar=()=>{
    setShowSidebar(!showSidebar);
  }

  const logoutUser = async () => {
    console.log('Attempting logout...');
    try {
      await customFetch.get('/auth/logout');
      console.log('Logout successful, navigating...');
      toast.success('Logged out successfully');
      navigate('/');
    } catch (error) {
      console.error('Logout failed:', error);
      toast.error('Logout failed');
    }
  };
  
  return (
    <DashboardContext.Provider value={{user,showSidebar,isDarkTheme,toggleDarkTheme,toggleSidebar,logoutUser}}>
      <Wrapper>
        <main className="dashboard">
          <SmallSidebar/>
          <BigSideBar/>
          <div>
            <NavBar/>
            <div className="dashboard-page">
              <Outlet context={{user}}/>
            </div>
          </div>
        </main>
      </Wrapper>
    </DashboardContext.Provider>
      
  )
}
export const useDashboardContext=()=>useContext(DashboardContext);
export default DashboardLayout