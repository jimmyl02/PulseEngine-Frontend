import React from 'react';
import { Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter, ModalCloseButton } from '@chakra-ui/core';

const SimpleModal = (props) => {
    const open = props.open;
    const setOpen = props.setOpen;
    const header = props.header;
    const children = props.children;
    
    return (
        <Modal isOpen={open} onClose={() => {setOpen(false)}}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>{header}</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    {children}
                </ModalBody>
                <ModalFooter>
                    <Button variantColor="blue" mr={3} onClick={() => {setOpen(false)}}>
                        Close
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default SimpleModal;