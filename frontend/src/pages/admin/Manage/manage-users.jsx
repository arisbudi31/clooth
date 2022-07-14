import React, { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  Table,
  Thead,
  Th,
  Tr,
  Tbody,
  Box,
  Flex,
  useToast,
  IconButton,
  Text,
} from '@chakra-ui/react'
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons'

import Loading from '../../../component/subcomponent/Loading'
import ModalDelete from '../../../component/subcomponent/ModalDelete'

export default function ManageUsers() {
  const [loading, setLoading] = useState(false)
  const [confirmDelete, setConfirmDelete] = useState(false)

  const onButtonDelete = () => {
    setConfirmDelete(true)
  }

  const onButtonCancelDelete = () => {
    setConfirmDelete(false)
  }

  const onButtonConfirmDelete = () => {

    setConfirmDelete(false)
  }

  return (
    <Box
      px={"161px"}
      py={"20px"}
      w={"100%"}
    >
      <Loading onLoading={loading} />
      <ModalDelete
        isOpen={confirmDelete}
        title="Delete User Confirmation"
      // onButtonCancelDelete={onBtnCancel}
      // onButtonConfirmDelete={onConfirmDelete}
      />
      <Table
        variant={"unstyled"}
        bgColor={"gray.50"}
      >
        <Thead borderBottom={"2px double black"}>
          <Tr bg="gray.600" color={"white"}>
            <Th fontSize={"md"}>User ID</Th>
            <Th fontSize={"md"}>Username</Th>
            <Th fontSize={"md"}>Name</Th>
            <Th fontSize={"md"}>Email</Th>
            <Th fontSize={"md"}>DOB</Th>
            <Th fontSize={"md"}>Gender</Th>
            <Th fontSize={"md"}>Status</Th>
            <Th fontSize={"md"}>Action</Th>
          </Tr>
        </Thead>
        <Tbody fontFamily={"cursive"} fontWeight={"hairline"}>
          {/* {showTable()} */}
        </Tbody>
      </Table>
      <Flex
        alignItems="center"
        justifyContent={"flex-end"}
        my="10px"

      >
        {/* <IconButton
          icon={<ChevronLeftIcon />}
          onClick={onButtonPrev}
          disabled={page <= 1}
        /> */}
        {/* <Text fontSize="16px" mx="20px">page {page}</Text> */}
        {/* <IconButton
          icon={<ChevronRightIcon />}
          onClick={onButtonNext}
          disabled={page >= Math.ceil(count / limit)}
        /> */}
      </Flex>
    </Box>
  )
}