import React, { useState, useEffect, useRef } from 'react'
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
    MenuButton,
    MenuList,
    MenuItem,
    Button,
    Flex,
    IconButton,
    Text,
} from '@chakra-ui/react'
import { ChevronLeftIcon, ChevronRightIcon, TriangleDownIcon} from '@chakra-ui/icons'

import Header from '../../../component/Header'
import Loading from '../../../component/subcomponent/Loading'
import Confirmation from '../../../component/subcomponent/ModalConfirmation'

import {getNewOrders, approveOrder, sortNewOrders} from '../../../redux/actions/admin-actions'

export default function NewOrder() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [confirm, setConfirm] = useState(false)
    const [values, setValues] = useState({
        invId: '',
        adminApproved: ''
    })
    const {data, count} = useSelector(state => state.order)
    const {loading} = useSelector(state => state.loading)
    const role = localStorage.getItem("akses")
    const token = localStorage.getItem('tokenAdmin')
    const [sort, setSort] = useState('invId')
    const [order, setOrder] = useState('ASC')
    const [page, setPage] = useState(1)
    const limit = 5
    
    
    const showTable = () => {
        return data.map((order)=> {
            return (
               <Tr key={order.invId}
                    fontSize={"sm"}
               >
                   <Td>{order.invId}</Td>
                   <Td>{order.invNumber}</Td>
                   <Td>Rp {order.totalPayment}</Td>
                   <Td>{order.paymentDate}</Td>
                   <Td>{order.paymentEvidence}</Td>
                   <Td>{order.adminApproved}</Td>
                   <Td>
                       <Flex>
                            <Menu>
                                <Button
                                    size={"xs"}
                                    bg={"green.600"} 
                                    color={"#FFFFFF"} 
                                    onClick={()=> onButtonAccepted(order.invId)}
                                >
                                    Accepted
                                </Button>
                            </Menu>
                            <Menu>
                            <Button
                                    size={"xs"}
                                    bg={"red.600"} 
                                    color={"#FFFFFF"} 
                                    onClick={()=> onButtonRejected(order.invId)}
                                >
                                    Rejected
                                </Button>
                            </Menu>
                       </Flex>
                   </Td>
               </Tr>
            )   
        })
    }

    useEffect (() => {
        dispatch(getNewOrders(token, sort, order, page, limit))
        if(role !== 'BearerAdmin' || role === null){
            return (navigate('/user/login'))
        }
    }, [page])


    const onButtonAccepted = (id) => {
        setConfirm(true)        
        setValues({ ...values, invId: id, adminApproved: 'Accepted'});
    }
    
    const onButtonRejected = (id) => {
        setConfirm(true)        
        setValues({ ...values, invId: id, adminApproved: 'Rejected'});
    }

    const onBtnNo = () => {
        setConfirm(false)
    }
    const onBtnClose = () => {
        setConfirm(false)
    }
    
    const onBtnYes = () => {
        setConfirm(false)
        const body = {adminApproved: values.adminApproved}
        dispatch(approveOrder(token, values.invId, body, sort, order, page, limit))
    } 

    const onButtonNext = () => setPage((prev) => prev + 1)
    const onButtonPrev = () => {
        setPage((prev) => prev - 1)
        if (page <= 1) return
    }

    const sortInvNumberAsc = () => {
        dispatch(sortNewOrders(token, 'invNumber', 'ASC', page, limit))
        setSort('invNumber')
        setOrder('ASC')
    }

    const sortDateAsc = () => {
        dispatch(sortNewOrders(token, 'paymentDate', 'ASC', page, limit))
        setSort('paymentDate')
        setOrder('ASC')
    }

    const sortTotalAsc = () => {
        dispatch(sortNewOrders(token, 'totalPayment', 'ASC', page, limit))
        setSort('totalPayment')
        setOrder('ASC')
    }

    return(
        <>
        <Header/>
        <Loading state={{ loading }} />
        <Box>
            <Box>
                <Confirmation
                    state={{confirm, onBtnNo, onBtnYes, onBtnClose }}
                />
                <Menu >
                    <MenuButton 
                        as={Button} 
                        rightIcon={<TriangleDownIcon />}
                        w={"100px"}
                        position={"static"}
                        ml={"260px"}
                        my={"8px"}
                        variant={"ghost"}
                        colorScheme={"orange"}
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
                    variant={"striped"}
                    size={"sm"}
                    w={"75vw"}
                >
                    <Thead borderBottom={"2px double black"}>
                        <Tr bg="orange.500">
                            <Th textAlign={"center"} fontSize={"sm"} color={"white"}>Id</Th>
                            <Th textAlign={"center"} fontSize={"sm"} color={"white"}>Invoice No</Th>
                            <Th textAlign={"center"} fontSize={"sm"} color={"white"}>Total</Th>
                            <Th textAlign={"center"} fontSize={"sm"} color={"white"}>Date</Th>
                            <Th textAlign={"center"} fontSize={"sm"} color={"white"}>Evidence</Th>
                            <Th textAlign={"center"} fontSize={"sm"} color={"white"}>Status</Th>
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
                        disabled={page >= Math.ceil(count/limit)}
                        size="sm"
                    />
                </Flex>
            </Box>
        </Box>
    </>
    )
}