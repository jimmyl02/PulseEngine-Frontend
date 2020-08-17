import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Box, PseudoBox, Flex, Spinner, Text } from '@chakra-ui/core';

import { API_URL } from '../../config';

const CompetitionCard = (props) => {
    const history = useHistory();
    const competitionUUID = props.uuid;

    const [loading, setLoading] = useState(true);
    const [competitionName, setCompetitionName] = useState('');

    const fetchCompetition = async (uuid) => {
        const profileRequest = await fetch(API_URL + '/api/competitions/info', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('authToken')
            },
            body: JSON.stringify({ compId: uuid })
        });
        const parsedProfileRequest = await profileRequest.json();
        if(parsedProfileRequest.status === 'success'){
            setCompetitionName(parsedProfileRequest.data.name);
        }else{
            setCompetitionName('Something has gone wrong, please try refreshing the page');
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchCompetition(competitionUUID);
    }, []);

    const redirToCompetition = (uuid) => {
        history.push('/competition/' + uuid);
    };
    
    if(loading){
        return (
            <Box borderWidth='1px' rounded='lg' width='75%' px='1.5em' py='1em' mt='1em' height='100%' color='white'>
                <Flex justify='center'>
                    <Spinner size='md' color='darkPop' />
                </Flex> 
            </Box>
        );
    }else{
        return (
            <PseudoBox borderWidth='1px' rounded='lg' width='75%' px='1.5em' py='1em' mt='1em' height='100%' color='white' _hover={{ cursor: 'pointer' }} onClick={() => redirToCompetition(competitionUUID)}>
                <Text fontSize='card.text'>
                    {competitionName}
                </Text>
            </PseudoBox>
        );
    }
};

export default CompetitionCard;