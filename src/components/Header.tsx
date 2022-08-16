import { Box, Flex, Img, Text } from "@chakra-ui/react";
import { useAuthContext } from "./context/AuthContext";
import { DefaultButton } from "./DefaultButton";

export function Header(){

    const {user, logout} = useAuthContext()

    return(
        <Flex align="center">
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
            <DefaultButton
            onClick={() => logout("/")}
            maxW="100px"
            ml="auto"
            >SignOut</DefaultButton>
        </Flex>
    )
}