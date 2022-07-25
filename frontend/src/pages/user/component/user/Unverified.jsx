import {
  Stack,
  Link,
  Button
} from "@chakra-ui/react"
import React from 'react'

export default function UnverifiedUser() {
  <header className="header-area header-sticky">
    <div className="container">
      <div className="row">
        <div className="col-12">
          <nav className="main-nav">
            <a href="/" className="logo pt-4">
              <h5>CLOOTH</h5>
            </a>
            <ul align='center' className="nav">
              <li><Link to={"/"}>Home</Link></li>
              <li><Link to={"/products"}>Products</Link></li>
              <li><a href="/about">About Us</a></li>
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
          </nav>
        </div>
      </div>
    </div>
  </header>
}
