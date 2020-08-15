import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Box, Flex, Spinner, Text } from '@chakra-ui/core';

import { API_URL } from '../../config';

const CompetitionCard = (props) => {
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
    
    if(loading){
        return (
            <Box borderWidth='1px' rounded='md' width='100%'>
                <Flex position='fixed' w='100%' align='center' justify='center'>
                    <Spinner size='md' color='darkPop' />
                </Flex>
            </Box>
        );
    }else{
        return (
            <Box borderWidth='1px' rounded='md' width='100%' color='white'>
                <Text>
                    {competitionName}
                </Text>
            </Box>
        );
    }
};

export default CompetitionCard;