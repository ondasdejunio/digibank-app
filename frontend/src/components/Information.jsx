import React from 'react'
import { Box, Text, Heading } from '@chakra-ui/react'

export default function Information() {
    return (
        <Box>
            <Text
                fontSize='md'
                fontWeight='medium'
                color='secondary'>
                Home / Modificación de datos
            </Text>
            <Heading
                as='h2'
                size='xl'
                color='secondary'>
                Productos DigiBank
            </Heading>
            <Text
                m='0.5rem 0 2rem 0'
                fontSize={['md', 'md', 'lg']}
                color='secondary'>
                Utiliza las herramientas de consulta, filtrado y modificación de datos para obtener y manipular tus resultados.
            </Text>
        </Box>
    )
}
