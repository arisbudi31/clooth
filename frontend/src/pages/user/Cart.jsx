import React, { useState, useEffect } from "react";
import Axios from "axios";
import NumberFormat from 'react-number-format';
import Footer from "./component/Footer";
import Header from "./component/Header";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  Button,
  Text,
  TableContainer,

} from '@chakra-ui/react'
import { useDispatch } from 'react-redux';
import { UPDATE_CARTS } from "../../redux/actions/types";
import ProductBanner from "./component/product/ProductBanner";

const apiUrl = process.env.REACT_APP_API_URL

function Cart() {
  const dispatch = useDispatch()
  const [carts, setCarts] = useState([])
  const cartHeader = 'background-header'
  let totalPrice = 0
  const onHandleMinQty = (id) => {

    setCarts(
      carts =>
        carts.map(cart => {
          return (
            id === cart.cartId ?
              { ...cart, cartQty: cart.cartQty - (cart.cartQty > 1 ? 1 : 0) } :
              cart
          )
        })
    )
    updateCartQty(id, "dec")
  }

  const onHandleAddQty = (stock, id) => {

    setCarts(
      carts =>
        carts.map(cart => {
          return (
            id === cart.cartId ?
              { ...cart, cartQty: cart.cartQty + (cart.cartQty < stock ? 1 : 0) } :
              cart
          )
        })
    )
    updateCartQty(id, "inc")
  }

  const updateCartQty = (id, scope) => {
    Axios.put(`${apiUrl}/carts/${id}`, {
      scope
    })
      .then(res => {

      })
      .catch(err => {
        console.log(err)
      })
  }


  const onHandleDeleteCart = (id) => {
    Axios.delete(`${apiUrl}/carts/${id}`)
      .then(response => {
        Axios.get(`${apiUrl}/carts`)
          .then(res => {
            const totalCart = res.data
            setCarts(totalCart.data)
            dispatch({ type: UPDATE_CARTS, payload: { count: totalCart?.total_count?.total_cart } })
          })
          .catch(err => {
            console.log(err)
          })
      })
      .catch(error => {
        console.log(error)
      })
  }

  useEffect(() => {
    Axios.get(`${apiUrl}/carts`)
      .then(response => {
        setCarts(response.data.data)
      })
      .catch(err => {
        console.log(err)
      })
  }, [])
  return (
    <>
      <Header state={cartHeader} />
      <div className="page-heading" style={{ paddingTop: "50px" }}>
        <div className="container">
          <div className="row">

          </div>
        </div>
      </div>
      <section className="section" id="product">
        <div className="container">
          <div className="row">
            <div className="col-lg-9">
              <TableContainer>
                <Table variant='simple' className="table-bordered">
                  <Thead className="bg-info">
                    <Tr>
                      <Th className="text-white text-center" colSpan={3}>Products</Th>
                      <Th className="text-white text-center">Price</Th>
                      <Th className="text-white text-center">Qty</Th>
                      <Th className="text-white text-center">Total</Th>
                      <Th className="text-white text-center">Action</Th>
                    </Tr>
                  </Thead>
                  <Tbody>

                    {
                      carts.map(cart => {
                        totalPrice += cart.cartQty * cart.price
                        return (
                          <Tr>
                            <Td colSpan={3}>
                              <img src={cart.image} className="d-inline mr-3" width={45} height={45} />
                              {cart.productName}
                            </Td>
                            <Td>
                              <NumberFormat
                                value={cart.price}
                                displayType={'text'}
                                thousandSeparator={true}
                                prefix={'Rp. '}
                                renderText={value => <Text>{value}</Text>}
                              />
                            </Td>
                            <Td>
                              <Button className="bg-secondary text-white" onClick={() => onHandleMinQty(cart.cartId)}>-</Button>
                              <span className="p-3">{cart.cartQty}</span>
                              <Button className="bg-secondary text-white" onClick={() => onHandleAddQty(cart.stock, cart.cartId)}>+</Button>
                            </Td>
                            <Td>
                              <NumberFormat
                                value={cart.cartQty * cart.price}
                                displayType={'text'}
                                thousandSeparator={true}
                                prefix={'Rp. '}
                                renderText={value => <Text>{value}</Text>}
                              />
                            </Td>
                            <Td><Button className="bg-danger text-white" onClick={() => onHandleDeleteCart(cart.id_product)}>X</Button></Td>
                          </Tr>
                        )
                      })
                    }

                  </Tbody>
                </Table>
              </TableContainer>
            </div>
            <div className="col-lg-3">
              <TableContainer>
                <Table variant='simple' className="table-bordered">
                  <Thead className="bg-info">
                    <Tr>
                      <Th className="text-white" colSpan={4}>Cart Summary</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    <Tr>
                      <Td colSpan={4}>
                        <b>Total</b>
                        <span className="float-right">
                          <NumberFormat
                            value={totalPrice}
                            displayType={'text'}
                            thousandSeparator={true}
                            prefix={'Rp. '}
                            renderText={value => <Text>{value}</Text>}
                          />
                        </span>
                      </Td>
                    </Tr>
                  </Tbody>
                  <Tfoot>
                    <Tr>
                      <Th className="text-center"><Button className="bg-info text-white">Proceed to checkout</Button></Th>
                    </Tr>
                  </Tfoot>
                </Table>
              </TableContainer>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  )
}

export default Cart