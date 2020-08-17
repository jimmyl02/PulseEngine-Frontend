import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Formik, Field } from 'formik';
import { Flex, Box, Text, Button, FormControl, FormLabel, FormErrorMessage, Input, useToast } from '@chakra-ui/core';

import { API_URL } from '../../config';

const Create = () => {
    const history = useHistory();
    const toast = useToast();
    
    const [requestInvalid, setRequestInvalid] = useState(false);

    const handleSubmit = async (values, actions) => {
        const loginRequest = await fetch(API_URL + '/api/competitions/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('authToken')
            },
            body: JSON.stringify({ name: values.name })
        });
        const parsedLoginRequest = await loginRequest.json();
        if(parsedLoginRequest.status && parsedLoginRequest.status === 'success'){
            toast({
                position: 'top-right',
                title: 'Competition created',
                description: 'Your competition was successfully created.',
                status: 'success',
                duration: '3000',
                isClosable: true
            });
            history.push('/owned');
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

    return (
        <Box position='fixed' h='100%' w='100%' bg='gray.800'>
            <Flex position='fixed' h='100%' w='100%' align='center' justify='center'>
                <Box rounded='lg' bg='blue.800' ml='7em'>
                    <Box mx='2em' mb='1em' color='white'>
                        <Text textAlign='center' mt='0.5em' fontSize='form.header'>
                            Create a competition
                        </Text>
                        <Formik
                            initialValues={{ name: '' }}
                            onSubmit={handleSubmit}
                            >
                            {props => (
                                <form onSubmit={props.handleSubmit}>
                                <FormControl isInvalid={requestInvalid}>
                                    <FormErrorMessage mb='0.5em'>Something went wrong, please try again</FormErrorMessage>
                                </FormControl>
                                <Field name='name' validate={validateNonNull}>
                                    {({ field, form }) => (
                                    <FormControl isInvalid={form.errors.name && form.touched.name}>
                                        <FormLabel htmlFor='name'>Name</FormLabel>
                                        <Input {...field} id='name' placeholder='name' color='black' />
                                        <FormErrorMessage>{form.errors.name}</FormErrorMessage>
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
                    </Box>
                </Box>
            </Flex>
        </Box>
    );
};

export default Create;