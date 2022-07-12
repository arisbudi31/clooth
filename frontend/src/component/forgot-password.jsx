import React, { useRef } from "react";
import axios from "axios";
import {
  Flex,
  Box,
  Text,
  Button,
  Input,
  CloseButton,
  useToast
} from "@chakra-ui/react";

const API_URL = process.env.REACT_APP_API_URL

export default function ForgotPassword({onButtonClose}) {
    const toast = useToast()
    const forgotPassword = useRef('')

    const onForgotButton = async() => {
        const bodyOnReset = {
          email: forgotPassword.current.value
        }
        console.log(`body:`, bodyOnReset);
  
        await axios.post('http://localhost:2000/api/admin/forgot-password', bodyOnReset)
        .then((resp) => {
          console.log(`respond after req:`, resp);
          toast({
            title: "Request Success",
            description: resp.data,
            status: 'success',
            duration: 5000,
            isClosable: true,
          })
  
          onButtonClose()          
        })
        .catch ((err) => {
          console.log(`error after req:`, err);
          if(err){
            return toast({
              title: `Error`,
              description: err.response.data, 
              status: 'error',
              duration: 3000,
              isClosable: true
            })
          }
        })
    }
    
    return(
        <Box
          color="blue.800"
        >
          <Flex justifyContent={"space-between"}>
            <Text fontWeight={"bold"}>We'll send you email to reset your password</Text>
            <CloseButton 
              color="white" 
              bgColor={"red"} 
              onClick={onButtonClose}
              size="sm" 
            />
          </Flex>
          <Input
                placeholder="Input your account email "
                m="20px 0px 0px 0px"
                w="100%"
                type="email"
                border={"1.5px solid"}
                borderColor="blackAlpha.400"
                ref={forgotPassword}
            />
                <Text textAlign={"center"}>
                <Button
                    mt="8px"
                    onClick={onForgotButton}
                    colorScheme={"facebook"}
                    bgColor="blue.600"
                    border="2px"
                    color="white"
                    size={"sm"}
                    width="100%"
                    >
                    Send
                </Button>
                </Text>
        </Box>
    )
}