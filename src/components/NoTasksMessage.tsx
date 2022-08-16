import { Box, Flex, Text } from "@chakra-ui/react";

export function NoTaskMessage(){

    return(
        <Flex color="black" position="relative" justify="center" fontFamily="Dancing Script">
            <Box as="span" h="2px" w="120px" position="absolute" right="0" left="0" top="0.4rem" bottom="0" my="auto" mx="auto" bg="black"/>
            <Text fontSize="2xl">Nothing Todo</Text>
        </Flex>
    )
}