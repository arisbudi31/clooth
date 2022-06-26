import React, { useEffect, useRef, useState } from "react"
import Axios from "axios"
import { Link } from "react-router-dom"
import { BsTrash, BsPencilSquare } from "react-icons/bs"
import Header from "../../../component/Header"
import Loading from "../../../component/subcomponent/Loading"
import Pagination from "../../../component/Pagination"
import Footer from "../../../component/Footer"
import { Button, useToast } from "@chakra-ui/react"
import ModalDelete from "../../../component/subcomponent/ModalDelete"

function Categories() {
  const categoryEdit = useRef("")
  const slugEdit = useRef("")
  const [loading, setLoading] = useState(false)
  const [categories, setCategories] = useState([])
  const [id, setId] = useState(null)
  const [edit, setEdit] = useState(false)
  const [confirmDelete, setConfirmDelete] = useState(false)
  const toast = useToast()

  const onBtnEdit = (id) => {
    setEdit(true)
    setId(id)
  }

  const onBtnSave = () => {
    setLoading(true)
    Axios.patch(`http://localhost:2000/categories/${id}`, {
      category_name: categoryEdit.current.value,
      slug: slugEdit.current.value
    })
      .then(res => {
        Axios.get(`http://localhost:2000/categories`)
          .then(res => {
            setCategories(res.data)
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
            console.log(err)
          })
      })
      .catch(err => {
        setLoading(false)
        setEdit(false)
        setId(null)

        toast({
          position: "top",
          title: 'Edit failed',
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
    Axios.delete(`http://localhost:2000/categories/${id}`)
      .then(res => {
        Axios.get(`http://localhost:2000/categories`)
          .then(res => {
            setCategories(res.data)
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
        setEdit(false)
        setId(null)

        toast({
          position: "top",
          title: 'Edit failed',
          status: 'error',
          duration: 3000,
          isClosable: true
        })
        console.log(err)
      })
  }

  useEffect(() => {
    setLoading(true)
    Axios.get("http://localhost:2000/categories")
      .then(res => {
        setLoading(false)
        setCategories(res.data)
      })
      .catch(err => {
        setLoading(false)
        console.log(err)
      })
  }, [])

  return (
    <>
      <Header />
      <Loading state={{ loading }} />
      <ModalDelete state={{ confirmDelete, onBtnCancel, onConfirmDelete }} />
      <div class="app-wrapper">

        <div class="app-content pt-3 p-md-3 p-lg-4">
          <div class="container-xl">

            <div class="row g-3 mb-4 align-items-center justify-content-between">
              <div class="col-auto">
                <h1 class="app-page-title mb-0">Categories</h1>
              </div>
              <div class="col-auto">
                <div class="page-utilities">
                  <div class="row g-2 justify-content-start justify-content-md-end align-items-center">
                    <div class="col-auto">
                      <form class="table-search-form row gx-1 align-items-center">
                        <div class="col-auto">
                          <input type="text" id="search-orders" name="searchorders" class="form-control search-orders" placeholder="Search" />
                        </div>
                        <div class="col-auto">
                          <button type="submit" class="btn app-btn-secondary">Search</button>
                        </div>
                      </form>
                    </div>
                    <div class="col-auto">
                      {/* <a class="btn app-btn-secondary" href="#">
                        Add Category
                      </a> */}
                      <Link to={"/admin/add-category"} className={"btn app-btn-secondary"}>
                        Add Category
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="tab-content" id="orders-table-tab-content">
              <div class="tab-pane fade show active" id="orders-all" role="tabpanel" aria-labelledby="orders-all-tab">
                <div class="app-card app-card-orders-table shadow-sm mb-5">
                  <div class="app-card-body">
                    <div class="table-responsive">
                      <table class="table app-table-hover mb-0 text-left">
                        <thead>
                          <tr>
                            <th class="cell">No</th>
                            <th class="cell">Category Name</th>
                            <th class="cell">Slug</th>
                            <th class="cell" colSpan={2}>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {
                            categories.map((category, index) => {
                              if (edit && category.id === id) {
                                return (
                                  <tr>
                                    <td class="cell">{index + 1}</td>
                                    <td class="cell"><input type="text" name="" id="" ref={categoryEdit} defaultValue={category.category_name} /></td>
                                    <td class="cell"><input type="text" name="" id="" ref={slugEdit} defaultValue={category.slug} /></td>
                                    <td class="cell"><Button onClick={onBtnSave} color={"green.300"}>Save</Button></td>
                                    <td class="cell"><Button color={"red"} onClick={onBtnCancel}>Cancel</Button></td>
                                  </tr>
                                )
                              }
                              else {
                                return (
                                  <tr>
                                    <td class="cell">{index + 1}</td>
                                    <td class="cell">{category.category_name}</td>
                                    <td class="cell">{category.slug}</td>
                                    <td class="cell"><BsPencilSquare size={16} color={"orange"} onClick={() => onBtnEdit(category.id)} /></td>
                                    <td class="cell"><BsTrash size={16} color={"red"} onClick={() => handleBtnDelete(category.id)} /></td>
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
                <Pagination />
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