import React, { useRef, useState, useEffect } from "react"
import { Box, Button, Flex, Heading, Image, Input, Text, Textarea, useToast } from "@chakra-ui/react"
import Axios from "axios"
import { useNavigate } from 'react-router-dom';
import { LOADING_END } from "../../../redux/actions/types";
import { useDispatch } from 'react-redux';

const apiUrl = process.env.REACT_APP_API_URL

function FormCategories() {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)
  const category_name = useRef("")
  const slug = useRef("")
  const navigate = useNavigate()
  const toast = useToast()

  const role = localStorage.getItem("akses")
  const token = localStorage.getItem("tokenAdmin")
  const keepLogin = localStorage.getItem("keepLogin")

  const onButtonAddCategories = () => {
    setLoading(true)

    Axios.post(apiUrl + "/category", {
      categoryName: category_name.current.value,
      slug: slug.current.value
    })
      .then(response => {
        setLoading(false)

        navigate('/admin/categories')

        toast({
          position: "top",
          title: 'Add product success',
          status: 'success',
          duration: 3000,
          isClosable: true
        })

      })
      .catch(err => {
        setLoading(false)
        console.log(err)

        toast({
          position: "top",
          title: err.response.data.data,
          status: 'error',
          duration: 3000,
          isClosable: true
        })
      })
  }

  const onButtonCancel = () => {
    navigate('/admin/categories/')
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
        <Heading color={"green.500"}>Add Categories</Heading>

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
          >Add Categories</Text>
          <Text marginBottom="15px">Category Name</Text>
          <Input defaultValue="" ref={category_name} marginBottom="15px" type="text" />

          <Text marginBottom="15px">Slug</Text>
          <Input defaultValue="" ref={slug} marginBottom="15px" type="text" />

          <Button
            colorScheme='teal'
            variant='solid'
            disabled={loading}
            onClick={onButtonAddCategories}
          >
            {loading ? 'Loading....' : 'Save'}
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

export default FormCategories