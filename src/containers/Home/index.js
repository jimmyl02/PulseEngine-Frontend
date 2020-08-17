import React, { useState, useEffect } from 'react';
import { useHistory, Link as ReactRouterLink } from 'react-router-dom';
import { Flex, Box, Text, Spinner, Heading, List, ListItem, ListIcon, Link, Icon } from '@chakra-ui/core';

import Navbar from '../../components/Navbar';

import { API_URL } from '../../config';

const Home = () => {
    const history = useHistory();

    const [loading, setLoading] = useState(true);
    const [fname, setFname] = useState('');
    const [ownedCompetitions, setOwnedCompetitions] = useState([]);
    const [participatingCompetitions, setParticipatingCompetitions] = useState([]);

    const fetchProfile = async () => {
        const profileRequest = await fetch(API_URL + '/api/users/profile',{
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('authToken')
            }
        });
        const parsedProfileRequest = await profileRequest.json();
        if(parsedProfileRequest.status === 'success'){
            const profileData = parsedProfileRequest.data;
            setFname(profileData.fname);
            setOwnedCompetitions(profileData.ownedCompetitions);
            setParticipatingCompetitions(profileData.competitions);
            setLoading(false);
        }else{
            history.push('/login');
        }
    }

    useEffect(() => {
        fetchProfile();
    }, []);

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
                        Welcome {fname}
                    </Text>
                    <Flex w='100%' mt='1em' mx='-1em' justify='center' flexWrap='wrap'>
                        <Box flex={1} p='1.5em' m='0.5em' shadow='md' borderWidth='1px' rounded='lg' color='white'>
                            <Heading fontSize='card.header'>
                                Getting Started
                            </Heading>
                            <Box mt='4px' fontSize='card.text'>
                                <List spacing={4}>
                                    <ListItem>
                                        This website is used to view the scores from the scoring engine, it does not do the actual scoring. In order to install the scoring system, please view and install the scoring engine from <Link href='https://github.com/jimmyl02/cyberCCDCScoring'>my github here<Icon name="external-link" mx="2px" /></Link>
                                    </ListItem>
                                    <ListItem>
                                        What you can do with this website
                                    </ListItem>
                                    <ListItem>
                                        <ListIcon icon="chevron-right" color="darkPop" />
                                        <Link as={ReactRouterLink} to='/participating'>
                                            View contests you are participating in
                                        </Link>
                                    </ListItem>
                                    <ListItem>
                                        <ListIcon icon="chevron-right" color="darkPop" />
                                        <Link as={ReactRouterLink} to='/owned'>
                                            View contests you own
                                        </Link>
                                    </ListItem>
                                    <ListItem>
                                        <ListIcon icon="chevron-right" color="darkPop" />
                                        <Link as={ReactRouterLink} to='/create'>
                                            Create your own contest
                                        </Link>
                                    </ListItem>
                                </List>
                            </Box>
                        </Box>
                        <Box flex={1} p='1.5em' m='0.5em' shadow='md' borderWidth='1px' rounded='lg' color='white'>
                            <Heading fontSize='card.header'>
                                Your Competitions
                            </Heading>
                            <Box mt='4px'>
                                <Text fontSize='card.text'>
                                    Owned Competitions: {ownedCompetitions.length}
                                </Text>
                                <Text fontSize='card.text'>
                                    Participating Competitions: {participatingCompetitions.length}
                                </Text>
                            </Box>
                        </Box>
                    </Flex>
                </Box>
            </Box>
        );
    }
};

export default Home;