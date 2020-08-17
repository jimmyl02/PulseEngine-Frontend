import React, { useState, useEffect, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { Flex, Box, Text } from '@chakra-ui/core';

import Navbar from '../../components/Navbar';
import CompetitionCard from '../../components/CompetitionCard';

import { API_URL } from '../../config';

const Participating = () => {
    const history = useHistory();

    const [participatingCompetitions, setParticipatingCompetitions] = useState([]);

    const fetchProfile = useCallback(async () => {
        const profileRequest = await fetch(API_URL + '/api/users/profile', {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('authToken')
            }
        });
        const parsedProfileRequest = await profileRequest.json();
        if(parsedProfileRequest.status === 'success'){
            const profileData = parsedProfileRequest.data;
            setParticipatingCompetitions(profileData.competitions);
        }else{
            history.push('/login');
        }
    }, [history]);

    useEffect(() => {
        fetchProfile();
    }, [fetchProfile]);

    if(participatingCompetitions.length === 0){
        return (
            <Box position='fixed' h='100%' w='100%' bg='gray.800' overflow='auto'>
                <Navbar textColor='white' />
                <Box px='4em' py='3em' bg='teal' w='100%'>
                    <Text fontSize='home.header' color='white'>
                        Competitions you are participating in
                    </Text>
                    <Flex w='100%' mt='1em' justify='center' flexDirection='column' alignItems='center'>
                            <Text fontSize='card.text' color='white'>
                                None :( join a competition!
                            </Text>
                    </Flex>
                </Box>
            </Box>
        );
    }

    return (
        <Box position='fixed' h='100%' w='100%' bg='gray.800' overflow='auto'>
            <Navbar textColor='white' />
            <Box px='4em' py='3em' bg='teal' w='100%'>
                <Text fontSize='home.header' color='white'>
                    Competitions you are participating in
                </Text>
                <Flex w='100%' mt='1em' justify='center' flexDirection='column' alignItems='center'>
                    {participatingCompetitions.map(competitionUUID => {
                        return <CompetitionCard key={competitionUUID} uuid={competitionUUID} />
                    })}
                </Flex>
            </Box>
        </Box>
    );
};

export default Participating;