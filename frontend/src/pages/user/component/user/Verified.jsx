import React from "react";
import { BsCart } from "react-icons/bs";
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';
import logo from '../../../assets/images/clooth-logo.png'
import { Stack, Button } from '@chakra-ui/react'

function Header() {
  const { count } = useSelector(state => state.cart)
  const onButtonLogout = () => {
    localStorage.removeItem('token')
  }

  return (
    <header className="header-area header-sticky">
      <div className="container mt-2">
        <div className="row">
          <div className="col-12">
            <nav className="main-nav">
              {/* <!-- ***** Logo Start ***** --> */}
              <a href="/" className="logo mt-4 d-flex">
                <img src={logo} alt="logo" width={30} height={30} />
                <h5 className="ml-2">CLOOTH</h5>
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

                <li className="scroll-to-section">
                  <Link to={"/about"}>
                    About Us
                  </Link>
                </li>

                <li className="scroll-to-section">
                  <Link to={"/carts"}><BsCart size={20} className="d-inline mb-2" /><span className="badge badge-danger">{count}</span></Link>
                </li>

                <Stack pl={4} direction='row' spacing={4}>
                  <Link to={"/"}>
                    <Button onClick={onButtonLogout} colorScheme='gray'>Logout</Button>
                  </Link>
                </Stack>
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