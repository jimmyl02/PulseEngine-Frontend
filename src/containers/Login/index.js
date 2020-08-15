import React, { useState } from 'react';
import { useHistory, Link as ReactRouterLink, Redirect } from 'react-router-dom';
import { Formik, Field } from 'formik';
import { Flex, Box, Text, Button, FormControl, FormLabel, FormErrorMessage, Input, InputGroup, InputRightElement, Link } from '@chakra-ui/core';

import { API_URL } from '../../config';

const Login = () => {
    const history = useHistory();

    const [show, setShow] = useState(false);
    const [requestInvalid, setRequestInvalid] = useState(false);

    if(localStorage.getItem('authToken')){
        return (
            <Redirect to='/home'/>
        );
    }

    const handleSubmit = async (values, actions) => {
        const loginRequest = await fetch(API_URL + '/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({username: values.username, password: values.password})
        });
        const parsedLoginRequest = await loginRequest.json();
        if(parsedLoginRequest.status && parsedLoginRequest.status === 'success'){
            const authJwt = parsedLoginRequest.data;
            localStorage.setItem('authToken', authJwt);
            history.push('/home');
        }else{
            setRequestInvalid(true);
            actions.setSubmitting(false);
        }
    };

    return (
        <Box position='fixed' h='100%' w='100%' bg='gray.800'>
            <Flex position='fixed' h='100%' w='100%' align='center' justify='center'>
                <Box rounded='lg' bg='blue.800' ml='7em'>
                    <Box mx='2em' mb='1em' color='white'>
                        <Text textAlign='center' mt='0.5em' fontSize='form.header'>
                            Login
                        </Text>
                        <Formik
                            initialValues={{ username: '', password: '' }}
                            onSubmit={handleSubmit}
                            >
                            {props => (
                                <form onSubmit={props.handleSubmit}>
                                <FormControl isInvalid={requestInvalid}>
                                    <FormErrorMessage mb='0.5em'>Username / Password combination was incorrect</FormErrorMessage>
                                </FormControl>
                                <Field name="username">
                                    {({ field, form }) => (
                                    <FormControl isInvalid={form.errors.username && form.touched.username}>
                                        <FormLabel htmlFor='username'>Username</FormLabel>
                                        <Input {...field} id='username' placeholder='username' color='black' />
                                        <FormErrorMessage>{form.errors.username}</FormErrorMessage>
                                    </FormControl>
                                    )}
                                </Field>
                                <Field name='password'>
                                    {({ field, form }) => (
                                    <FormControl isInvalid={form.errors.password && form.touched.password}>
                                        <FormLabel htmlFor='password'>Password</FormLabel>
                                        <InputGroup size='md'>
                                            <Input {...field} id='password' type={show ? 'text' : 'password'} placeholder='password' color='black' />
                                            <InputRightElement width="4.5rem">
                                                <Button h="1.75rem" size="sm" color='black' onClick={() => setShow(!show)}>
                                                    {show ? "Hide" : "Show"}
                                                </Button>
                                            </InputRightElement>
                                        </InputGroup>
                                        <FormErrorMessage>{form.errors.password}</FormErrorMessage>
                                    </FormControl>
                                    )}
                                </Field>
                                <Flex justify='center'>
                                    <Button mt={4} variantColor="blue" isLoading={props.isSubmitting} type="submit">
                                        Submit
                                    </Button>
                                </Flex>
                                </form>
                            )}
                        </Formik>
                        <Flex justify='center'>
                            <Link as={ReactRouterLink} to='/register' mt='0.25em'>
                                Don't have an account? Register here
                            </Link>
                        </Flex>
                    </Box>
                </Box>
            </Flex>
        </Box>
    );
};

export default Login;