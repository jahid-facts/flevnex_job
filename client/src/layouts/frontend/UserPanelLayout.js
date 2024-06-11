import React from 'react'
import { Outlet } from 'react-router-dom'
import PanelHeader from './inc/userInc/PanelHeader'
import Footer from "./inc/Footer";
import Header from './inc/Header';

export default function UserPanelLayout() {
  return (
    <div>
        <Header/>
        <Outlet/>
        {/* <Footer/> */}
    </div>
  )
}

