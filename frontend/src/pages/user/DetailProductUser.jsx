import React, { useEffect, useState } from "react";
import Axios from "axios"
import { useParams } from "react-router"
import Footer from "./component/Footer";
import Header from "./component/Header";

const apiUrl = process.env.REACT_APP_API_URL

function DetailProductUser() {
  const { id } = useParams()
  const [product, setProduct] = useState("")
  const [description, setDescription] = useState("")
  const [price, setPrice] = useState("")
  const [stock, setStock] = useState("")
  const [image, setImage] = useState("")
  const [category, setCategory] = useState("")

  useEffect(() => {

    Axios.get(`${apiUrl}/product/${id}`)
      .then(response => {
        const data = response.data.data[0]
        setProduct(data.productName)
        setDescription(data.description)
        setPrice(data.price)
        setStock(data.stock)
        setImage(data.image)
        setCategory(data.categoryName)
      })
      .catch(err => {
        console.log(err)
      })

  }, [])

  return (
    <>
      <Header />
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
                <span className="price">Rp. {price}</span>
                <span>{description}.
                </span>
                <div className="quote">
                  <p style={{ fontSize: 20 }}>Stock: {stock}</p>
                </div>
                <div className="quantity-content">
                  <div className="left-content">
                    <h6>No. of Orders</h6>
                  </div>
                  <div className="right-content">
                    <div className="quantity buttons_added">
                      <input type="button" value="-" className="minus" />
                      <input type="number" step="1" min="1" max=""
                        name="quantity" value="1" title="Qty" className="input-text qty text" size="4" pattern=""
                        inputmode="" />
                      <input type="button" value="+" className="plus" />
                    </div>
                  </div>
                </div>
                <div className="total">
                  <div className="main-border-button"><a href="#">Add To Cart</a></div>
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