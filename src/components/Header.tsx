import { Box, Flex, Img, Text } from "@chakra-ui/react";
import { useAuthContext } from "./context/AuthContext";
import { DefaultButton } from "./DefaultButton";
import { Greetings } from "./Greetings";

export function Header(){

    const {logout} = useAuthContext()

    return(
        <Flex align="center">
            <Greetings />
            
            <DefaultButton
            onClick={() => logout("/")}
            maxW="100px"
            ml="auto"
            >SignOut</DefaultButton>
        </Flex>
    )
}