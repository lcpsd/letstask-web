import { Flex, Icon, Input, Spinner } from "@chakra-ui/react";
import { ChangeEvent, useState } from "react";
import { DefaultButton } from "../components/DefaultButton";
import { TodoProps } from "../types/TodoProps";
import { TodoList } from "../components/TodoList";
import { useAuthContext } from "../components/context/AuthContext";
import {IoMdAdd} from "react-icons/io"
import { supabase } from "../services/supabase";
import { v4 as uuidv4 } from 'uuid'

export default function todos(){

    const [newTodo, setNewTodo] = useState("")
    const [loading, setLoading] = useState(false)
    const {logout, user} = useAuthContext()
    const [todos, setTodos] = useState<TodoProps[] | any>([])

    async function fetchTodos(){
        setLoading(true)
        const { data } = await supabase
        .from('todos')
        .select('*')
        .eq('user_id', user?.id)

        setTodos(data)
        setLoading(false)
    }

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

        fetchTodos()

        setLoading(false)
    }

    return(
        <Flex direction="column" p={5} gap={5}>
            <DefaultButton
            onClick={() => logout("/")}
            maxW="100px"
            ml="auto"
            >SignOut</DefaultButton>
            
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

            <TodoList todos={todos} fetchTodos={fetchTodos}/>
        </Flex>
    )
}