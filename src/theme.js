import { theme } from '@chakra-ui/core';

const customTheme = {
    ...theme,
    colors: {
        ...theme.colors,
        bg: {
            darkPop: '#e0e0e0'
        },
        navbar: {
            dropdownText: 'black'
        }
    },
    fontSizes: {
        ...theme.fontSizes,
        splash: {
            header: '2rem',
            description: '1.35rem'
        },
        form: {
            header: '1.5rem'
        },
        navbar: {
            text: '1.5rem'
        }
    }
};

export default customTheme;