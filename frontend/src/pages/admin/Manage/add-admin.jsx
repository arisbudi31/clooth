import React, { useState } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import { LOADING_END, LOADING_START } from "../../../redux/actions/types";
import {
  Box,
  Text,
  Input,
  Button,
  Flex,
  useToast
} from '@chakra-ui/react'
import Header from '../../../component/Header'
import Loading from '../../../component/subcomponent/Loading'


export default function AddAdmin() {
  const API_URL = process.env.REACT_APP_API_URL
  const role = localStorage.getItem("akses")
  const token = localStorage.getItem('tokenAdmin')
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { loading } = useSelector(state => state.loading)
  const toast = useToast()
  const keepLogin = localStorage.getItem("keepLogin")

  const [values, setValues] = useState({
    adminname: '',
    email: '',
    password: '',
    repassword: '',
    showPassword: false
  });


  // if (role !== 'BearerAdmin' || role === null) {
  //   return (navigate('/user/login'))
  // }

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClick = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const onButtonSubmit = async () => {
    const bodyOnAddAdmin = {
      adminname: values.adminname,
      email: values.email,
      password: values.password,
      repassword: values.repassword
    }

    dispatch({ type: LOADING_START })
    await Axios.post(API_URL + `/api/admin/${token}/add-admin`, bodyOnAddAdmin)
      .then((resp) => {
        dispatch({ type: LOADING_END })
        console.log(`respond when register admin:`, resp);
        toast({
          title: "Login Success",
          description: "Login Success",
          status: 'success',
          duration: 3000,
          isClosable: true,
        })

        navigate('/admin')
      })
      .catch((err) => {
        dispatch({ type: LOADING_END })
        console.log(`error when register admin:`, err);
        if (err) {
          return toast({
            title: `Error`,
            description: err.response.data,
            status: 'error',
            duration: 5000,
            isClosable: true,
          })
        }
      })
  };

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
      <Box ml={"200px"} display={"flex"} justifyContent={"center"} mt={"100px"}>
        <Box height={"100%"} width={"30%"} position={"static"} ml="-25px">
          <Box
            m="20px 0px 10px 0px"
            display='flex'
            flexDirection={"column"}
            alignItems={"center"}
            border={"2px solid darkblue"}
            borderRadius="10px"
          >
            <Text
              m="10px 0px 15px 0px"
              fontSize={"30px"}
              fontFamily={"sans-serif"}
              fontWeight={"bold"}
              textColor={"yellow.500"}
            >ADD NEW ADMIN</Text>
            <Box p="10px">
              <Input
                label="Adminname"
                type="text"
                mb="10px"
                border={"1.5px solid"}
                borderColor="blackAlpha.400"
                placeholder="Adminname"
                onChange={handleChange('adminname')}
              />
              <Input
                label="Email"
                type="email"
                mb="10px"
                border={"1.5px solid"}
                borderColor="blackAlpha.400"
                placeholder="Input active email only"
                onChange={handleChange('email')}
              />
              <Input
                pr='4.5rem'
                type={values.showPassword ? 'text' : 'password'}
                placeholder='Password'
                mb="10px"
                border={"1.5px solid"}
                borderColor="blackAlpha.400"
                onChange={handleChange('password')}
              />
              <Input
                pr='4.5rem'
                type={values.showPassword ? 'text' : 'password'}
                placeholder='Password Confirmation'
                mb="10px"
                border={"1.5px solid"}
                borderColor="blackAlpha.400"
                onChange={handleChange('repassword')}
              />
              <Flex justifyContent={"right"} width="105%">
                <Button h='1.75rem' size={"md"} onClick={handleClick} variant="text">
                  {values.showPassword ? 'Hide Password' : 'Show Password'}
                </Button>
              </Flex>
              <Button
                mt="20px"
                onClick={onButtonSubmit}
                width="100%"
                color={"white"}
                bgColor={"blue.600"}
                colorScheme={"facebook"}
              >Submit
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  )
}