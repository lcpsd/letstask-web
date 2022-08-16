import { Box, Flex, Icon, Img, Input, Spinner, Text } from "@chakra-ui/react";
import { ChangeEvent, useEffect, useState } from "react";
import { DefaultButton } from "../components/DefaultButton";
import { TodoProps } from "../types/TodoProps";
import { TodoList } from "../components/TodoList";
import { useAuthContext } from "../components/context/AuthContext";
import {IoMdAdd} from "react-icons/io"
import { supabase } from "../services/supabase";
import { v4 as uuidv4 } from 'uuid'
import { useTodoContext } from "../components/context/TodoContext";
import Image from "next/image";

export default function todos(){

    const [newTodo, setNewTodo] = useState("")
    const [loading, setLoading] = useState(false)
    const {logout, user} = useAuthContext()
    const {fetchTodos} = useTodoContext()
    const session = supabase.auth.session()

    const handleAddTodo = async () => {

        if(newTodo.length < 1){
            return
        }

        setLoading(true)

        const uuid = uuidv4()

        await supabase
        .from('todos')
        .insert([{
            text: newTodo,
            user_id: user?.id,
            complete: false,
            uuid: uuid
        }])
        .single()
        setNewTodo("")

        fetchTodos(user?.id)

        setLoading(false)
    }

    useEffect(() => {
        fetchTodos(session?.user?.id)
    }, [session?.user])

    return(
        <Flex direction="column" p={5} gap={5}>
            <Flex align="center">
                <Flex>
                    <Img
                    src={user?.user_metadata?.picture}
                    rounded="full"
                    border="2px"
                    borderColor="black"
                    h="80px"
                    w="80px"
                    />
                </Flex>
                <DefaultButton
                onClick={() => logout("/")}
                maxW="100px"
                ml="auto"
                >SignOut</DefaultButton>
            </Flex>
            
            <Flex>
                <Input
                borderColor="black"
                value={newTodo}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    setNewTodo(e.target.value)
                }}
                borderRight="0"
                borderRightRadius="0"
                placeholder="What's next?"
                _placeholder={{color:"gray"}}
                />
                <DefaultButton
                borderLeftRadius="0"
                fontSize="2xl"
                onClick={handleAddTodo}
                >
                    {
                        loading ?
                        <Spinner color="black" />
                        :
                        <Icon as={IoMdAdd}/>
                    }
                </DefaultButton>
            </Flex>

            <TodoList />
        </Flex>
    )
}