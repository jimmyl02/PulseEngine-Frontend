import React from 'react';
import { useHistory } from 'react-router-dom';
import { Flex, Text, Box, Stack, Menu, MenuButton, MenuList, MenuItem, Button } from '@chakra-ui/core';

const Navbar = (props) => {
    const history = useHistory();

    const logout = () => {
        localStorage.removeItem('authToken');
        history.push('/');
    }

    return (
        <React.Fragment>
            <Flex w='100%' px='2em' pt='1.5em' pb='1em' justify='space-between' align='center' color={props.textColor}>
                <Box>
                    <Text fontSize='navbar.text'>
                        CCDC Scoring
                    </Text>
                </Box>
                <Stack isInline>
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
                            <MenuItem onClick={() => {history.push('/owned')}}>
                                <Text color='navbar.dropdownText'>
                                    Participanting Competitions
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
                </Stack>
            </Flex>
            <Box w='100%' py='0.1em' bg='gray.600'></Box>
        </React.Fragment>
    );
};

export default Navbar;