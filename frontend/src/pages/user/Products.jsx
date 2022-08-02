import React, { useEffect, useState, useRef } from "react";
import Axios from "axios"
import Footer from "./component/Footer";
import Header from "./component/Header";
import ProductBanner from "./component/product/ProductBanner";
import { useToast } from '@chakra-ui/react';
import Pagination from "./component/product/subcomponent/Pagination";
import { Link } from "react-router-dom";
import { useDispatch } from 'react-redux/es/exports';
import NumberFormat from 'react-number-format';
import { UPDATE_CARTS } from "../../redux/actions/types";
const apiUrl = process.env.REACT_APP_API_URL

function Products() {
  const dispatch = useDispatch()
  const [products, setProducts] = useState([])
  const [totalPage, setTotalPage] = useState(null)
  const [currentPage, setCurrentPage] = useState(null)
  const [category, setCategory] = useState(null)
  const [search, setSearch] = useState("")
  const [sort, setSort] = useState(null)
  const [categories, setCategories] = useState([])

  const searcKey = useRef("")
  const sortSelected = useRef(null)

  const toast = useToast()

  const onHandlePageClick = (data) => {
    setCurrentPage(data.selected + 1)
  }

  const onHandleCategory = (e) => {
    console.log(e.target.value)
    const selectCategory = e.target.value === "All" ? "" : e.target.value
    setCategory(selectCategory)
  }

  const onHandleSort = () => {
    setSort(sortSelected.current.value)
  }

  const onHandleSearch = () => {
    setSearch(searcKey.current.value)
  }

  const onHandleAddtoCart = (id) => {
    Axios.post(`${apiUrl}/carts`, {
      id_product: id
    })
      .then(response => {
        const totalCart = response.data

        console.log(totalCart?.total_count?.total_cart)
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
    Axios.get(`${apiUrl}/product`, {
      params: {
        search: search,
        filter: category,
        sort: sort,
        per_page: 6,
        current_page: currentPage,
      }
    })
      .then(response => {
        setProducts(response.data.data)

        const total = response.data.total_count.total
        setTotalPage(Math.ceil(total / 6))
      })
      .catch(err => {
        setProducts([])
        console.log(err)

        toast({
          position: "top",
          title: err?.response?.data?.data,
          status: 'error',
          duration: 3000,
          isClosable: true
        })
      })
  }, [currentPage, category, sort, search])

  useEffect(() => {
    Axios.get(`${apiUrl}/all-category`)
      .then(response => {
        setCategories(response.data.data)
      })
      .catch(err => {
        console.log(err)
      })
  }, [])

  return (
    <>
      <Header />
      <ProductBanner />
      <div className="container mt-7">
        <div className="row">
          <div className="col-8 d-flex">
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
            <select defaultValue={""} className="form-select w-auto ml-3" ref={sortSelected} onChange={onHandleSort}>
              <option value="">No Sorting</option>
              <option value="asc">Sort low to higher price</option>
              <option value="desc">Sort high to lower price</option>
            </select>
          </div>
          <div className="col-4 d-flex">
            <input className="form-control" type="text" name="search_product" id="search_product" placeholder="search" ref={searcKey} />
            <button className="btn btn-info ml-3" onClick={onHandleSearch}>Search</button>
          </div>
        </div>
      </div>
      <section class="section" id="products">
        <div class="container">
          <div class="row">
            <div class="col-lg-12">
              <div class="section-heading">
                <h2>Our Products</h2>
                <span>Check out all of our products.</span>
              </div>
            </div>
          </div>
        </div>

        <div class="container">
          <div class="row">
            {
              products.map(product => {
                return (
                  <div class="col-lg-4">
                    <div class="item">
                      <div class="thumb">
                        <div class="hover-content">
                          <ul>
                            <li>
                              <Link to={`/detail-product/${product.id}`}><i class="fas fa-eye"></i></Link>
                            </li>
                            <li>
                              <Link to={""} onClick={() => onHandleAddtoCart(product.id)}>
                                <i class="fa fa-shopping-cart"></i>
                              </Link>
                            </li>
                          </ul>
                        </div>
                        <img className="image-product" src={product.image} alt="" />
                      </div>
                      <div class="down-content">
                        <h4>{product.productName}</h4>
                        <NumberFormat
                          value={product.price}
                          displayType={'text'}
                          thousandSeparator={true}
                          prefix={'Rp. '}
                          renderText={value => <span>{value}</span>}
                        />
                      </div>
                    </div>
                  </div>
                )
              })
            }
            <div class="col-lg-12">
              <div class="pagination">
                <ul>
                  {
                    totalPage ? <Pagination state={{ onHandlePageClick, totalPage }} /> : null
                  }
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>

  )
}

export default Products