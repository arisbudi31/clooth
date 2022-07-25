import React from "react";
import { BsCart } from "react-icons/bs";
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';
import logo from '../../../assets/images/clooth-logo.png'
import { Stack, Button, useToast } from '@chakra-ui/react'
import Axios from "axios";
import { useNavigate } from 'react-router'
import { useDispatch } from 'react-redux'
import { LOADING_END, LOADING_START } from '../../../redux/actions/types';

const API_URL = process.env.REACT_APP_API_URL

function Header() {
  const { count } = useSelector(state => state.cart)
  // const navigate = useNavigate()
  // const dispatch = useDispatch()
  // const toast = useToast()

  // const onLinkCart = async () => {
  //   Axios.get(API_URL + '/users')
  //     .then((resp) => {
  //       console.log(resp.data)
  //       // if(resp.data.status == "verified"){
  //       //   navigate(`/carts`)
  //       // } else {
  //       //   navigate(`/Verification`)
  //       // }
  //     })
  //     .catch((err) => {
  //       dispatch({ type: LOADING_END })
  //       console.log(`error login:`, err);
  //       if (err) {
  //         return toast({
  //           title: `Error`,
  //           description: err.response.data.data,
  //           status: 'error',
  //           duration: 5000,
  //           isClosable: true,
  //         })
  //       }
  //     })
  // }

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
                <Link to={"/register"}>
                  <Button colorScheme='gray' variant='outline'>Register</Button>
                </Link>
                <Link to={"/login"}>
                  <Button colorScheme='gray'>Login</Button>
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