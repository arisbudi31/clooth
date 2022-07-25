import React, { useRef, useState, useEffect } from "react"
import { Box, Button, Flex, Heading, Image, Input, Select, Text, Textarea, useToast } from "@chakra-ui/react"
import Axios from "axios"
import { useParams } from "react-router"
import { useLocation, useNavigate } from "react-router-dom"
import { LOADING_END } from "../../../redux/actions/types";
import { useDispatch } from 'react-redux/es/exports';

const apiUrl = process.env.REACT_APP_API_URL
function FormProduct(props) {

  const [loading, setLoading] = useState(false)
  const productName = useRef("")
  const description = useRef("")
  const price = useRef("")
  const stock = useRef("")
  const dispatch = useDispatch()

  const [saveImage, setSaveImage] = useState(null)
  const [prod, setProd] = useState("")
  const [desc, setDesc] = useState("")
  const [prc, setPrc] = useState("")
  const [stc, setStc] = useState("")
  const [title, setTitle] = useState("")
  const [idCategoryBase, setIdCategoryBase] = useState(null)
  const [idCategory, setIdCategory] = useState(null)
  const [categories, setCategories] = useState([])
  const [imageBase, setImageBase] = useState("https://dummyimage.com/100x100/a3a3a3/fff.jpg")
  const [imageEdit, setImageEdit] = useState("https://dummyimage.com/100x100/a3a3a3/fff.jpg")

  const { id } = useParams()
  const location = useLocation()
  const navigate = useNavigate()
  const toast = useToast()
  const role = localStorage.getItem("akses")
  const token = localStorage.getItem("tokenAdmin")
  const keepLogin = localStorage.getItem("keepLogin")

  const imageHandler = (e) => {

    if (title === "Edit") {
      setSaveImage(e.target.files[0])
      setImageEdit(URL.createObjectURL(e.target.files[0]))
    }
    else {
      setSaveImage(e.target.files[0])
      setImageBase(URL.createObjectURL(e.target.files[0]))
    }
  }

  const onButtonAdd = async () => {
    setLoading(true)

    await Axios.post(apiUrl + "/product", {
      productName: productName.current.value,
      description: description.current.value,
      price: price.current.value,
      stock: stock.current.value,
      idCategory,
      image: "https://dummyimage.com/300x400/a3a3a3/fff.jpg"
    })
      .then(response => {
        setLoading(false)

        navigate('/admin/product')

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

        toast({
          position: "top",
          title: err.response.data.data,
          status: 'error',
          duration: 3000,
          isClosable: true
        })
      })

  }

  const onButtonEdit = () => {
    setLoading(true)
    Axios.patch(`${apiUrl}/product/${id}`, {
      productName: productName.current.value,
      description: description.current.value,
      price: price.current.value,
      stock: stock.current.value,
      idCategory: idCategory ? idCategory : idCategoryBase
    })
      .then(response => {
        setLoading(false)

        navigate('/admin/product')

        toast({
          position: "top",
          title: 'Edit product success',
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
    navigate('/admin/product')
  }

  const onUploadPicture = () => {
    setLoading(true)
    if (!saveImage) {
      setLoading(false)
      return toast({
        position: "top",
        title: 'Gambar perlu di upload',
        status: 'error',
        duration: 2000,
        isClosable: true
      })
    }

    const formData = new FormData()

    formData.append("image", saveImage, saveImage.name)

    Axios.post(apiUrl + `/product/upload/${id}`, formData)
      .then(response => {
        setLoading(false)

        toast({
          position: "top",
          title: 'Gambar berhasil di upload',
          status: 'success',
          duration: 2000,
          isClosable: true
        })

      })
      .catch(err => {
        console.log(err)
      })
  }

  const onChangeCategory = (e) => {
    setIdCategory(e.target.value)
  }

  useEffect(() => {
    const titlePathname = location.pathname.includes("edit") ? "Edit" : "Add"

    setTitle(titlePathname)

    Axios.get(`${apiUrl}/product/${id}`)
      .then(response => {
        const data = response.data.data[0]
        setProd(data.productName)
        setDesc(data.description)
        setPrc(data.price)
        setStc(data.stock)
        setImageEdit(data.image)
        setIdCategoryBase(data.idCategory)
      })
      .catch(err => {
        console.log(err)
      })

    Axios.get(`${apiUrl}/all-category`)
      .then(response => {
        const data = response.data.data
        setCategories(data)
      })
      .catch(err => {
        console.log(err)
      })



  }, [])

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
          <Input defaultValue={title === "Edit" ? prod : ""} ref={productName} marginBottom="15px" type="text" minLength={6} />

          <Text marginBottom="15px">Description</Text>
          <Textarea defaultValue={title === "Edit" ? desc : ""} height={"200px"} ref={description} marginBottom="25px" type="text" />

          <Text marginBottom="15px">Price</Text>
          <Input defaultValue={title === "Edit" ? prc : ""} ref={price} marginBottom="15px" type="number" />

          <Text marginBottom="15px">Stock</Text>
          <Input defaultValue={title === "Edit" ? stc : ""} ref={stock} marginBottom="25px" type="number" />

          <Text marginBottom="15px">Category</Text>
          <Select defaultValue={0} marginBottom="15px" placeholder={title === "Edit" ? "ok" : 'Select option'} onChange={onChangeCategory}>
            {
              categories.map(category => {
                return (
                  <option
                    value={category.id}
                    selected=
                    {
                      idCategoryBase === category.id ? true : false
                    }>
                    {category.categoryName}
                  </option>
                )
              })
            }
          </Select>

          {title === "Edit" ?
            <>
              <Text marginBottom="15px">Product Image</Text>
              <Image objectFit={"cover"} boxSize={"100px"} mb={2}
                src={imageEdit}
                alt='Product Image'
                borderRadius={8} />
              <Box>
                <Input
                  onChange={imageHandler}
                  marginBottom="25px"
                  type="file"
                  accept="image/*" w={"50%"} />
                <Button ml={2} disabled={loading} onClick={onUploadPicture}>Upload picture</Button>
              </Box>
            </>
            :
            null
          }

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