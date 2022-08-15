import { Button, ChakraStyledOptions, Flex } from "@chakra-ui/react";

interface DefaultButtonProps extends ChakraStyledOptions{
    children: string | JSX.Element | JSX.Element[];
}

export function DefaultButton({children, ...rest}:DefaultButtonProps){

    return(
        <Button 
        colorScheme="white" 
        border="1px" 
        borderColor="black"
        color="black"
        _hover={{background: "black", color: "white"}}
        {...rest}
        >
            <Flex 
            p="0"
            >
                {children}
            </Flex>
        </Button>
    )
}