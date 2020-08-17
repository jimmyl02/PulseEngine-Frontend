import React from 'react';
import { Spinner, Flex, Text, Grid, Box, Icon } from '@chakra-ui/core';

const TeamRow = (props) => {
    const teamName = props.teamName;
    const teamData = props.teamData;

    return (
        <React.Fragment>
        <Box w='100%' h='10' borderWidth='1px' borderColor='darkPop'>
            <Flex w='100%' h='100%' justify='center' align='center'>
                <Text mx='1em' color='white'>
                    {teamName}
                </Text>
            </Flex>
        </Box>
        {Object.keys(teamData).map((service) => {
            if(teamData[service].status){
                return(
                    <Box key={service} w='100%' h='10' borderWidth='1px' borderColor='darkPop'>
                        <Flex w='100%' h='100%' justify='center' align='center'>
                            <Icon name='check' size='1rem' color='green.400' />
                        </Flex>
                    </Box>
                );
            }else{
                return(
                    <Box key={service} w='100%' h='10' borderWidth='1px' borderColor='darkPop'>
                        <Flex w='100%' h='100%' justify='center' align='center'>
                            <Icon name='close' size='1rem' color='red.500' />
                        </Flex>
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
            <Flex w='100%' justify='center'>
                <Spinner size='md' color='darkPop' />
            </Flex>
        );
    }else if(Object.keys(scores).length === 0){
        return (
            <Flex w='100%' justify='center'>
                <Text color='white'>
                    There are currently no scores
                </Text>
            </Flex>
        );
    }else{
        return (
            <Grid templateColumns={'repeat(' + (Object.keys(scores[Object.keys(scores)[0]]).length + 1) + ', 1fr)'}>
                <Box w='100%' h='10' />
                {Object.keys(scores[Object.keys(scores)[0]]).map((service) => {
                    return (<Box key={service} w='100%' h='10' borderWidth='1px' borderColor='darkPop'>
                        <Flex w='100%' h='100%' justify='center' align='center'>
                            <Text color='white'>
                                {service}
                            </Text>
                        </Flex>
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