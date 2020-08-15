import React, { useState } from 'react';
import { useHistory, Link as ReactRouterLink } from 'react-router-dom';
import { Formik, Field } from 'formik';
import { Flex, Box, Text, Button, FormControl, FormLabel, FormErrorMessage, Input, Link, Stack } from '@chakra-ui/core';

import { API_URL } from '../../config';

const Register = () => {
    const history = useHistory();

    const [requestInvalid, setRequestInvalid] = useState(false);

    const handleSubmit = async (values, actions) => {
        const loginRequest = await fetch(API_URL + '/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({fname: values.fname, lname: values.lname, email: values.email, username: values.username, password: values.password, passwordConfirm: values.passwordConfirm})
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

    const validateNonNull = (value) => {
        let error;
        if(!value){
            error = 'This field is required';
        }
        return error;
    };
    
    const validateEmail = (value) => {
        let error;
        if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)){
            error = 'Invalid email address!';
        }
        return error;
    };

    const validatePasswordConfirm = (value) => {
        let error;
        const password = document.getElementById('password').value;
        if(password && value){
            if(password !== value){
                error = 'Passwords do not match!';
            }
        }
        return error;
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
                            initialValues={{ fname: '', lname: '', email: '', username: '', password: '', passwordConfirm: '' }}
                            onSubmit={handleSubmit}
                            >
                            {props => (
                                <form onSubmit={props.handleSubmit}>
                                <FormControl isInvalid={requestInvalid}>
                                    <FormErrorMessage mb='0.5em'>Something went wrong, please try again</FormErrorMessage>
                                </FormControl>
                                <Stack isInline spacing={4}>
                                    <Box>
                                        <Field name='fname' validate={validateNonNull}>
                                            {({ field, form }) => (
                                            <FormControl isInvalid={form.errors.fname && form.touched.fname}>
                                                <FormLabel htmlFor='fname'>First Name</FormLabel>
                                                <Input {...field} id='fname' placeholder='first name' color='black' />
                                                <FormErrorMessage>{form.errors.fname}</FormErrorMessage>
                                            </FormControl>
                                            )}
                                        </Field>
                                    </Box>
                                    <Box>
                                        <Field name='lname' validate={validateNonNull}>
                                            {({ field, form }) => (
                                            <FormControl isInvalid={form.errors.lname && form.touched.lname}>
                                                <FormLabel htmlFor='lname'>Last Name</FormLabel>
                                                <Input {...field} id='lname' placeholder='last name' color='black' />
                                                <FormErrorMessage>{form.errors.lname}</FormErrorMessage>
                                            </FormControl>
                                            )}
                                        </Field>
                                    </Box>
                                </Stack>
                                <Field name='email' validate={validateEmail}>
                                    {({ field, form }) => (
                                    <FormControl isInvalid={form.errors.email && form.touched.email}>
                                        <FormLabel htmlFor='email'>Email</FormLabel>
                                        <Input {...field} id='email' placeholder='email' color='black' />
                                        <FormErrorMessage>{form.errors.email}</FormErrorMessage>
                                    </FormControl>
                                    )}
                                </Field>
                                <Field name='username' validate={validateNonNull}>
                                    {({ field, form }) => (
                                    <FormControl isInvalid={form.errors.username && form.touched.username}>
                                        <FormLabel htmlFor='email'>Username</FormLabel>
                                        <Input {...field} id='username' placeholder='username' color='black' />
                                        <FormErrorMessage>{form.errors.username}</FormErrorMessage>
                                    </FormControl>
                                    )}
                                </Field>
                                <Field name='password' validate={validateNonNull}>
                                    {({ field, form }) => (
                                    <FormControl isInvalid={form.errors.password && form.touched.password}>
                                        <FormLabel htmlFor='password'>Password</FormLabel>
                                        <Input {...field} id='password' type='password' placeholder='password' color='black' />
                                        <FormErrorMessage>{form.errors.password}</FormErrorMessage>
                                    </FormControl>
                                    )}
                                </Field>
                                <Field name='passwordConfirm' validate={validatePasswordConfirm}>
                                    {({ field, form }) => (
                                    <FormControl isInvalid={form.errors.passwordConfirm && form.touched.passwordConfirm}>
                                        <FormLabel htmlFor='passwordConfirm'>Confirm Password</FormLabel>
                                        <Input {...field} id='passwordConfirm' type='password' placeholder='confirm password' color='black' />
                                        <FormErrorMessage>{form.errors.passwordConfirm}</FormErrorMessage>
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
                            <Link as={ReactRouterLink} to='/login' mt='0.25em'>
                                Already have an account? Login here
                            </Link>
                        </Flex>
                    </Box>
                </Box>
            </Flex>
        </Box>
    );
};

export default Register;