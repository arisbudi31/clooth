import React, { useEffect } from "react";
import Sidebar from "./Sidebar";
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";

function Header() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const onButtonLogout = () => {
    return (
      localStorage.removeItem("tokenAdmin")
      // navigate('/admin/login')
    )
  }

  const admin = useSelector((state) => state.admin)
  // console.log(`data admin:`, admin);

  // useEffect(() => {

  // }, [])
  return (
    <>
      <header className="app-header fixed-top">
        <div className="app-header-inner">
          <div className="container-fluid py-2">
            <div className="app-header-content">
              <div className="row justify-content-between align-items-center">

                <div className="col-auto">
                  <a id="sidepanel-toggler" className="sidepanel-toggler d-inline-block d-xl-none" href="#">
                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" role="img">
                      <title>Menu</title>
                      <path stroke="currentColor" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="2" d="M4 7h22M4 15h22M4 23h22">
                      </path>
                    </svg>
                  </a>
                </div>
                {/* <!--//col--> */}
                <div className="search-mobile-trigger d-sm-none col">
                  <i className="search-mobile-trigger-icon fas fa-search"></i>
                </div>
                {/* <!--//col--> */}

                {/* <!--//app-search-box--> */}
                {/* content search box */}
                {/* <!--//app-search-box--> */}

                <div className="app-utilities col-auto">
                  {/* <!--//app-utility-item-notification--> */}
                  {/* content notification */}
                  {/* <!--//app-utility-item-notification--> */}

                  {/* <!--//app-utility-item-settings--> */}
                  {/* content setting */}
                  {/* <!--//app-utility-item-settings--> */}

                  {/* <!--//app-user-dropdown--> */}
                  <div className="app-utility-item app-user-dropdown dropdown d-flex align-items-center">
                    <text className="avatar-text">Hi {admin.fullname}</text>
                    <img className="mr-3" src="/assets/images/user.png" alt="user profile" />
                    <a className="dropdown-toggle px-2" id="user-dropdown-toggle" data-bs-toggle="dropdown" href="#" role="button"
                      aria-expanded="false">
                    </a>
                    <ul className="dropdown-menu" aria-labelledby="user-dropdown-toggle">
                      <li><a className="dropdown-item" href="account.html">Account</a></li>
                      <li><a className="dropdown-item" href="settings.html">Settings</a></li>
                      <li>
                        <hr className="dropdown-divider" />
                      </li>
                      <li><a className="dropdown-item" onClick={onButtonLogout} href="http://localhost:3000/admin/login">Log Out</a></li>
                    </ul>
                  </div>
                  {/* <!--//app-user-dropdown--> */}
                </div>
                {/* <!--//app-utilities--> */}
              </div>
              {/* <!--//row--> */}
            </div>
            {/* <!--//app-header-content--> */}
          </div>
          {/* <!--//container-fluid--> */}
        </div>
        {/* <!--//app-header-inner--> */}

        <Sidebar />
        {/* <!--//app-sidepanel--> */}

      </header>
      {/* <!--//app-header--> */}
    </>
  )
}

export default Header;