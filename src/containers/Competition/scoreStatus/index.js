import React from 'react';
import { Spinner, Text, Grid, Box, Icon } from '@chakra-ui/core';

const TeamRow = (props) => {
    const teamName = props.teamName;
    const teamData = props.teamData;

    return (
        <React.Fragment>
        <Box w='100%' h='10' borderWidth='1px' borderColor='darkPop'>
            <Text color='white'>
                {teamName}
            </Text>
        </Box>
        {Object.keys(teamData).map((service) => {
            if(teamData[service].status){
                return(
                    <Box key={service} w='100%' h='10' borderWidth='1px' borderColor='darkPop'>
                        <Icon name='check' size='1rem' color='green.400' />
                    </Box>
                );
            }else{
                return(
                    <Box key={service} w='100%' h='10' borderWidth='1px' borderColor='darkPop'>
                        <Icon name='close' size='1rem' color='red.500' />
                    </Box>
                );
            }
        })}
        </React.Fragment>
    );
} 

const ScoreStatus = (props) => {
    const scores = props.scores;

    if(scores === undefined){
        return (
            <Spinner size='md' color='darkPop' />
        );
    }else if(Object.keys(scores).length === 0){
        return (
            <Text color='white'>
                There are currently no scores
            </Text>
        );
    }else{
        return (
            <Grid templateColumns={'repeat(' + (Object.keys(scores[Object.keys(scores)[0]]).length + 1) + ', 1fr)'}>
                <Box w='100%' h='10' />
                {Object.keys(scores[Object.keys(scores)[0]]).map((service) => {
                    return (<Box key={service} w='100%' h='10' borderWidth='1px' borderColor='darkPop'>
                        <Text color='white'>
                            {service}
                        </Text>
                    </Box>
                    );
                })}
                {Object.keys(scores).map((teamName) => {
                    const teamData = scores[teamName];
                    return(
                        <TeamRow key={teamName} teamName={teamName} teamData={teamData} />
                    );
                })}
            </Grid>
        );
    }
}

export default ScoreStatus