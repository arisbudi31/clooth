import React from "react";
import { useState, useRef } from "react";
import { Box, Flex, Heading, Text, Input, Button, Select, useToast } from '@chakra-ui/react';
import Axios from "axios"
import { useDispatch, useSelector } from 'react-redux/es/exports';
import { LOADING_START, LOADING_END, GET_ADMIN_DATA } from "../../../redux/actions/types";
import { useNavigate } from "react-router";

const apiUrl = process.env.REACT_APP_API_URL

function AddStock() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { loading } = useSelector(state => state.loading)
  const { categories } = useSelector(state => state.category)
  const [selectStatus, setSelectedStatus] = useState(null)
  const [products, setProducts] = useState([])
  const [productId, setProductId] = useState(null)
  const [initStock, setInitStock] = useState(null)
  const stock = useRef(0)
  const toast = useToast()
  const role = localStorage.getItem("akses")
  const token = localStorage.getItem("tokenAdmin")
  const keepLogin = localStorage.getItem("keepLogin")

  const onButtonCancel = () => {
    navigate('/admin/stockopname/')
  }

  const onBtnHandleCategory = (e) => {
    const selectCategory = e.target.value ? e.target.value : null

    dispatch({ type: LOADING_START })
    Axios.get(`${apiUrl}/product`, {
      params: {
        filter: selectCategory,
        per_page: 50
      }
    })
      .then(response => {
        dispatch({ type: LOADING_END })
        setProducts(response.data.data)
      })
      .catch(err => {
        dispatch({ type: LOADING_END })
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
  }

  const onBtnHandleStatus = (e) => {
    const selectStatus = e.target.value ? e.target.value : null
    setSelectedStatus(selectStatus)
  }

  const onBtnHandleProduct = (e) => {
    dispatch({ type: LOADING_START })
    Axios.get(`${apiUrl}/product/${e.target.value}`)
      .then(response => {
        dispatch({ type: LOADING_END })
        setProductId(e.target.value)
        setInitStock(response.data.data[0].stock)
      })
      .catch(err => {
        dispatch({ type: LOADING_END })
        console.log(err)

        toast({
          position: "top",
          title: err?.response?.data?.data,
          status: 'error',
          duration: 3000,
          isClosable: true
        })
      })
  }

  const onButtonAddStock = () => {
    dispatch({ type: LOADING_START })
    Axios.post(`${apiUrl}/stockopname`, {
      id_product: productId,
      qty: stock.current.value,
      status: selectStatus,
      initStock
    })
      .then(response => {
        dispatch({ type: LOADING_END })

        navigate('/admin/stockopname')

        toast({
          position: "top",
          title: 'Add stock success',
          status: 'success',
          duration: 3000,
          isClosable: true
        })
      })
      .catch(err => {
        dispatch({ type: LOADING_END })
        console.log(err)

        toast({
          position: "top",
          title: err?.response?.data?.data,
          status: 'error',
          duration: 3000,
          isClosable: true
        })
      })
  }

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
    <Box w={"100%"}>
      <Flex w={"100%"}
        alignItems="center"
        justifyContent={"center"}
        flexDirection="column"
        marginTop={16}
      >
        <Heading color={"green.500"}>Add Stock</Heading>

        <Box
          w="750px"
          backgroundColor="#FFFFFF"
          px="5%"
          py="3%"
          marginTop="5%"
          boxShadow="base"
        >
          <Text
            textAlign={"center"}
            mb={"32px"}
            fontSize={"18px"}
            fontWeight={"bold"}
          >Add Stock</Text>
          <Text marginBottom="15px" marginTop="15px">Product Category</Text>
          <Select placeholder="Select Category" onChange={onBtnHandleCategory}>
            {
              categories.map(category => {
                return (
                  <option value={category.categoryName}>{category.categoryName}</option>
                )
              })
            }
          </Select>

          <Text marginTop="15px">Product Name</Text>
          <Select placeholder="Select Product" onChange={onBtnHandleProduct}>
            {
              products.map(product => {
                return (
                  <option value={product.id}>{product.productName}</option>
                )
              })
            }
          </Select>

          <Text marginTop="15px">Initial Stock</Text>
          <Input defaultValue={initStock} type="number" readOnly />

          <Text marginTop="15px">Quantity Added</Text>
          <Input defaultValue={1} ref={stock} type="number" min={1} />

          <Text marginTop="15px">Status</Text>
          <Select placeholder="Select Status" marginBottom={15} onChange={onBtnHandleStatus}>
            <option value='stock in'>stock in</option>
            <option value='stock out'>stock out</option>
            <option value='reserved'>reserved</option>
          </Select>

          <Button
            colorScheme='teal'
            variant='solid'
            disabled={loading}
            onClick={onButtonAddStock}
          >
            {loading ? 'Loading....' : 'Add Stock'}
          </Button>

          <Button
            ml={3}
            colorScheme='red'
            variant='solid'
            disabled={loading}
            onClick={onButtonCancel}
          >
            Cancel
          </Button>

        </Box>
      </Flex>
    </Box>
  )
}

export default AddStock