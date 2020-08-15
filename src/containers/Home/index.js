import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Flex, Box, Text, Button } from '@chakra-ui/core';

import Navbar from '../../components/Navbar';

const Home = () => {
    const history = useHistory();

    return (
        <Box position='fixed' h='100%' w='100%' bg='gray.800'>
            <Navbar textColor='white' />

        </Box>
    );
};

export default Home;