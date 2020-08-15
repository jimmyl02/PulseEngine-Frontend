import React, { useState, useEffect } from 'react';
import { useHistory, Link as ReactRouterLink } from 'react-router-dom';
import { Flex, Box, Text, Spinner, Heading, List, ListItem, ListIcon, Link, Icon } from '@chakra-ui/core';

import Navbar from '../../components/Navbar';
import CompetitionCard from '../../components/CompetitionCard';

import { API_URL } from '../../config';

const Owned = () => {
    const history = useHistory();

    const [ownedCompetitions, setOwnedCompetitions] = useState([]);

    const fetchProfile = async () => {
        const profileRequest = await fetch(API_URL + '/api/users/profile', {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('authToken')
            }
        });
        const parsedProfileRequest = await profileRequest.json();
        if(parsedProfileRequest.status === 'success'){
            const profileData = parsedProfileRequest.data;
            setOwnedCompetitions(profileData.ownedCompetitions);
        }else{
            history.push('/login');
        }
    }

    useEffect(() => {
        fetchProfile();
    }, []);

    return (
        <Box position='fixed' h='100%' w='100%' bg='gray.800'>
            <Navbar textColor='white' />
            <Box px='4em' py='3em' bg='teal' w='100%'>
                <Text fontSize='home.header' color='white'>
                    Competitions you own
                </Text>
                <Flex w='100%' mt='1em' justify='center'd='column'>
                    {ownedCompetitions.map(competitionUUID => {
                        return <CompetitionCard key={competitionUUID} uuid={competitionUUID} />
                    })}
                </Flex>
            </Box>
        </Box>
    );
};

export default Owned;