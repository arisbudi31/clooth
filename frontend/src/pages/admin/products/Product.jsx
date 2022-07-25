import React, { useEffect, useRef, useState } from "react"
import Axios from "axios"
import { Link as RouterLink, useNavigate } from "react-router-dom"
import Header from './../../../component/Header';
import Loading from "../../../component/subcomponent/Loading";
import { Badge, Heading, useToast, Box } from "@chakra-ui/react";
import Crud from './../../../component/subcomponent/Crud';
import Pagination from "../../../component/Pagination";
import Footer from "../../../component/Footer";
import ModalDelete from "../../../component/subcomponent/ModalDelete";
import { useDispatch, useSelector } from 'react-redux';
import NumberFormat from 'react-number-format';
import { LOADING_END } from "../../../redux/actions/types";

const apiUrl = process.env.REACT_APP_API_URL

function Product() {
  const dispatch = useDispatch()
  const [products, setProducts] = useState([])
  // const [categories, setCategories] = useState([])
  const { categories } = useSelector(state => state.category)
  const [category, setCategory] = useState(null)
  const [search, setSearch] = useState("")
  const [currentPage, setCurrentPage] = useState(null)
  const [id, setId] = useState(null)
  const [confirmDelete, setConfirmDelete] = useState(false)
  const [loading, setLoading] = useState(false)
  const [totalPage, setTotalPage] = useState(null)
  const [sort, setSort] = useState(null)
  const navigate = useNavigate()
  const token = localStorage.getItem("tokenAdmin")
  const keepLogin = localStorage.getItem("keepLogin")
  const role = localStorage.getItem("akses")


  const searcKey = useRef("")
  const sortSelected = useRef(null)

  const toast = useToast()

  const onBtnCancel = () => {
    setConfirmDelete(false)
    setId(null)
  }

  const handleBtnDelete = (id) => {
    setId(id)
    setConfirmDelete(true)
    console.log(id)
  }

  const onConfirmDelete = () => {
    setLoading(true)
    Axios.delete(`${apiUrl}/product/${id}`)
      .then(res => {
        Axios.get(`${apiUrl}/product`)
          .then(res => {
            setProducts(res.data.data)
            setLoading(false)
            setConfirmDelete(false)
            setId(null)

            toast({
              position: "top",
              title: 'Delete success',
              status: 'success',
              duration: 3000,
              isClosable: true
            })
          }).catch(err => {
            setLoading(false)
            setConfirmDelete(false)
            setId(null)

            toast({
              position: "top",
              title: 'delete failed',
              status: 'error',
              duration: 3000,
              isClosable: true
            })

            console.log(err)
          })
      })
      .catch(err => {
        setLoading(false)
        setId(null)

        toast({
          position: "top",
          title: 'Delete failed',
          status: 'error',
          duration: 3000,
          isClosable: true
        })
        console.log(err)
      })
  }

  const onHandleSearch = () => {
    setSearch(searcKey.current.value)
  }

  const onHandleCategory = (e) => {
    const selectCategory = e.target.value === "All" ? "" : e.target.value
    setCategory(selectCategory)
  }

  const onHandlePageClick = (data) => {
    setCurrentPage(data.selected + 1)
  }

  const onHandleSort = () => {
    setSort(sortSelected.current.value)
  }

  useEffect(() => {
    // if (role !== 'BearerAdmin' || role === null) {
    //   return (navigate('/user/login'))
    // }

    setLoading(true)
    Axios.get(`${apiUrl}/product`, {
      params: {
        search: search,
        filter: category,
        sort: sort,
        current_page: currentPage,
        per_page: 4
      }
    })
      .then(response => {
        setLoading(false)
        setProducts(response.data.data)

        const total = response.data.total_count.total
        setTotalPage(Math.ceil(total / 4))
      })
      .catch(err => {
        setLoading(false)
        setProducts([])
        setTotalPage(0)
        console.log(err)

        toast({
          position: "top",
          title: err?.response?.data?.data,
          status: 'error',
          duration: 3000,
          isClosable: true
        })
      })
  }, [search, category, currentPage, sort])

  // useEffect(() => {
  //   Axios.get(`${apiUrl}/all-category`)
  //     .then(response => {
  //       setLoading(false)
  //       const data = response.data.data
  //       setCategories(data)
  //       dispatch({ type: 'GET_CATHEGORY', payload: data })
  //     })
  //     .catch(err => {
  //       setLoading(false)
  //       console.log(err)
  //     })
  // }, [])

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
    return (navigate('/user/login'))
  }

  return (
    <>
      <Header />
      <Loading state={{ loading }} />
      <ModalDelete state={{ confirmDelete, onBtnCancel, onConfirmDelete }} />
      <div className="app-wrapper">
        <div className="app-content pt-3 p-md-3 p-lg-4">
          <div className="container-xl">
            <div className="row g-3 mb-4 align-items-center justify-content-between">
              <div className="col-auto">
                <h1 className="app-page-title mb-0">My Products</h1>
              </div>
              <div className="col-auto">
                <div className="page-utilities">
                  <div className="row g-2 justify-content-start justify-content-md-end align-items-center">
                    <div className="col-auto">
                      <div className="row gx-1 align-items-center">
                        <div className="col-auto">
                          <input type="text" className="form-control" placeholder="Search" ref={searcKey} />
                        </div>
                        <div className="col-auto">
                          <button type="btn" className="btn app-btn-secondary btn-secondary" onClick={onHandleSearch}>Search</button>
                        </div>
                      </div>

                    </div>
                    <div className="col-auto">
                      <select defaultValue={""} className="form-select w-auto" onChange={onHandleCategory}>
                        <option value="" selected>All</option>
                        {
                          categories.map(category => {
                            return (
                              <option key={category.id} value={category.categoryName}>{category.categoryName}</option>
                            )
                          })
                        }
                      </select>
                    </div>
                    <div className="col-auto">
                      <select defaultValue={""} className="form-select w-auto" ref={sortSelected} onChange={onHandleSort}>
                        <option value="">No Sorting</option>
                        <option value="asc">Sort low to higher price</option>
                        <option value="desc">Sort high to lower price</option>
                      </select>
                    </div>
                    <div className="col-auto">
                      <RouterLink to={"/admin/add-product"} className="btn app-btn-primary btn-info">
                        Add Product
                      </RouterLink>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="row g-4 d-flex justify-content-center">
              {
                products.map(product => {
                  return (
                    <div className="col-6 col-md-4 col-xl-3 col-xxl-3">
                      <div className="app-card app-card-doc shadow-sm h-100">
                        <div className="app-card-thumb-holder p-3" style={{ "height": 300 }}>
                          <div className="app-card-thumb">
                            <img className="thumb-image" style={{ "objectFit": "contain" }} src={product.image} alt="" />
                          </div>
                          <a className="app-card-link-mask" href="#file-link"></a>
                        </div>
                        <div className="app-card-body p-3 has-card-actions">
                          <Heading as={"h2"} className="app-doc-title truncate mb-2">{product.productName}</Heading>
                          <div className="app-doc-meta">
                            <ul key={product.id} className="list-unstyled mb-2">
                              <li className="mb-2">
                                <span className="text-secondary">
                                  <NumberFormat
                                    value={product.price}
                                    displayType={'text'}
                                    thousandSeparator={true}
                                    prefix={'Rp. '}
                                    renderText={value => <span>{value}</span>}
                                  />
                                </span>
                              </li>
                              <li><span className="text-secondary mb-2">Stock:</span> {product.stock}</li>
                              <li className="my-2"><Badge variant='solid' colorScheme='purple'>{product.categoryName}</Badge></li>
                            </ul>
                          </div>
                          <div className="app-card-actions">
                            <div className="dropdown">
                              <div className="dropdown-toggle no-toggle-arrow" data-bs-toggle="dropdown" aria-expanded="false">
                                <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-three-dots-vertical" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                  <path fillRule="evenodd" d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
                                </svg>
                              </div>
                              <Crud state={{ id: product.id, fnDelete: () => handleBtnDelete(product.id) }} />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })
              }
            </div>
            {
              totalPage ? <Pagination state={{ onHandlePageClick, totalPage }} />
                :
                null
            }
          </div>
        </div>
        <Footer />
      </div >
    </>
  )
}

export default Product