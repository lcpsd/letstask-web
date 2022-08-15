import { Flex } from "@chakra-ui/react";
import { Dispatch, SetStateAction } from "react";
import { TodoProps } from "../types/todo";

interface TodoListProps{
    todos: TodoProps[];
    setTodos: Dispatch<SetStateAction<TodoProps[]>>
}

export function TodoList({todos, setTodos}: TodoListProps){

    const toggleTodo = (index: number) => {
        
    }

    return(
        <Flex direction="column">

            {
                todos.map((todo, index) => (
                    <Flex onClick={() => toggleTodo(index)}>
                        {todo.text}
                    </Flex>
                ))
            }

        </Flex>
    )
}