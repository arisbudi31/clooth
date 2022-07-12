import React, { useRef, useState, useEffect } from "react"
import { Box, Button, Flex, Heading, Image, Input, Text, Textarea, useToast } from "@chakra-ui/react"
import Axios from "axios"
import { useNavigate } from 'react-router-dom';

const apiUrl = process.env.REACT_APP_API_URL

function FormCategories() {
  // const location = useLocation()
  const [loading, setLoading] = useState(false)
  const category_name = useRef("")
  const slug = useRef("")
  const navigate = useNavigate()
  const toast = useToast()

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