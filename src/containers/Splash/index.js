import React from 'react';
import { useHistory } from 'react-router-dom';
import { Flex, Box, Text, Button } from '@chakra-ui/core';

const Splash = () => {
    const history = useHistory();

    return (
        <Box position='fixed' h='100%' w='100%' bg='gray.800'>
            <Flex position='fixed' h='100%' align='center' justify='center'>
                <Box rounded='lg' bg='blue.800' ml='7em'>
                    <Box mx='2em' mb='1em' color='white'>
                        <Text mt='0.5em' fontSize='splash.header'>
                            Scoring Service
                        </Text>
                        <Text mt='0.2em' fontSize='splash.description'>
                            A tool to train for CCDC style competitions
                        </Text>
                        <Button mt='.75em' variantColor='blue' onClick={() => history.push('/login')}>
                            Get Started
                        </Button>
                    </Box>
                </Box>
            </Flex>
        </Box>
    );
};

export default Splash;