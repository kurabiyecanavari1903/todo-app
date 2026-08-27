import React, {useEffect, useRef, useState} from 'react'
import todo_icon from '../assets/todo_icon.png'
import TodoItems from './TodoItems'

const Todo = () => {

const [todoList, setTodoList] = useState(localStorage.getItem("todos")? JSON.parse(localStorage.getItem("todos")) : []);

const inputRef = useRef(); 

const ekle = () => {
    const inputText = inputRef.current.value.trim();

    if (inputText === "") {
        return null;
    }

    const newTodo = {
        id: Date.now(),
        text: inputText,
        isComplete: false,
    }
    setTodoList((prev) => [...prev, newTodo]);
    inputRef.current.value = "";
}

const deleteTodo = (id) => {
    setTodoList((prvTodos) => {
       return prvTodos.filter((todo) => todo.id !== id)
    })
}

const toggle = (id) => {
    setTodoList((prevTodos) => {
        return prevTodos.map((todo) => {
            if(todo.id === id){
                return {...todo, isComplete: !todo.isComplete} 
            }
            return todo;

        })
    })
}

useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todoList));
},[todoList])

return (
    <div className='bg-gray-900 place-self-center w-11/12 max-w-md flex flex-col p-7 min-h-137.5 rounded-xl'>

{/* ------ title kısmı ------ */}

    <div className ="flex items-center mt-7 gap-2">
        <img className='w-8 invert' src={todo_icon} alt="" />
        <h1 className='text-white text-3xl font-semibold'>To-Do List</h1>
    </div>


{/* ------ input box kısmı ------ */}

    <div className='flex items-center my-7 bg-gray-200 rounded-full'>
        <input ref={inputRef} className='bg-transparent border-0 outline-none flex-1 h-14 pl-6 pr-2 placeholder:text-slate-600 ' type="text" placeholder='Görevi Ekle' />
        <button onClick={ekle} className='border-none rounded-full bg-orange-600 w-29 h-14 text-white text-lg font-medium cursor-pointer'>EKLE +</button>
    </div>

{/* ------ todo list kısmı ------ */}

    <div>
        {todoList.map((item, index) => {
            return <TodoItems key={index} text={item.text} id={item.id} isComplete={item.isComplete} deleteTodo={deleteTodo} toggle={toggle} />
        })}
       
    </div>

    
    </div>
  )
}

export default Todo