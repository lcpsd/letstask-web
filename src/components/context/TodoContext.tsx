import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../../services/supabase";
import { TodoProps } from "../../types/TodoProps";

interface TodoContextProps{
    fetchTodos: (userId: string | undefined) => void;
    toggleTodo: (todo: TodoProps) => void;
    todos: TodoProps[] | null;
}

export const TodoContext = createContext({} as TodoContextProps)

export function TodoContextProvider({children}:{children: JSX.Element}){

    const [todos, setTodos] = useState<TodoProps[] | null>([])

    async function fetchTodos(userId: string | undefined){

        if(!userId){
            return
        }

        const { data } = await supabase
        .from('todos')
        .select('*')
        .eq('user_id', userId)

        setTodos(data)
    }

    const toggleTodo = async (todo: TodoProps) => {
        try {
            const {data, error} = await supabase
            .from('todos')
            .update({complete: !todo.complete})
            .eq('uuid', todo.uuid)

            fetchTodos(todo.user_id)
        } catch (error) {
            return
        }
    }

    return(
        <TodoContext.Provider value={{fetchTodos, toggleTodo, todos}}>
            {children}
        </TodoContext.Provider>
    )
}

export function useTodoContext(){
    return useContext(TodoContext)
}