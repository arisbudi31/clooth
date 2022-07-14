import React from "react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="header-area header-sticky">
      <div className="container mt-2">
        <div className="row">
          <div className="col-12">
            <nav className="main-nav">
              {/* <!-- ***** Logo Start ***** --> */}
              <a href="index.html" className="logo mt-4">
                <h5>CLOOTH</h5>
              </a>
              {/* <!-- ***** Logo End ***** --> */}
              {/* <!-- ***** Menu Start ***** --> */}
              <ul className="nav">
                <li className="scroll-to-section">
                  <Link to={"/"}>Home</Link>
                </li>
                <li className="scroll-to-section">
                  <Link to={"/products"}>Products</Link>
                </li>
                <li className="scroll-to-section"><a href="about.html">About Us</a></li>

                <li className="scroll-to-section btn btn-outline-info ml-5"><a href="#">Register</a></li>
                <li className="scroll-to-section btn btn-outline-success ml-2 px-3"><a href="contact.html">Login</a></li>
              </ul>
              <a className='menu-trigger'>
                <span>Menu</span>
              </a>
              {/* <!-- ***** Menu End ***** --> */}
            </nav>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header