import React from "react";
import { Link, Link as RouterLink } from "react-router-dom";
import logo from '../assets/images/clooth-logo.png'

function Sidebar() {
  return (
    <div id="app-sidepanel" className="app-sidepanel">
      <div id="sidepanel-drop" className="sidepanel-drop"></div>
      <div className="sidepanel-inner d-flex flex-column">
        <a href="#" id="sidepanel-close" className="sidepanel-close d-xl-none">&times;</a>
        <div className="app-branding">
          <RouterLink to={"/admin/product"} className="app-logo d-flex align-items-center">
            <img className="logo-icon me-2" src={logo} alt="logo" />
            <span className="logo-text">CLOOTH</span>
          </RouterLink>
        </div>

        <nav id="app-nav-main" className="app-nav app-nav-main flex-grow-1">
          <ul className="app-menu list-unstyled accordion" id="menu-accordion">
            <li className="nav-item">
              <a className="nav-link" href="index.html">
                <span className="nav-icon">
                  <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-house-door" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M7.646 1.146a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 .146.354v7a.5.5 0 0 1-.5.5H9.5a.5.5 0 0 1-.5-.5v-4H7v4a.5.5 0 0 1-.5.5H2a.5.5 0 0 1-.5-.5v-7a.5.5 0 0 1 .146-.354l6-6zM2.5 7.707V14H6v-4a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5v4h3.5V7.707L8 2.207l-5.5 5.5z" />
                    <path fillRule="evenodd" d="M13 2.5V6l-2-2V2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5z" />
                  </svg>
                </span>
                <span className="nav-link-text">Dashboard</span>
              </a>
            </li>
            <li className="nav-item">
              <Link to={"/admin/product"} className="nav-link">
                <span className="nav-icon">
                  <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-folder" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9.828 4a3 3 0 0 1-2.12-.879l-.83-.828A1 1 0 0 0 6.173 2H2.5a1 1 0 0 0-1 .981L1.546 4h-1L.5 3a2 2 0 0 1 2-2h3.672a2 2 0 0 1 1.414.586l.828.828A2 2 0 0 0 9.828 3v1z" />
                    <path fillRule="evenodd" d="M13.81 4H2.19a1 1 0 0 0-.996 1.09l.637 7a1 1 0 0 0 .995.91h10.348a1 1 0 0 0 .995-.91l.637-7A1 1 0 0 0 13.81 4zM2.19 3A2 2 0 0 0 .198 5.181l.637 7A2 2 0 0 0 2.826 14h10.348a2 2 0 0 0 1.991-1.819l.637-7A2 2 0 0 0 13.81 3H2.19z" />
                  </svg>
                </span>
                <span className="nav-link-text">Products</span>
              </Link>
            </li>

            <li className="nav-item">
              <Link to={"/admin/categories"} className="nav-link">
                <span className="nav-icon">
                  <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-files" fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd"
                      d="M4 2h7a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2zm0 1a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h7a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1H4z" />
                    <path
                      d="M6 0h7a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2v-1a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H6a1 1 0 0 0-1 1H4a2 2 0 0 1 2-2z" />
                  </svg>
                </span>
                <span className="nav-link-text">Categories</span>
              </Link>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="manage-users">
                <span className="nav-icon">
                  <i class="bi bi-person"></i>
                </span>
                <span className="nav-link-text">Users</span>
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="orders.html">
                <span className="nav-icon">
                  <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-card-list" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M14.5 3h-13a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 .5.5h13a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5zm-13-1A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-13z" />
                    <path fillRule="evenodd" d="M5 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 5 8zm0-2.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm0 5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5z" />
                    <circle cx="3.5" cy="5.5" r=".5" />
                    <circle cx="3.5" cy="8" r=".5" />
                    <circle cx="3.5" cy="10.5" r=".5" />
                  </svg>
                </span>
                <span className="nav-link-text">Orders</span>
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="help.html">
                <span className="nav-icon">
                  <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-question-circle" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                    <path d="M5.255 5.786a.237.237 0 0 0 .241.247h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286zm1.557 5.763c0 .533.425.927 1.01.927.609 0 1.028-.394 1.028-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94z" />
                  </svg>
                </span>
                <span className="nav-link-text">Help</span>
              </a>
            </li>
          </ul>
        </nav>

        <div className="app-sidepanel-footer">
          <nav className="app-nav app-nav-footer">
            <ul className="app-menu footer-menu list-unstyled">
              <li className="nav-item">
                {/* <!--//Bootstrap Icons: https://icons.getbootstrap.com/ --> */}
                <a className="nav-link" href="https://themes.3rdwavemedia.com/bootstrap-templates/admin-dashboard/portal-free-bootstrap-admin-dashboard-template-for-developers/">
                  <span className="nav-icon">
                    <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-file-person" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M12 1H4a1 1 0 0 0-1 1v10.755S4 11 8 11s5 1.755 5 1.755V2a1 1 0 0 0-1-1zM4 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H4z" />
                      <path fillRule="evenodd" d="M8 10a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                    </svg>
                  </span>
                  <span className="nav-link-text">License</span>
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  )
}

export default Sidebar