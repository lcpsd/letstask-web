import { Flex, Icon, Input } from "@chakra-ui/react";
import { ChangeEvent, useState } from "react";
import { DefaultButton } from "../components/DefaultButton";
import { TodoProps } from "../types/todo";
import { TodoList } from "../components/TodoList";
import { useAuthContext } from "../components/context/AuthContext";
import {IoMdAdd} from "react-icons/io"

export default function todos(){

    const [newTodo, setNewTodo] = useState("")
    const [todos, setTodos] = useState<TodoProps[]>([])
    const {logout, user} = useAuthContext()

    const handleAddTodo = async () => {

        setNewTodo("")
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
                    <Icon as={IoMdAdd}/>
                </DefaultButton>
            </Flex>

            <TodoList todos={todos} setTodos={setTodos}/>
        </Flex>
    )
}