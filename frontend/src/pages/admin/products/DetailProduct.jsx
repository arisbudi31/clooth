import React, { useEffect, useState } from "react"
import Axios from "axios"
import { useParams } from "react-router"
import { Heading } from "@chakra-ui/react"
import Header from "../../../component/Header"
import Footer from "../../../component/Footer"

function DetailProduct() {

  const { id } = useParams()
  const [product, setProduct] = useState("")
  const [description, setDescription] = useState("")
  const [price, setPrice] = useState("")
  const [stock, setStock] = useState("")
  const [image, setImage] = useState("")

  useEffect(() => {

    Axios.get(`http://localhost:2000/products/${id}`)
      .then(response => {
        const data = response.data
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
      <div className="app-wrapper">

        <div className="app-content pt-3 p-md-3 p-lg-4">
          <div className="container-xl">
            <div className="row g-3 mb-4 align-items-center justify-content-between">
              <div className="col-auto">
                <h1 className="app-page-title mb-0">Product Detail</h1>
              </div>
            </div>
            {/* <!--//row--> */}

            <div className="row g-4 d-flex justify-content-center">
              <div className="col-8 col-md-8">
                <div className="app-card app-card-doc shadow-sm h-500">
                  <div className="app-card-body p-3 has-card-actions">
                    <div className="row">
                      <div className="col-5 col-md-5">
                        <img src={image} alt="product" />
                      </div>
                      <div className="col-6 col-md-6 d-flex flex-column">
                        <Heading as={"h4"} size="md" className="mb-3">{product}</Heading>
                        <Heading as={"h5"} size="sm" className="mb-3">Rp. {price}</Heading>
                        <p className="text-justify mb-3">{description}.</p>
                        <Heading as={"h5"} size="sm">Stock: {stock}</Heading>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* <!--//row--> */}
          </div>
          {/* <!--//container-fluid--> */}
        </div>
        {/* <!--//app-content--> */}

        <Footer />
        {/* <!--//app-footer--> */}

      </div >
    </>
  )
}

export default DetailProduct