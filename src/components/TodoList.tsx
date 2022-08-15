import { Flex } from "@chakra-ui/react";
import { TodoProps } from "../types/TodoProps";

export function TodoList(){

    const todos:TodoProps[] = []

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