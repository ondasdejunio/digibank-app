import { VStack, Spinner } from "@chakra-ui/react"

export default function LoadingAnimation() {
  return (
    <VStack w='100%' p='0' mt='2rem'>
            <Spinner size='lg'/>
    </VStack>
  )
}
