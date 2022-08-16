import { Flex, Icon, Input, Spinner } from "@chakra-ui/react";
import { ChangeEvent, useEffect, useState } from "react";
import { DefaultButton } from "../components/DefaultButton";
import { TodoList } from "../components/TodoList";
import { useAuthContext } from "../components/context/AuthContext";
import {IoMdAdd} from "react-icons/io"
import { supabase } from "../services/supabase";
import { v4 as uuidv4 } from 'uuid'
import { useTodoContext } from "../components/context/TodoContext";
import { Header } from "../components/Header";
import { useRouter } from "next/router";
import { ProtectedRoute } from "../components/ProtectedRoute";

export default function todos(){

    const [newTodo, setNewTodo] = useState("")
    const [loading, setLoading] = useState(false)
    const {user} = useAuthContext()
    const {fetchTodos} = useTodoContext()
    const session = supabase.auth.session()
    const router = useRouter()

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
        <ProtectedRoute>
            <Flex direction="column" p={5} gap={5}>
            
                <Header />
                
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
        </ProtectedRoute>
    )
}