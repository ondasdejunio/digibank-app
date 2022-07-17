import React from "react"
import { Box, Flex, Text, Avatar, Show } from "@chakra-ui/react"
 
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

        <Box display='flex' alignItems='center' gap='1rem'>
          <Show above="md">
            <Text fontSize='1rem' fontWeight='semibold' color='text_small'>Bienvenido, Jose</Text>
          </Show>
          <Avatar bg='green.500'/>
        </Box>
        
        
    </Flex>
)
}
