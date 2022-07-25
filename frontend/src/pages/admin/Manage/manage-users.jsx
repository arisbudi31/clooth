import React, { useState, useEffect, useRef } from 'react'
import Axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from "react-router-dom";
import {
  Table,
  Thead,
  Th,
  Tr,
  Td,
  Tbody,
  Box,
  Menu,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  MenuButton,
  MenuList,
  MenuItem,
  Input,
  Button,
  Flex,
  useToast,
  IconButton,
  Text,
} from '@chakra-ui/react'
import { ChevronLeftIcon, ChevronRightIcon, Search2Icon, TriangleDownIcon } from '@chakra-ui/icons'

import { getUsersData, changeUserPermit, sortUsersData } from '../../../redux/actions/admin-actions'
import { GET_ERROR_USER, GET_USER_DATA, LOADING_START, LOADING_END } from '../../../redux/actions/types'

import Header from '../../../component/Header'
import Loading from '../../../component/subcomponent/Loading'
import Confirmation from '../../../component/subcomponent/ModalConfirmation'

export default function ManageUsers() {
  const API_URL = process.env.REACT_APP_API_URL
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const searchUsernameRef = useRef('')
  const toast = useToast()
  const [confirm, setConfirm] = useState(false)
  const [onSearch, setOnSearch] = useState(true)
  const [values, setValues] = useState({
    userId: '',
    userPermit: ''
  })
  const { data, count } = useSelector(state => state.users)
  const { loading } = useSelector(state => state.loading)
  const token = localStorage.getItem('tokenAdmin')
  const role = localStorage.getItem("akses")
  const [sort, setSort] = useState('id')
  const [order, setOrder] = useState('ASC')
  const [page, setPage] = useState(1)
  const limit = 5
  const keepLogin = localStorage.getItem("keepLogin")


  const showTable = () => {
    return data.map((user) => {
      return (
        <Tr key={user.id}
          fontSize={"sm"}
        >
          <Td>{user.id}</Td>
          <Td>{user.username}</Td>
          <Td>{user.email}</Td>
          <Td>{user.DOB}</Td>
          <Td>{user.gender}</Td>
          <Td>{user.status}</Td>
          <Td>{user.permit}</Td>
          <Td>
            <Menu>
              <Button
                size={"xs"}
                bg={user.permit === "enabled" ? "red.600" : "green.600"}
                color={"#FFFFFF"}
                onClick={() => onButtonChangePermit(user.id, user.permit)}
              >
                {user.permit === "enabled" ? "Deactivated" : "Activated"}
              </Button>
            </Menu>
          </Td>
        </Tr>
      )
    })
  }

  useEffect(() => {
    dispatch(getUsersData(token, sort, order, page, limit))
    if (role !== 'BearerAdmin' || role === null) {
      return (navigate('/user/login'))
    }
  }, [page])


  const onButtonChangePermit = (id, permit) => {
    setConfirm(true)
    let permitUser = ''
    if (permit === "enabled") {
      permitUser = 'disabled'
    } else {
      permitUser = 'enabled'
    }
    setValues({ ...values, userId: id, userPermit: permitUser });
  }

  const onBtnNo = () => {
    setConfirm(false)
  }
  const onBtnClose = () => {
    setConfirm(false)
  }

  const onBtnYes = () => {
    setConfirm(false)
    const body = { permit: values.userPermit }
    dispatch(changeUserPermit(token, values.userId, body, page, limit))
  }

  const onButtonNext = () => setPage((prev) => prev + 1)
  const onButtonPrev = () => {
    setPage((prev) => prev - 1)
    if (page <= 1) return
  }

  const searchUsername = () => {
    dispatch({ type: LOADING_START })
    setOnSearch(false)
    const username = searchUsernameRef.current.value
    Axios.get(API_URL + `/admin/search-user?_username=${username}`)
      .then((resp) => {
        dispatch({ type: LOADING_END })
        dispatch({ type: GET_USER_DATA, payload: { data: resp.data, count: 1, error: '' } })
      })
      .catch((err) => {
        dispatch({ type: LOADING_END })
        dispatch({ type: GET_ERROR_USER, payload: { error: err.response } })
        if (err.response) {
          return toast({
            title: `Error`,
            description: err.response.data,
            status: 'error',
            duration: 5000,
            isClosable: true,
          })
        }
      })
    searchUsernameRef.current.value = ''
  }

  const sortUsernameAsc = () => {
    dispatch(sortUsersData(token, 'username', 'ASC', page, limit))
    setSort('username')
    setOrder('ASC')
  }
  const sortUsernameDesc = () => {
    dispatch(sortUsersData(token, 'username', 'DESC', page, limit))
    setSort('username')
    setOrder('DESC')
  }
  const sortUserGenderAsc = () => {
    dispatch(sortUsersData(token, 'gender', 'ASC', page, limit))
    setSort('gender')
    setOrder('ASC')
  }
  const sortUserStatusAsc = () => {
    dispatch(sortUsersData(token, 'status', 'ASC', page, limit))
    setSort('status')
    setOrder('ASC')
  }
  const sortUserPermitAsc = () => {
    dispatch(sortUsersData(token, 'permit', 'ASC', page, limit))
    setSort('permit')
    setOrder('ASC')
  }

  const onGetUsers = () => {
    dispatch(getUsersData(token, sort, order, page, limit))
    setOnSearch(true)
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
    <>
      <Header />
      <Loading state={{ loading }} />
      <Box>
        <Flex>
          <Confirmation
            state={{ confirm, onBtnNo, onBtnYes, onBtnClose }}
          />
          <InputGroup
            w={"320px"}
            h={"40px"}
            position={"fixed"}
            mx={"260px"}
            my={"8px"}
            bg={"#FFFFFF"}
            borderRadius={"6px"}
            boxSizing={"border-box"}
            cursor="pointer"
            size={'sm'}
          >
            <InputLeftElement
              pointerEvents="none"
              children={<Search2Icon color={"#A0AEC0"} />}
            />
            <Input
              border={"1px solid #E2E8F0"}
              type="text"
              placeholder={"Search By Username"}
              ref={searchUsernameRef}
            >
            </Input>
            <InputRightElement width='4rem'>
              <Button
                onClick={searchUsername}
                size="sm"
                variant="ghost"
                colorScheme={"green"}
              >
                Search
              </Button>
            </InputRightElement>
          </InputGroup>
          <Menu >
            <Button
              disabled={onSearch}
              variant="ghost"
              colorScheme={onSearch ? "white" : "green"}
              color={onSearch ? "white" : "black"}
              border="1px"
              borderColor={onSearch ? "white" : "gray.200"}
              my={"8px"}
              mx={"590px"}
              size="sm"
              minW={"12vw"}
              onClick={onGetUsers}
            >Get All Users Data
            </Button>
          </Menu>
          <Menu >
            <MenuButton
              as={Button}
              rightIcon={<TriangleDownIcon />}
              w={"100px"}
              position={"absolute"}
              ml={"750px"}
              my={"8px"}
              variant={"ghost"}
              colorScheme={"green"}
              border="1px"
              borderColor={"gray.200"}
              size={"sm"}
            >
              Sort By
            </MenuButton>
            <MenuList>
              <MenuItem onClick={sortUsernameAsc}>Name A-Z</MenuItem>
              <MenuItem onClick={sortUsernameDesc}>Name Z-A</MenuItem>
              <MenuItem onClick={sortUserGenderAsc}>Gender A-Z</MenuItem>
              <MenuItem onClick={sortUserStatusAsc}>Status A-Z</MenuItem>
              <MenuItem onClick={sortUserPermitAsc}>Permit A-Z</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
        <Box
          px={"260px"}
          py={"20px"}
          boxSizing={"border-box"}
        >
          <Table
            variant={"striped"}
            size={"sm"}
            w={"75vw"}
          >
            <Thead borderBottom={"2px double black"}>
              <Tr bg="green.500">
                <Th textAlign={"center"} fontSize={"sm"} color={"white"}>User ID</Th>
                <Th textAlign={"center"} fontSize={"sm"} color={"white"}>Username</Th>
                <Th textAlign={"center"} fontSize={"sm"} color={"white"}>Email</Th>
                <Th textAlign={"center"} fontSize={"sm"} color={"white"}>DOB</Th>
                <Th textAlign={"center"} fontSize={"sm"} color={"white"}>Gender</Th>
                <Th textAlign={"center"} fontSize={"sm"} color={"white"}>Status</Th>
                <Th textAlign={"center"} fontSize={"sm"} color={"white"}>Permit</Th>
                <Th textAlign={"center"} fontSize={"sm"} color={"white"}>Action</Th>
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