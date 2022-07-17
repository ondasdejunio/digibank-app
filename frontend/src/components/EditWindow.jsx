import React from 'react'
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, FormControl, FormLabel, Input, ModalFooter, Alert, AlertIcon, AlertTitle, AlertDescription, Box, Button } from '@chakra-ui/react'

export default function EditWindow({initialRef, finalRef, isOpen, onClose, newProductName, setNewProductName, handleSaveButton, fetchStatus}) {
  return (
    <Modal
        isCentered
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
        size={['xs', 'md', 'lg']}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Editar nombre de producto</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            {fetchStatus.error ? <Alert mb='1rem' status='error' display='flex' flexDir='row' alignItems='center'>
              <AlertIcon />
              <Box display='flex' flexDir='column'>
                <AlertTitle>¡Error!</AlertTitle>
                <AlertDescription>Hubo un problema actualizando los datos.</AlertDescription>
              </Box>
            </Alert> : null}
            <FormControl>
              <FormLabel>Inserta el nuevo nombre</FormLabel>
              <Input ref={initialRef} value={newProductName} onChange={(event) => setNewProductName(event.target.value)} />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='teal' mr={3} onClick={handleSaveButton}>Guardar</Button>
            <Button onClick={onClose}>Cancelar</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
  )
}
