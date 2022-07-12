import React, {useRef} from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    Flex,
    Box,
    Text,
    Button,
    Input,
    FormLabel,
    FormHelperText,
    FormControl,
    Spinner,
    useToast
  } from "@chakra-ui/react";
  import {FiSend} from 'react-icons/fi'
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL
export default function ResetPassword () {
    const [show, setShow] = useState(false)
    const [sending, setSending] = useState(false)
    const showPassword = () => setShow(!show)
    const navigate = useNavigate()
    // const dispatch = useDispatch()
    const toast = useToast()
    const passwordOnReset = useRef('')
    const repasswordOnReset = useRef('')
    const pathname = window.location.pathname;
    const adminname = pathname.split('/reset/')[1]
    const emailAdmin = pathname.split('/reset/')[2]
    console.log(`userId:`, adminname);

    const onResetButton = async() => {
        setSending(true)
        const bodyOnReset = {
            email: emailAdmin,
            password: passwordOnReset.current.value,
            repassword: repasswordOnReset.current.value
        }

        await axios.patch(`http://localhost:5000/api/admin/reset-password/${adminname}`, bodyOnReset)
        .then((resp) => {
            setSending(false)
            console.log(`resp:`, resp);
            toast({
                title: "Request Success",
                description: resp.data,
                status: 'success',
                duration: 5000,
                isClosable: true,
            })
            setTimeout(() => navigate('/admin/login'), 3000)
        })
        .catch((err) => {
            console.log(`error:`, err);
            setSending(false)
            if(err){
                return toast({
                    title: `Error`,
                    description: err.response.data, 
                    status: 'error',
                    duration: 3000,
                    isClosable: true,
                })
            }
        })

    }
    return (
        <Flex bgColor={"#f1f2f6"} fontFamily="Ubuntu" mt="-55px">
            <Box w="90vw" h="100vh" p="5% 25%" >
                <Box
                    border={"4px solid #1e3799"}
                    borderRadius="10"
                    h="80vh"
                    w="100%"
                    position={"static"}
                    alignContent="center"
                >
                <Text
                    textAlign={"center"}
                    m="3% 5% 0% 5%"
                    borderBottom={"1px solid black"}
                    w="90%"
                    fontFamily={"Ubuntu"}
                    fontSize="30px"
                    fontWeight={"extrabold"}
                >
                    RESET PASSWORD
                </Text>
                <FormControl p="2% 10%">
                    <Box>
                        <FormLabel >Email</FormLabel>
                            <Text
                                w="32vw"                                type="text"
                                border={"2px solid"}
                                borderRadius="5"
                                p="1% 2.5%"
                                borderColor="blue.700"
                                color="gray.500"
                                disabled="true"
                            >veronica.admgroup03@yahoo.com</Text>
                    </Box>
                    <Box mt="7%">
                    <FormLabel>Password</FormLabel>
                        <Input
                            placeholder="Input your Password here"
                            pr="30px"
                            w="32vw"
                            type={show? "text" : "password"}
                            border={"2px solid"}
                            borderColor="blue.700"
                            ref={passwordOnReset}
                        />
                        <Flex justifyContent={"space-between"} mb="15px" w="100%">
                            <FormHelperText fontSize={"13px"} color={"blackAlpha.700"} mt="0px">
                                *Password must contain alphanumeric and symbol.
                            </FormHelperText>
                        </Flex>        
                    </Box>
                    <Box mt="7%">
                        <FormLabel >Password Confirmation</FormLabel>
                            <Input
                                placeholder="Input your Password Confirmation here"
                                pr="30px"
                                w="32vw"
                                type={show? "text" : "password"}
                                border={"2px solid"}
                                borderColor="blue.700"
                                ref={repasswordOnReset}
                            />
                            <Flex justifyContent={"space-between"} mb="15px" w="32vw">
                                <FormHelperText fontSize={"13px"} color={"blackAlpha.700"} mt="0px">
                                    *Password Confirmation must equal to Password.
                                </FormHelperText>
                                    <Button onClick={showPassword} variant="link" fontSize={"13px"} colorScheme={"orange"}>
                                        {show ? "Hide Password" : "Show Password"}
                                    </Button>
                            </Flex>        
                    </Box>
                </FormControl>
                <Text textAlign={"center"}>
                        <Button
                        onClick={onResetButton}
                        variant={"outline"}
                        colorScheme="blue"
                        border="2px"
                        leftIcon={sending? 
                            <Spinner 
                                thickness='2px'
                                speed='1s'
                                emptyColor='blue.300'
                                color='blue.800'
                                size='sm'/> 
                            : <FiSend />}
                        disabled={sending}
                        >
                        {sending? "loading..." : "Send"} 
                        </Button>
                    </Text>
                </Box>
            </Box>
        </Flex>
    )
}
