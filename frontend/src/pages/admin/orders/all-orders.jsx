import React, { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import {
  Table,
  Thead,
  Th,
  Tr,
  Td,
  Tbody,
  Box,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  Flex,
  IconButton,
  Text,
} from '@chakra-ui/react'
import { ChevronLeftIcon, ChevronRightIcon, TriangleDownIcon } from '@chakra-ui/icons'

import Header from '../../../component/Header'
import Loading from '../../../component/subcomponent/Loading'

import { getAllOrders, sortAllOrders } from '../../../redux/actions/admin-actions'
import { LOADING_END } from '../../../redux/actions/types'

export default function AllOrders() {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const role = localStorage.getItem("akses")
  const token = localStorage.getItem('tokenAdmin')
  const { data, count } = useSelector(state => state.order)
  const { loading } = useSelector(state => state.loading)
  const [sort, setSort] = useState('detailId')
  const [order, setOrder] = useState('ASC')
  const [page, setPage] = useState(1)
  const limit = 5
  const keepLogin = localStorage.getItem("keepLogin")

  const showTable = () => {
    return data.map((order) => {
      return (
        <Tr key={order.detailId}
          fontSize={"sm"}

        >
          <Td textAlign={"center"}>{order.detailId}</Td>
          <Td textAlign={"center"}>{order.invId}</Td>
          <Td>{order.invNumber}</Td>
          <Td textAlign={"center"}>{order.productId}</Td>
          <Td textAlign={"center"}>{order.qtyOrder}</Td>
          <Td>Rp {order.totalPayment}</Td>
          <Td>{order.paymentDate}</Td>
          <Td>{order.shippingStatus}</Td>
          <Td color={order.adminApproved === "Accepted" ? "green.500" : order.adminApproved === "Rejected" ? "red.500" : "black"}>{order.adminApproved}</Td>
        </Tr>
      )
    })
  }

  useEffect(() => {
    dispatch(getAllOrders(token, sort, order, page, limit))
    if (role !== 'BearerAdmin' || role === null) {
      return (navigate('/user/login'))
    }
  }, [page])


  const onButtonNext = () => setPage((prev) => prev + 1)
  const onButtonPrev = () => {
    setPage((prev) => prev - 1)
    if (page <= 1) return
  }

  const sortInvNumberAsc = () => {
    dispatch(sortAllOrders(token, 'invNumber', 'ASC', page, limit))
    setSort('invNumber')
    setOrder('ASC')
  }

  const sortDateAsc = () => {
    dispatch(sortAllOrders(token, 'paymentDate', 'ASC', page, limit))
    setSort('paymentDate')
    setOrder('ASC')
  }

  const sortTotalAsc = () => {
    dispatch(sortAllOrders(token, 'totalPayment', 'ASC', page, limit))
    setSort('totalPayment')
    setOrder('ASC')
  }

  const sortQtyOrderAsc = () => {
    dispatch(sortAllOrders(token, 'qtyOrder', 'ASC', page, limit))
    setSort('qtyOrder')
    setOrder('ASC')
  }

  const sortShippingAsc = () => {
    dispatch(sortAllOrders(token, 'shippingStatus', 'ASC', page, limit))
    setSort('shippingStatus')
    setOrder('ASC')
  }

  const sortStatusAsc = () => {
    dispatch(sortAllOrders(token, 'adminApproved', 'ASC', page, limit))
    setSort('adminApproved')
    setOrder('ASC')
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
    return (navigate('/login'))
  }

  return (
    <>
      <Header />
      <Loading state={{ loading }} />
      <Box>
        <Box>
          <Menu >
            <MenuButton
              as={Button}
              rightIcon={<TriangleDownIcon />}
              w={"100px"}
              position={"static"}
              ml={"260px"}
              my={"8px"}
              variant={"ghost"}
              colorScheme={"blue"}
              border="1px"
              borderColor={"gray.200"}
              size={"sm"}
            >
              Sort By
            </MenuButton>
            <MenuList>
              <MenuItem onClick={sortInvNumberAsc}>Inv Number A-Z</MenuItem>
              <MenuItem onClick={sortDateAsc}>Date A-Z</MenuItem>
              <MenuItem onClick={sortTotalAsc}>Total A-Z</MenuItem>
              <MenuItem onClick={sortQtyOrderAsc}>Quantity A-Z</MenuItem>
              <MenuItem onClick={sortShippingAsc}>Shipping A-Z</MenuItem>
              <MenuItem onClick={sortStatusAsc}>Status A-Z</MenuItem>
            </MenuList>
          </Menu>
        </Box>
        <Box
          px={"260px"}
          py={"20px"}
          boxSizing={"border-box"}
          position={"inherit"}
        >
          <Table
            variant={"simple"}
            size={"sm"}
            w={"78vw"}
          >
            <Thead borderBottom={"2px double black"}>
              <Tr bg="blue.500">
                <Th textAlign={"center"} fontSize={"sm"} color={"white"}>Detail Id</Th>
                <Th textAlign={"center"} fontSize={"sm"} color={"white"}>Inv Id</Th>
                <Th textAlign={"center"} fontSize={"sm"} color={"white"}>Invoice No</Th>
                <Th textAlign={"center"} fontSize={"sm"} color={"white"}>Product Id</Th>
                <Th textAlign={"center"} fontSize={"sm"} color={"white"}>Qty</Th>
                <Th textAlign={"center"} fontSize={"sm"} color={"white"}>Total</Th>
                <Th textAlign={"center"} fontSize={"sm"} color={"white"}>Date</Th>
                <Th textAlign={"center"} fontSize={"sm"} color={"white"}>Shipping</Th>
                <Th textAlign={"center"} fontSize={"sm"} color={"white"}>Status</Th>
              </Tr>
            </Thead>
            <Tbody fontFamily={"cursive"} fontWeight={"hairline"}>
              {showTable()}
            </Tbody>
          </Table>
          <Flex
            alignItems="center"
            justifyContent={"left"}
            my="10px"

          >
            <IconButton
              icon={<ChevronLeftIcon />}
              onClick={onButtonPrev}
              disabled={page <= 1}
              size="sm"
            />
            <Text fontSize="14px" mx="20px">page {page}</Text>
            <IconButton
              icon={<ChevronRightIcon />}
              onClick={onButtonNext}
              disabled={page >= Math.ceil(count / limit)}
              size="sm"
            />
          </Flex>
        </Box>
      </Box>
    </>
  )
}