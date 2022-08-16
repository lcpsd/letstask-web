import { Box, Flex, Img, Text } from "@chakra-ui/react";
import { useAuthContext } from "./context/AuthContext";

export function Greetings(){

    const {user} = useAuthContext()

    return(
        <Flex gap={5}>
            <Img
            src={user?.user_metadata?.picture}
            rounded="full"
            border="2px"
            borderColor="black"
            h="80px"
            w="80px"
            />
            <Flex direction="column" justify="center">
                <Box fontSize="4xl" fontFamily="Dancing Script" lineHeight="1">Welcome!</Box>
                <Text>{user?.user_metadata?.name}</Text>
            </Flex>
        </Flex>
    )
}