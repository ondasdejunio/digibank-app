import React from "react"
import { Box, Flex, Text, Avatar, Show } from "@chakra-ui/react"
import { ChevronDownIcon } from "@chakra-ui/icons"
 
export default function Navbar() {
return (
    <Flex
      as="nav"
      alignItems='center'
      w="100%"
      justifyContent='space-between'
      p='1.2rem'
      bg="secondary">
        <Box display='flex' alignItems='center' gap='1rem'>
          <Text fontSize='1.2rem' fontWeight='semibold' color='text_small'>DigiBank</Text>
          <Text fontSize='1rem' fontWeight='semibold' color='text'>Dashboard</Text>
        </Box>

        <Box display='flex' alignItems='center' gap='0.6rem'>
        <Avatar bg='green.500'/>
          <Show above="md">
            <Box display='flex' flexDir='row' gap='1rem'>
              <Box display='flex' flexDir='column'>
                <Text fontSize='1rem' lineHeight='1rem' fontWeight='semibold' color='text_small'>Andrés Castillo</Text>
                <Text fontSize='0.8rem' lineHeight='1rem' fontWeight='light' color='text_small'>Administrador</Text>
              </Box>
              <Box display='flex' alignItems='center'>
                <ChevronDownIcon color='primary' boxSize={5} />
              </Box>
            </Box>
          </Show>
        </Box>
        
        
    </Flex>
)
}
