import React, { useEffect, useState } from "react"
import Axios from "axios"
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router"
import { Heading, Badge, Box } from "@chakra-ui/react"
import Header from "../../../component/Header"
import Footer from "../../../component/Footer"
import NumberFormat from 'react-number-format';
import { LOADING_END } from "../../../redux/actions/types";
import { useDispatch } from 'react-redux';

const apiUrl = process.env.REACT_APP_API_URL

function DetailProduct() {
  const dispatch = useDispatch()
  const { id } = useParams()
  const [product, setProduct] = useState("")
  const [description, setDescription] = useState("")
  const [price, setPrice] = useState("")
  const [stock, setStock] = useState("")
  const [image, setImage] = useState("")
  const [category, setCategory] = useState("")
  const navigate = useNavigate()
  const role = localStorage.getItem("akses")
  const token = localStorage.getItem("tokenAdmin")
  const keepLogin = localStorage.getItem("keepLogin")

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

  if (keepLogin === 'false') {
    setTimeout(() => navigate('/admin/login'), 10000)
    setTimeout(() => localStorage.removeItem("tokenAdmin"), 10000)
    dispatch({ type: LOADING_END })
  }
  else if (token === null) {
    setTimeout(() => navigate('/admin/login'), 5000)
    return (
      <Box ml="100px" mt="50px" fontSize={"6xl"} fontWeight="extrabold">
        <h1>You have to Log In first.</h1>
      </Box>
    )
  }

  if (role !== 'BearerAdmin' || role === null) {
    return (navigate('/login'))
  }

  return (
    <>
      <Header />
      <div className="app-wrapper">

        <div className="app-content pt-3 p-md-3 p-lg-4" style={{ marginTop: "60px" }}>
          <div className="container-xl">
            <div className="row g-3 mb-4 align-items-center justify-content-between">
              <div className="col-auto">
                <h1 className="app-page-title mb-0">Product Detail</h1>
              </div>
            </div>
            {/* <!--//row--> */}

            <div className="row g-4 d-flex justify-content-center">
              <div className="col-9 col-md-9">
                <div className="app-card app-card-doc shadow-sm h-100">
                  <div className="app-card-body p-3 has-card-actions">
                    <div className="row">
                      <div className="col-5 col-md-5">
                        <img src={image} alt="product" />
                      </div>
                      <div className="col-7 col-md-7 d-flex flex-column">
                        <Heading as={"h4"} size="md" className="mb-3">{product}</Heading>
                        <Heading as={"h5"} size="sm" className="mb-3"><NumberFormat
                          value={price}
                          displayType={'text'}
                          thousandSeparator={true}
                          prefix={'Rp. '}
                          renderText={value => <span>{value}</span>}
                        /></Heading>
                        <p className="text-justify mb-3">{description}.</p>
                        <Heading as={"h5"} size="sm" className="badge badge-primary mb-3">Stock: {stock}</Heading>
                        <span><Badge variant='solid' colorScheme='purple' className="p-1">{category}</Badge></span>
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