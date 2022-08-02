import React from "react";
import { useState, useEffect } from "react";
import Axios from "axios"
import { Link, useNavigate } from "react-router-dom";
import Footer from "../../../component/Footer";
import Header from "../../../component/Header";
import Pagination from "../../../component/Pagination"
import { useDispatch, useSelector } from 'react-redux/es/exports';
import { useToast, Box } from '@chakra-ui/react';
import Loading from "../../../component/subcomponent/Loading";
import { LOADING_START, LOADING_END, GET_ADMIN_DATA } from "../../../redux/actions/types";

const apiUrl = process.env.REACT_APP_API_URL

function Stockopname() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const toast = useToast()
  const [stocks, setStocks] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPage, setTotalPage] = useState(null)
  const { loading } = useSelector(state => state.loading)

  const role = localStorage.getItem("akses")
  const token = localStorage.getItem("tokenAdmin")
  const keepLogin = localStorage.getItem("keepLogin")

  const onHandlePageClick = (data) => {
    setCurrentPage(data.selected + 1)
  }

  useEffect(() => {
    dispatch({ type: LOADING_START })
    Axios.get(apiUrl + `/stockopname`)
      .then(res => {
        dispatch({ type: LOADING_END })
        console.log(res.data.data)
        setStocks(res.data.data)

        const total = res.data.total_count.total_data
        setTotalPage(Math.ceil(total / 10))
      })
      .catch(err => {
        dispatch({ type: LOADING_END })
        setStocks([])
        setTotalPage(null)

        console.log(err)
        toast({
          position: "top",
          title: err?.response?.data?.data,
          status: 'error',
          duration: 3000,
          isClosable: true
        })

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
      <Loading state={{ loading }} />
      <div className="app-wrapper">

        <div className="app-content pt-3 p-md-3 p-lg-4" style={{ marginTop: "60px" }}>
          <div className="container-xl">

            <div className="row g-3 mb-4 align-items-center justify-content-between">
              <div className="col-auto">
                <h1 className="app-page-title mb-0">Stockopname</h1>
              </div>
              <div className="col-auto">
                <div className="page-utilities">
                  <div className="row g-2 justify-content-start justify-content-md-end align-items-center">
                    <div className="col-auto">
                      <Link to={"/admin/add-stock"} className="btn app-btn-primary btn-info">
                        Add product stocks
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="tab-content" id="orders-table-tab-content">
              <div className="tab-pane fade show active" id="orders-all" role="tabpanel" aria-labelledby="orders-all-tab">
                <div className="app-card app-card-orders-table shadow-sm mb-5">
                  <div className="app-card-body">
                    <div className="table-responsive">
                      <table className="table app-table-hover mb-0 text-left">
                        <thead>
                          <tr>
                            <th className="cell">No</th>
                            <th className="cell">Product Name</th>
                            <th className="cell">Quantity</th>
                            <th className="cell">Status</th>
                            <th className="cell">Date</th>
                          </tr>
                        </thead>
                        <tbody>
                          {
                            stocks.map((stock, index) => {
                              return (
                                <tr>
                                  <td className="cell">{(currentPage - 1) * 5 + index + 1}</td>
                                  <td className="cell">{stock.productName}</td>
                                  <td className="cell">{stock.qty}</td>
                                  <td className="cell">
                                    <span className={
                                      stock.status === "stock in" ? "badge badge-success" :
                                        stock.status === "stock out" ? "badge badge-danger" :
                                          "badge badge-info"
                                    }>{stock.status}
                                    </span>
                                  </td>
                                  <td className="cell">{stock.created_at}</td>
                                </tr>
                              )
                            })
                          }
                        </tbody>
                      </table>
                    </div>

                  </div>
                </div>
                {
                  totalPage ? <Pagination state={{ onHandlePageClick, totalPage }} />
                    :
                    null
                }
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  )
}

export default Stockopname