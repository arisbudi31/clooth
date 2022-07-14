import * as React from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux"
import { LOADING_END, LOADING_START } from "../../redux/actions/types";


import {
  Box,
  Text,
  Input,
  ScaleFade,
  Avatar,
  Button,
  useToast,
  Checkbox,
  InputGroup,
  Heading,
  InputRightElement
} from '@chakra-ui/react'

//assets
import bgLogin from '../../assets/images/bgLogin.jpg'
import logo from '../../assets/images/clooth-logo.png'

//components
import ForgotPassword from "../../component/forgot-password";

const API_URL = process.env.REACT_API_URL

export default function Login() {
  const [forgotOpen, setForgotOpen] = React.useState(false);
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const toast = useToast()

  const [values, setValues] = React.useState({
    password: '',
    email: '',
    showPassword: false
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClick = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const keep = document.getElementsByName("keep")

  const onButtonSignIn = async () => {
    const bodyOnSignIn = {
      adminname: values.email,
      password: values.password
    }
    console.log(`body:`, bodyOnSignIn)
    console.log(`api url:`, API_URL);

    dispatch({ type: LOADING_START })
    await Axios.post('http://localhost:5000/api/admin/login', bodyOnSignIn)
      .then((resp) => {
        const arr = resp.headers["authtoken"].split(" ")
        const token = arr[1]
        localStorage.setItem("tokenAdmin", token)
        if (!keep[0].checked) {
          localStorage.setItem("keepLogin", 'false')
        } else {
          localStorage.setItem("keepLogin", 'true')
        }

        dispatch({ type: LOADING_END })
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
        console.log(`error login:`, err);
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

  const onForgotButton = () => {
    setForgotOpen(true)
  }

  const forgotCloseButton = () => {
    setForgotOpen(false)
  }

  return (
    <Box display={"flex"} mt="-8">
      <Box height={"100vh"} width={"74%"} ml="-40px">
        <img src={bgLogin} alt={"background"} />
      </Box>
      <Box height={"100%"} width={"30%"} position={"static"} ml="-25px">
        <Box display={"flex"} alignItems={"center"} >
          <Avatar width="100px" height="100px" src={logo}></Avatar>
          <Heading fontSize={"60px"} fontFamily="initial" >CLOOTH</Heading>
        </Box>
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
          >ADMIN LOG IN</Text>
          <Box p="10px">
            <Input
              label="Email"
              type="email"
              mb="10px"
              border={"1.5px solid"}
              borderColor="blackAlpha.400"
              placeholder="Username or email"
              onChange={handleChange('email')}
            />
            <InputGroup size='md'>
              <Input
                pr='4.5rem'
                type={values.showPassword ? 'text' : 'password'}
                placeholder='Password'
                mb="10px"
                border={"1.5px solid"}
                borderColor="blackAlpha.400"
                onChange={handleChange('password')}

              />
              <InputRightElement width='4.5rem'>
                <Button h='1.75rem' size='sm' onClick={handleClick} variant="text">
                  {values.showPassword ? 'Hide' : 'Show'}
                </Button>
              </InputRightElement>
            </InputGroup>
            <Checkbox type={"checkbox"} size='md' colorScheme={"facebook"} w="100%" name="keep">
              Keep me Log In
            </Checkbox>
            <Button
              mt="20px"
              onClick={onButtonSignIn}
              width="100%"
              color={"white"}
              bgColor={"blue.600"}
              colorScheme={"facebook"}
            >Log In
            </Button>
            <Button onClick={onForgotButton} variant="link" color={"blue.600"}>
              Forgot password?
            </Button>
          </Box>
        </Box>
        <ScaleFade direction="right" in={forgotOpen} >
          <Box
            height={"140px"}
            padding={"5px"}
            width="100%"
            border={"2px solid darkblue"}
            borderRadius="10px"
            paddingBottom={"5px"}
            bgColor={"white"}
            boxSizing="border-box"
          >
            <ForgotPassword onButtonClose={() => forgotCloseButton()} />
          </Box>
        </ScaleFade>
      </Box>
    </Box>

  )
}