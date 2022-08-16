import { Box, Flex, Icon, Spinner, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { supabase } from "../services/supabase";
import { TodoProps } from "../types/TodoProps";
import { useAuthContext } from "./context/AuthContext";
import { useTodoContext } from "./context/TodoContext";
import { NoTaskMessage } from "./NoTasksMessage";
import {IoClose} from "react-icons/io5"

export function TodoList(){

    const router = useRouter()

    const {user} = useAuthContext()
    const {todos, fetchTodos, toggleTodo, deleteTodo} = useTodoContext()
    const session = supabase.auth.session()

    useEffect(() => {
        !user && router.push("/")
    }, [user])

    useEffect(() => {
        fetchTodos(user?.id)
    }, [user])

    return(
        <Flex direction="column" gap={5}>
            {
                todos?.length ?
                todos.map((todo: TodoProps) => (
                    <Flex 
                    onClick={() => toggleTodo(todo)} 
                    key={todo.uuid}
                    justify="center"
                    align="center"
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
                    pl={3}
                    >
                        <Text flex="10">{todo.text}</Text>
                        <Icon as={IoClose} flex="1" onClick={() => deleteTodo(todo.uuid, todo.user_id)}/>
                    </Flex>
                ))
                :
                <NoTaskMessage />
            }

        </Flex>
    )
}