import { theme } from '@chakra-ui/core';

const customTheme = {
    ...theme,
    colors: {
        ...theme.colors,
        darkPop: '#e0e0e0',
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
        },
        home: {
            header: '2rem'
        },
        card: {
            header: '1.5rem',
            text: '1.25rem'
        }
    }
};

export default customTheme;