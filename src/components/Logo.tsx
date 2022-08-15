import { Box, Flex, Text } from "@chakra-ui/react";

export function Logo(){
    return(
        <Flex align="center" justify="center">
            <Text fontFamily="Dancing Script" fontSize="6xl">Lets</Text>
            <Text fontFamily="Dancing Script" fontSize="6xl" position="relative">
            Task
            <Box as="span" h="2px" w="110%" position="absolute" left="0" top="1.5rem" bottom="0" my="auto" bg="black"/>
            </Text>
      </Flex>
    )
}