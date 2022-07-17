import React from 'react'
import { Box, Alert, AlertIcon, AlertTitle, AlertDescription } from '@chakra-ui/react';

export default function ErrorMessage({message}) {
  return (
        <Alert status='error' display='flex' flexDir='row' alignItems='center'>
            <AlertIcon />
            <Box display='flex' flexDir='column'>
                <AlertTitle>¡Error!</AlertTitle>
                <AlertDescription>{`Hubo un problema en el sistema: ${message}`}</AlertDescription>
            </Box>
        </Alert>
  )
}
