import { Box, Flex, Heading, Link, Text, useToast } from '@chakra-ui/react';
import { CloseIcon, CheckCircleIcon } from '@chakra-ui/icons';
import Axios from 'axios';
import * as React from 'react'
import { useNavigate } from 'react-router';
import { useState } from 'react'

const API_URL = process.env.REACT_APP_API_URL

export default function Verification() {
  const navigate = useNavigate()
  const toast = useToast()
  const isVerified = false
  const [values] = React.useState({
    email: ''
  })

  const onLinkVerification = async () => {
    const bodyOnVerification = {
      email: values.email
    };
    console.log(`body:`, bodyOnVerification)
    console.log(`api url:`, API_URL)

    await Axios.get(API_URL + '/users', bodyOnVerification)
    .then((resp) => {
      console.log(resp.data)
      const email = resp.data

      toast({
        title: "Get user Success",
        description: "Get user Success",
        status: 'success',
        duration: 3000,
        isClosable: true
      })
      .catch((err) => {
        console.log(`error verification:`, err);
        if (err) {
          return toast({
            title: `Error`,
            description: err.response.data.data,
            status: 'error',
            duration: 5000,
            isClosable: true,
          })
        }
      })
    })

    await Axios.post(API_URL + '/verification', bodyOnVerification)
      .then((resp) => {
        console.log(resp)
        const token = resp.data.token
        localStorage.setItem("token", token)

        toast({
          title: "Email has been sent",
          description: "Email Success",
          status: 'success',
          duration: 3000,
          isClosable: true
        })
        console.log(`isVerified:`, resp.data.is_verified)
        if (resp.data.is_verified == "verified") {
          isVerified = true
        } else {
          return isVerified
        }
        navigate(`/`)
      })
      .catch((err) => {
        console.log(`error verification:`, err);
        if (err) {
          return toast({
            title: `Error`,
            description: err.response.data.data,
            status: 'error',
            duration: 5000,
            isClosable: true,
          })
        }
      })
  }

  return (
    <Box
      height='100vh'
      width='auto'
      display='flex'
      flexDirection='column'
      alignItems='center'
      justifyContent='center'
      textAlign="center" py={10} px={6}>
      <Box display="inline-block">
        {isVerified ?
          <CheckCircleIcon boxSize={'50px'} color={'green.500'} />
          :
          <Flex
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            bg={'red.500'}
            rounded={'50px'}
            w={'55px'}
            h={'55px'}
            textAlign="center">
            <CloseIcon boxSize={'20px'} color={'white'} />
          </Flex>
        }

      </Box>
      {isVerified ?
        <Flex
          flexDirection='column'
        >
          <Heading as="h2" size="xl" mt={6} mb={2}>
            Your email is verified!
          </Heading>
          <Link href='/'>
            <Text as='u' fontSize='xl' color={'blue.500'}>
              Click here to back to home page!
            </Text>
          </Link>
        </Flex>
        :
        <Flex
          flexDirection='column'
        >
          <Heading as="h2" size="xl" mt={6} mb={2}>
            Please verify your email
          </Heading>
          <Link onClick={onLinkVerification} >
            <Text as='u' fontSize='xl' color={'blue.500'}>
              Click here to resend your verification email !
            </Text>
          </Link>
        </Flex>
      }
    </Box>
  );
}