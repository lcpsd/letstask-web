import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../../services/supabase";
import { TodoProps } from "../../types/TodoProps";

interface TodoContextProps{
    fetchTodos: (userId: string | undefined) => void;
    toggleTodo: (todo: TodoProps) => void;
    deleteTodo: (uuid: string | undefined, userId: string | undefined) => Promise<void>;
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

        if(data){
            const filterCompleteFalse = 
            data?.filter(item => item.complete == false)
            data?.sort((a,b) => b-a)

            const filterCompleteTrue = 
            data?.filter(item => item.complete == true)
            data?.sort((a,b) => a-b)
            
            setTodos([...filterCompleteFalse, ...filterCompleteTrue])
        }
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

    const deleteTodo = async (uuid: string | undefined, userId: string | undefined) => {

        if(!uuid){
            return
        }

        try {
            const { data } = await supabase
            .from('todos')
            .delete()
            .eq('uuid', uuid)

            fetchTodos(userId)         
        } catch (error) {
            return
        }
    }

    return(
        <TodoContext.Provider value={{fetchTodos, toggleTodo, todos, deleteTodo}}>
            {children}
        </TodoContext.Provider>
    )
}

export function useTodoContext(){
    return useContext(TodoContext)
}