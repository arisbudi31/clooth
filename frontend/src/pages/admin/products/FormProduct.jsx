import React, { useRef, useState, useEffect } from "react"
import { Box, Button, Flex, Heading, Image, Input, Text, Textarea, useToast } from "@chakra-ui/react"
import Axios from "axios"
import { useParams } from "react-router"
import { useLocation, useNavigate } from "react-router-dom"

function FormProduct(props) {
  // const location = useLocation()
  const [loading, setLoading] = useState(false)
  const productName = useRef("")
  const description = useRef("")
  const price = useRef("")
  const stock = useRef("")

  const [prod, setProd] = useState("")
  const [desc, setDesc] = useState("")
  const [prc, setPrc] = useState("")
  const [stc, setStc] = useState("")
  const [title, setTitle] = useState("")
  const [imageBase, setImageBase] = useState("https://dummyimage.com/100x100/a3a3a3/fff.jpg")
  const [imageEdit, setImageEdit] = useState("https://dummyimage.com/100x100/a3a3a3/fff.jpg")

  const { id } = useParams()
  const location = useLocation()
  const navigate = useNavigate()
  const toast = useToast()

  const imageHandler = (e) => {

    if (title === "Edit") {
      setImageEdit(URL.createObjectURL(e.target.files[0]))
    }
    else {
      setImageBase(URL.createObjectURL(e.target.files[0]))
    }
  }

  const onButtonAdd = () => {
    setLoading(true)

    Axios.post("http://localhost:2000/products", {
      productName: productName.current.value,
      description: description.current.value,
      price: price.current.value,
      stock: stock.current.value,
      image: "https://dummyimage.com/300x400/a3a3a3/fff.jpg"
    })
      .then(response => {
        setLoading(false)

        navigate('/product')

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
          title: 'Something wrong',
          status: 'danger',
          duration: 3000,
          isClosable: true
        })
      })
  }

  const onButtonEdit = () => {
    setLoading(true)
    Axios.patch(`http://localhost:2000/products/${id}`, {
      productName: productName.current.value,
      description: description.current.value,
      price: price.current.value,
      stock: stock.current.value,
      image: imageEdit
    })
      .then(response => {
        setLoading(false)

        navigate('/product')

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
          title: 'Something wrong',
          status: 'error',
          duration: 3000,
          isClosable: true
        })
      })
  }

  const onButtonCancel = () => {
    navigate('/product')
  }

  useEffect(() => {
    const titlePathname = location.pathname.includes("edit") ? "Edit" : "Add"

    setTitle(titlePathname)

    console.log(id)
    console.log(location.pathname)

    Axios.get(`http://localhost:2000/products/${id}`)
      .then(response => {
        const data = response.data
        setProd(data.productName)
        setDesc(data.description)
        setPrc(data.price)
        setStc(data.stock)
        setImageEdit(data.image)
      })
      .catch(err => {
        console.log(err)
      })

  }, [])

  return (
    <Box w={"100%"}>
      <Flex w={"100%"}
        alignItems="center"
        justifyContent={"center"}
        flexDirection="column"
        marginTop={16}
      >
        <Heading color={"green.500"}>{title + " "}Data Product</Heading>

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
          >{title} Product</Text>
          <Text marginBottom="15px">Product Name</Text>
          <Input defaultValue={title === "Edit" ? prod : ""} ref={productName} marginBottom="15px" type="text" />

          <Text marginBottom="15px">Description</Text>
          <Textarea defaultValue={title === "Edit" ? desc : ""} height={"200px"} ref={description} marginBottom="25px" type="text" />

          <Text marginBottom="15px">Price</Text>
          <Input defaultValue={title === "Edit" ? prc : ""} ref={price} marginBottom="15px" type="number" />

          <Text marginBottom="15px">Stock</Text>
          <Input defaultValue={title === "Edit" ? stc : ""} ref={stock} marginBottom="25px" type="number" />

          <Text marginBottom="15px">Product Image</Text>
          {title === "Edit" ?
            <Image objectFit={"cover"} boxSize={"100px"} mb={2}
              src={imageEdit}
              alt='Product Image'
              borderRadius={8} />
            :
            <Image objectFit={"cover"} boxSize={"100px"} mb={2}
              src={imageBase}
              alt='Product image'
              borderRadius={8} />
          }
          <Box>
            <Input
              onChange={imageHandler}
              marginBottom="25px"
              type="file"
              accept="image/*" w={"50%"} />
            <Button ml={2} disabled={loading} onClick="">Upload picture</Button>
          </Box>

          <Button
            colorScheme='teal'
            variant='solid'
            disabled={loading}
            onClick={title === "Edit" ? onButtonEdit : onButtonAdd}
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

export default FormProduct