import React, { useEffect, useState } from "react";
import Axios from "axios"
import { useParams } from "react-router"
import Footer from "./component/Footer";
import Header from "./component/Header";
import NumberFormat from 'react-number-format';
import { UPDATE_CARTS } from "../../redux/actions/types";
import { useDispatch } from 'react-redux/es/exports';
import { useToast } from '@chakra-ui/react';


const apiUrl = process.env.REACT_APP_API_URL

function DetailProductUser() {
  const dispatch = useDispatch()
  const toast = useToast()
  const { id } = useParams()
  const [product, setProduct] = useState("")
  const [description, setDescription] = useState("")
  const [price, setPrice] = useState("")
  const [stock, setStock] = useState("")
  const [image, setImage] = useState("")

  const onHandleAddtoCart = (id) => {
    Axios.post(`${apiUrl}/carts`, {
      id_product: id
    })
      .then(response => {
        const totalCart = response.data

        dispatch({ type: UPDATE_CARTS, payload: { count: totalCart?.total_count?.total_cart } })

        toast({
          position: "top",
          title: totalCart?.data,
          status: 'success',
          duration: 3000,
          isClosable: true
        })

      })
      .catch(err => {

        toast({
          position: "top",
          title: err?.response?.data?.data,
          status: 'error',
          duration: 3000,
          isClosable: true
        })
      })
  }

  useEffect(() => {

    Axios.get(`${apiUrl}/product/${id}`)
      .then(response => {
        const data = response.data.data[0]
        setProduct(data.productName)
        setDescription(data.description)
        setPrice(data.price)
        setStock(data.stock)
        setImage(data.image)
      })
      .catch(err => {
        console.log(err)
      })

  }, [])

  return (
    <>
      <Header />
      <div className="page-heading" style={{ paddingTop: "50px" }}>
        <div className="container">
          <div className="row">

          </div>
        </div>
      </div>
      <section className="section" id="product">
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <div className="left-images image-detail">
                <img src={image} alt="" />
              </div>
            </div>
            <div className="col-lg-4">
              <div className="right-content">
                <h4>{product}</h4>
                <span className="price"><NumberFormat
                  value={price}
                  displayType={'text'}
                  thousandSeparator={true}
                  prefix={'Rp. '}
                  renderText={value => <span>{value}</span>}
                /></span>
                <span>{description}.
                </span>
                <div className="quote">
                  <p style={{ fontSize: 20 }}>Stock: {stock}</p>
                </div>
                <div className="total">
                  <div className="main-border-button">
                    <button className="btn btn-info" onClick={() => onHandleAddtoCart(id)}>
                      Add To Cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  )
}

export default DetailProductUser