import React, { useState, useEffect } from 'react';
import { useHistory, useParams, Redirect } from 'react-router-dom';
import { Formik, Field } from 'formik';
import { Flex, Box, Text, Spinner, Button, Code, FormControl, FormLabel, FormErrorMessage, Input, useToast, Tabs, Tab, TabList, TabPanels, TabPanel} from '@chakra-ui/core';

import Navbar from '../../components/Navbar';
import SimpleModal from '../../components/SimpleModal';
import { fetchInfo, generateHandleAddUserSubmit } from './api';
import ScoreStatus from './scoreStatus';
import ScoreTotal from './scoreTotal';

const Home = () => {
    const history = useHistory();
    const { compId } = useParams();
    const toast = useToast();

    const [loading, setLoading] = useState(0);
    const [competitionName, setCompetitionName] = useState('');
    const [apikey, setApikey] = useState('');
    const [scores, setScores] = useState(undefined);
    const [competitionModalOpen, setCompetitionModalOpen] = useState(false);
    const [apikeyModalOpen, setApikeyModalOpen] = useState(false);

    useEffect(() => {
        fetchInfo(history, compId, setCompetitionName, setApikey, setScores, setLoading);
    }, [history, compId]);

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
                            onSubmit={generateHandleAddUserSubmit(toast, compId)}
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
                        <Tabs>
                            <TabList>
                                <Tab>Current Status</Tab>
                                <Tab>Current Scores</Tab>
                            </TabList>
                            <TabPanels mt='1em'>
                                <TabPanel>
                                    <ScoreStatus scores={scores} />
                                </TabPanel>
                                <TabPanel>
                                    <ScoreTotal scores={scores} />
                                </TabPanel>
                            </TabPanels>
                        </Tabs>
                    </Flex>
                </Box>
            </Box>
        );
    }
};

export default Home;