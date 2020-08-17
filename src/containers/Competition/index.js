import React, { useState, useEffect } from 'react';
import { useHistory, useParams, Redirect } from 'react-router-dom';
import { Formik, Field } from 'formik';
import { Flex, Box, Text, Spinner, Button, Code, FormControl, FormLabel, FormErrorMessage, Input, useToast } from '@chakra-ui/core';

import Navbar from '../../components/Navbar';
import SimpleModal from '../../components/SimpleModal';

import { API_URL } from '../../config';

const Home = () => {
    const history = useHistory();
    const { compId } = useParams();
    const toast = useToast();

    const [loading, setLoading] = useState(0);
    const [scores, setScores] = useState({});
    const [competitionName, setCompetitionName] = useState('');
    const [apikey, setApikey] = useState('');
    const [competitionModalOpen, setCompetitionModalOpen] = useState(false);
    const [apikeyModalOpen, setApikeyModalOpen] = useState(false);

    const fetchInfo = async () => {
        // initial info request asks for the admin route
        const adminInfoRequest = await fetch(API_URL + '/api/competitions/admininfo', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('authToken')
            },
            body: JSON.stringify({ compId: compId })
        });
        const parsedAdminInfoRequest = await adminInfoRequest.json();
        if(parsedAdminInfoRequest.status === 'success'){
            const adminInfoData = parsedAdminInfoRequest.data;
            setCompetitionName(adminInfoData.name);
            setApikey(adminInfoData.apikey);
        }else{
            // admin info route failed, look at regular info route
            const infoRequest = await fetch(API_URL + '/api/competitions/info', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('authToken')
                },
                body: JSON.stringify({ compId: compId })
            });
            const parsedInfoRequest = await infoRequest.json();
            if(parsedInfoRequest.status === 'success'){
                const infoData = parsedInfoRequest.data;
                setCompetitionName(infoData.name);
            }else{
                history.push('/home');
            }
        }

        // get the scores and set the scores state
        const scoreRequest = await fetch(API_URL + '/api/competitions/getscores', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('authToken')
            },
            body: JSON.stringify({ compId: compId })
        });
        const parsedScoreRequest = await scoreRequest.json();
        if(parsedScoreRequest.status === 'success'){
            setScores(parsedScoreRequest.data);
            setLoading(false);
        }else{
            history.push('/home');
        }
    }

    useEffect(() => {
        fetchInfo();
    }, []);

    // core logic for handling adding a user to a competition
    const handleAddUserSubmit = async (values, actions) => {
        const addUserRequest = await fetch(API_URL + '/api/competitions/adduser', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('authToken')
            },
            body: JSON.stringify({compId: compId, username: values.username})
        });
        const parsedAddUserRequest = await addUserRequest.json();
        if(parsedAddUserRequest.status){
            if(parsedAddUserRequest.status === 'success'){
                toast({
                    position: 'top-right',
                    title: 'User added to competition',
                    description: 'The user was successfully added to the competition.',
                    status: 'success',
                    duration: '3000',
                    isClosable: true
                });
                actions.setSubmitting(false);
            }else if(parsedAddUserRequest.data === 'username does not exist'){
                toast({
                    position: 'top-right',
                    title: 'Username not found',
                    description: 'The requested username was not found, please try again.',
                    status: 'error',
                    duration: '3000',
                    isClosable: true
                });
                actions.setSubmitting(false);
            }else if(parsedAddUserRequest.data === 'the user is already a part of the competition'){
                toast({
                    position: 'top-right',
                    title: 'Username is already a participant',
                    description: 'The requested user is already a participant.',
                    status: 'error',
                    duration: '3000',
                    isClosable: true
                });
                actions.setSubmitting(false);
            }else{
                toast({
                    position: 'top-right',
                    title: 'Something went wrong',
                    description: 'Something went wrong, please try again.',
                    status: 'error',
                    duration: '3000',
                    isClosable: true
                });
                actions.setSubmitting(false);
            }
        }else{
            toast({
                position: 'top-right',
                title: 'Something went wrong',
                description: 'Something went wrong, please try again.',
                status: 'error',
                duration: '3000',
                isClosable: true
            });
            actions.setSubmitting(false);
        }
    };

    // validation function used with formik
    const validateNonNull = (value) => {
        let error;
        if(!value){
            error = 'This field is required';
        }
        return error;
    };

    if(!compId){
        return (
            <Redirect to='/home'/>
        );
    }

    if(loading){
        return (
            <Box position='fixed' h='100%' w='100%' bg='gray.800'>
                <Navbar textColor='white' />
                <Flex position='fixed' h='100%' w='100%' align='center' justify='center'>
                    <Spinner size='xl' color='darkPop' />
                </Flex>
            </Box>
        );
    }else{
        return (
            <Box position='fixed' h='100%' w='100%' bg='gray.800' overflow='auto'>
                <Navbar textColor='white' />
                <Box px='4em' py='3em' bg='teal' w='100%'>
                    <Flex flexDirection='row' flexWrap='wrap' alignItems='center'>
                        <Text fontSize='home.header' color='white'>
                            {competitionName}
                        </Text>
                        {apikey && 
                            <Button ml='1em' variantColor='blue' onClick={() => setCompetitionModalOpen(true)}>
                                Add user to competition
                            </Button>
                        }
                        {apikey && 
                            <Button ml='1em' variantColor='blue' onClick={() => setApikeyModalOpen(true)}>
                                Display API key
                            </Button>
                        }
                    </Flex>
                    <SimpleModal open={competitionModalOpen} setOpen={setCompetitionModalOpen} header='Add a user to the competition'>
                    <Formik
                            initialValues={{ username: '' }}
                            onSubmit={handleAddUserSubmit}
                            >
                            {props => (
                                <form onSubmit={props.handleSubmit}>
                                <Field name='username' validate={validateNonNull}>
                                    {({ field, form }) => (
                                    <FormControl isInvalid={form.errors.username && form.touched.username}>
                                        <FormLabel htmlFor='username'>Username</FormLabel>
                                        <Input {...field} id='username' placeholder='username' color='black' />
                                        <FormErrorMessage>{form.errors.username}</FormErrorMessage>
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
                    </SimpleModal>
                    <SimpleModal open={apikeyModalOpen} setOpen={setApikeyModalOpen} header='API key'>
                        <Text color='black'>
                            Do not share this with anyone except competition administrators
                        </Text>
                        <Code variantColor='gray'>
                            {apikey}
                        </Code>
                    </SimpleModal>
                    <Flex w='100%' mt='1em' mx='-1em' justify='center' flexWrap='wrap' color='white'>
                        <Text>
                            Here is where the core logic of subcomponents will go, I think I need to use subcomponents, it's becoming too thick
                        </Text>
                    </Flex>
                </Box>
            </Box>
        );
    }
};

export default Home;