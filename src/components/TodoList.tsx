import { Box, Flex, Spinner, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { supabase } from "../services/supabase";
import { TodoProps } from "../types/TodoProps";
import { useAuthContext } from "./context/AuthContext";

interface TodoListProps{
    todos: TodoProps[];
    fetchTodos: () => Promise<void>;
}

export function TodoList({todos, fetchTodos}:TodoListProps){

    const router = useRouter()

    const {user} = useAuthContext()

    const toggleTodo = async (todo: TodoProps) => {
        try {
            const {data, error} = await supabase
            .from('todos')
            .update({complete: !todo.complete})
            .eq('uuid', todo.uuid)

            fetchTodos()
        } catch (error) {
            return
        }
    }

    useEffect(() => {
        !user && router.push("/")
    }, [user])

    useEffect(() => {
        !todos.length && fetchTodos()
    }, [])

    return(
        <Flex direction="column" gap={5}>
            {
                todos[0] ?
                todos.map((todo: TodoProps) => (
                    <Flex 
                    onClick={() => toggleTodo(todo)} 
                    key={todo.uuid}
                    justify="center"
                    fontSize="2xl"
                    border="1px"
                    borderColor="black"
                    rounded="md"
                    cursor="pointer"
                    _hover={{
                        background: "black",
                        color: "white"
                    }}
                    opacity={todo.complete ? "0.3" : "1"}
                    transition="all 0.2s"
                    >
                        {todo.text}
                    </Flex>
                ))
                :
                <Flex color="black" position="relative" justify="center" fontFamily="Dancing Script">
                    <Box as="span" h="2px" w="120px" position="absolute" right="0" left="0" top="0.4rem" bottom="0" my="auto" mx="auto" bg="black"/>
                    <Text fontSize="2xl">Nothing Todo</Text>
                </Flex>
            }

        </Flex>
    )
}