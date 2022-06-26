import React, { useEffect, useState } from "react"
import Axios from "axios"
import { Link as RouterLink } from "react-router-dom"
import Header from './../../../component/Header';
import Loading from "../../../component/subcomponent/Loading";
import { Heading, useToast } from "@chakra-ui/react";
import Crud from './../../../component/subcomponent/Crud';
import Pagination from "../../../component/Pagination";
import Footer from "../../../component/Footer";
import ModalDelete from "../../../component/subcomponent/ModalDelete";

function Product() {

  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [id, setId] = useState(null)
  const [confirmDelete, setConfirmDelete] = useState(false)
  const [loading, setLoading] = useState(false)

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
    Axios.delete(`http://localhost:2000/products/${id}`)
      .then(res => {
        Axios.get(`http://localhost:2000/products`)
          .then(res => {
            setProducts(res.data)
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

  useEffect(() => {
    setLoading(true)
    Axios.get("http://localhost:2000/products")
      .then(response => {
        setLoading(false)
        setProducts(response.data)
      })
      .catch(err => {
        console.log(err)
      })

    Axios.get("http://localhost:2000/categories")
      .then(response => {
        setLoading(false)
        setCategories(response.data)
      })
      .catch(err => {
        console.log(err)
      })
  }, [])

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
                      <form className="docs-search-form row gx-1 align-items-center">
                        <div className="col-auto">
                          <input type="text" id="search-docs" name="searchdocs" className="form-control search-docs" placeholder="Search" />
                        </div>
                        <div className="col-auto">
                          <button type="submit" className="btn app-btn-secondary">Search</button>
                        </div>
                      </form>

                    </div>
                    <div className="col-auto">
                      <select className="form-select w-auto">
                        <option defaultValue="option-1">All</option>
                        {
                          categories.map(category => {
                            return (
                              <option defaultValue={category.id}>{category.category_name}</option>
                            )
                          })
                        }
                      </select>
                    </div>
                    <div className="col-auto">
                      <select className="form-select w-auto">
                        <option defaultValue="option-1">Sort to higher price</option>
                        <option defaultValue="option-2">Sort to lower price</option>
                        <option defaultValue="option-3">Sort trend</option>
                      </select>
                    </div>
                    <div className="col-auto">
                      <RouterLink to={"/admin/add-product"} className="btn app-btn-primary">
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
                            <ul className="list-unstyled mb-2">
                              <li className="mb-2"><span className="text-secondary">Rp. </span>{product.price}</li>
                              <li><span className="text-secondary">Stock:</span> {product.stock}</li>
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
            <Pagination />
          </div>
        </div>
        <Footer />
      </div >
    </>
  )
}

export default Product