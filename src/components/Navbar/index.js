import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Flex, Text, Box, Menu, MenuButton, MenuList, MenuItem, Button } from '@chakra-ui/core';

const Navbar = (props) => {
    const history = useHistory();

    const [showHamburger, setShowHamburger] = useState(false);
    const handleToggle = () => {
        setShowHamburger(!showHamburger);
    }

    const logout = () => {
        localStorage.removeItem('authToken');
        history.push('/');
    }

    return (
        <React.Fragment>
            <Flex w='100%' px='2em' pt='1.5em' pb='1em' justify='space-between' align='center' color={props.textColor} wrap='wrap'>
                <Box>
                    <Text fontSize='navbar.text'>
                        Scoring Service
                    </Text>
                </Box>
                <Box display={{ base: "block", md: "none" }} onClick={handleToggle}>
                    <svg
                    fill="white"
                    width="12px"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                    >
                    <title>Menu</title>
                    <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
                    </svg>
                </Box>
                <Flex display={{ base: showHamburger ? 'flex' : 'none', md: 'flex' }}  width={{ base: 'full', md: 'auto' }} flexDirection={{ base: 'column', md: 'row' }}>
                    <Button bg='gray.800' _hover={{ bg: 'gray.800' }} _active={{ bg: 'gray.800' }} _focus={{}} onClick={() => {history.push('/home')}}>
                        Home
                    </Button>
                    <Menu>
                        <MenuButton as={Button} bg='gray.800' _hover={{ bg: 'gray.800' }} _active={{ bg: 'gray.800' }} _focus={{}} rightIcon='chevron-down'>
                            Competitions
                        </MenuButton>
                        <MenuList>
                            <MenuItem onClick={() => {history.push('/owned')}}>
                                <Text color='navbar.dropdownText'>
                                    Owned Competitions
                                </Text>
                            </MenuItem>
                            <MenuItem onClick={() => {history.push('/participating')}}>
                                <Text color='navbar.dropdownText'>
                                    Participanting Competitions
                                </Text>
                            </MenuItem>
                            <MenuItem onClick={() => {history.push('/create')}}>
                                <Text color='navbar.dropdownText'>
                                    Create a competition
                                </Text>
                            </MenuItem>
                        </MenuList>
                    </Menu>
                    <Menu>
                        <MenuButton as={Button} bg='gray.800' _hover={{ bg: 'gray.800' }} _active={{ bg: 'gray.800' }} _focus={{}} rightIcon='chevron-down'>
                            Account
                        </MenuButton>
                        <MenuList>
                            <MenuItem onClick={() => {logout()}}>
                                <Text color='navbar.dropdownText'>
                                    Logout
                                </Text>
                            </MenuItem>
                        </MenuList>
                    </Menu>
                </Flex>
            </Flex>
            <Box w='100%' py='0.1em' bg='gray.600'></Box>
        </React.Fragment>
    );
};

export default Navbar;