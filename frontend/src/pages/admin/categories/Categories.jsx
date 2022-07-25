import React, { useEffect, useRef, useState } from "react"
import Axios from "axios"
import { Link, useNavigate } from "react-router-dom"
import { BsTrash, BsPencilSquare } from "react-icons/bs"
import Header from "../../../component/Header"
import Loading from "../../../component/subcomponent/Loading"
import Pagination from "../../../component/Pagination"
import Footer from "../../../component/Footer"
import { Button, useToast, Box } from "@chakra-ui/react"
import ModalDelete from "../../../component/subcomponent/ModalDelete"
import { LOADING_END } from "../../../redux/actions/types";
import { useDispatch } from 'react-redux';

const apiUrl = process.env.REACT_APP_API_URL

function Categories() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const categoryEdit = useRef("")
  const slugEdit = useRef("")
  const [loading, setLoading] = useState(false)
  const [categories, setCategories] = useState([])
  const [id, setId] = useState(null)
  const [edit, setEdit] = useState(false)
  const [confirmDelete, setConfirmDelete] = useState(false)
  const [totalPage, setTotalPage] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [catSearch, setCatSearch] = useState(null)
  const [num, setNum] = useState(0)

  const role = localStorage.getItem("akses")
  const token = localStorage.getItem("tokenAdmin")
  const keepLogin = localStorage.getItem("keepLogin")

  const search = useRef("")

  const toast = useToast()

  const onBtnEdit = (id) => {
    setEdit(true)
    setId(id)
  }

  const onBtnSave = () => {
    setLoading(true)
    Axios.patch(apiUrl + `/category/${id}`, {
      categoryName: categoryEdit.current.value,
      slug: slugEdit.current.value
    })
      .then(res => {
        Axios.get(apiUrl + `/category`)
          .then(res => {
            setCategories(res?.data?.data)
            setLoading(false)
            setEdit(false)
            setId(null)

            toast({
              position: "top",
              title: 'Edit success',
              status: 'success',
              duration: 3000,
              isClosable: true
            })
          }).catch(err => {
            setLoading(false)
            setEdit(false)
            setId(null)
            console.log(err)
          })
      })
      .catch(err => {
        setLoading(false)
        setEdit(false)
        setId(null)

        toast({
          position: "top",
          title: err?.response?.data?.data,
          status: 'error',
          duration: 3000,
          isClosable: true
        })
        console.log(err)
      })
  }

  const onBtnCancel = () => {
    setEdit(false)
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
    Axios.delete(apiUrl + `/category/${id}`)
      .then(res => {
        Axios.get(apiUrl + `/category`)
          .then(res => {
            setCategories(res.data.data)
            setLoading(false)
            setEdit(false)
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
            setEdit(false)
            setId(null)

            toast({
              position: "top",
              title: err?.response?.data?.data,
              status: 'error',
              duration: 3000,
              isClosable: true
            })

            console.log(err)
          })
      })
      .catch(err => {
        setLoading(false)
        setEdit(false)
        setId(null)

        toast({
          position: "top",
          title: err?.response?.data?.data,
          status: 'error',
          duration: 3000,
          isClosable: true
        })
        console.log(err)
      })
  }

  const onHandlePageClick = (data) => {
    setCurrentPage(data.selected + 1)
  }

  const onHandleSearch = () => {
    setCatSearch(search.current.value)
  }

  useEffect(() => {
    setLoading(true)
    Axios.get(apiUrl + `/category`, {
      params: {
        search: catSearch,
        per_page: 5,
        current_page: currentPage
      }
    })
      .then(res => {
        setLoading(false)
        setCategories(res.data.data)

        const total = res.data.total_count.total_category
        setTotalPage(Math.ceil(total / 5))
      })
      .catch(err => {
        setLoading(false)
        setCategories([])
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
  }, [currentPage, catSearch])

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
                <h1 className="app-page-title mb-0">Categories</h1>
              </div>
              <div className="col-auto">
                <div className="page-utilities">
                  <div className="row g-2 justify-content-start justify-content-md-end align-items-center">
                    <div className="col-auto">
                      <div className="row gx-1 align-items-center">
                        <div className="col-auto">
                          <input type="text" className="form-control" placeholder="Search" ref={search} />
                        </div>
                        <div className="col-auto">
                          <button className="btn app-btn-secondary btn-secondary" onClick={onHandleSearch}>Search</button>
                        </div>
                      </div>
                    </div>
                    <div className="col-auto">
                      <Link to={"/admin/add-category"} className="btn app-btn-primary btn-info">
                        Add Category
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
                            <th className="cell">Category Name</th>
                            <th className="cell">Slug</th>
                            <th className="cell" colSpan={2}>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {
                            categories.map((category, index) => {
                              if (edit && category.id === id) {
                                return (
                                  <tr>
                                    <td className="cell">{(currentPage - 1) * 5 + index + 1}</td>
                                    <td className="cell"><input type="text" name="" id="" ref={categoryEdit} defaultValue={category.categoryName} /></td>
                                    <td className="cell"><input type="text" name="" id="" ref={slugEdit} defaultValue={category.slug} /></td>
                                    <td className="cell"><Button onClick={onBtnSave} color={"green.300"}>Save</Button></td>
                                    <td className="cell"><Button color={"red"} onClick={onBtnCancel}>Cancel</Button></td>
                                  </tr>
                                )
                              }
                              else {
                                return (
                                  <tr>
                                    <td className="cell">{(currentPage - 1) * 5 + index + 1}</td>
                                    <td className="cell">{category.categoryName}</td>
                                    <td className="cell">{category.slug}</td>
                                    <td className="cell"><BsPencilSquare size={16} color={"orange"} onClick={() => onBtnEdit(category.id)} /></td>
                                    <td className="cell"><BsTrash size={16} color={"red"} onClick={() => handleBtnDelete(category.id)} /></td>
                                  </tr>
                                )
                              }
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

export default Categories