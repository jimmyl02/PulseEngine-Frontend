import React, { useState, useEffect } from 'react';
import { useHistory, useParams, Redirect } from 'react-router-dom';
import { Flex, Box, Text, Spinner, Heading, List, ListItem, ListIcon, Link, Icon } from '@chakra-ui/core';

import Navbar from '../../components/Navbar';

import { API_URL } from '../../config';

const Home = () => {
    const history = useHistory();
    const { compId } = useParams();

    const [loading, setLoading] = useState(0);
    const [scores, setScores] = useState({});
    const [competitionName, setCompetitionName] = useState('');
    const [apikey, setApikey] = useState('');

    const fetchInfo = async () => {
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
            if(parsedInfoRequest.scoreRequest === 'success'){
                const infoData = parsedInfoRequest.body;
                setCompetitionName(infoData.name);
            }else{
                history.push('/home');
            }
        }

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
                    <Text fontSize='home.header' color='white'>
                        {competitionName}
                    </Text>
                    <Flex w='100%' mt='1em' mx='-1em' justify='center' flexWrap='wrap'>

                    </Flex>
                </Box>
            </Box>
        );
    }
};

export default Home;