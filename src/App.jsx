import { useState, useEffect } from 'react'
import './App.css'
import Navbar from './assets/components/Navbar'
import { v4 as uuidv4 } from 'uuid';
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

function App() {
  const [toDo, settoDo] = useState("")
  const [toDoList, settoDoList] = useState([])
  const [showFinished, setshowFinished] = useState(true)

  useEffect(() => {
    let todoString = localStorage.getItem("todos")
    if (todoString) {
      let todos = JSON.parse(localStorage.getItem("todos"))
      settoDoList(todos)
    }
  }, [])
   const saveToLS = (params) => {
    localStorage.setItem("todos", JSON.stringify(toDoList))
  }
  
  const toggleFinished = (e) => {
    setshowFinished(!showFinished)
  }

  const handleEdit = (e, id) => {
    let t = toDoList.filter(i => i.id === id)
    settoDo(t[0].toDo)
    let newtoDoList = toDoList.filter(item => {
      return item.id !== id
    });
    settoDoList(newtoDoList)
    saveToLS()
  }
  const handleDelete = (e, id) => {
    let newtoDoList = toDoList.filter(item => {
      return item.id !== id
    })
    settoDoList(newtoDoList)
    saveToLS()
  }
  const handleAdd = () => {
    settoDoList([...toDoList, { id: uuidv4(), toDo, isCompleted: false }])
    settoDo("")
    saveToLS()
  }
  const handleChange = (e) => {
    settoDo(e.target.value)
  }
  
  const handleCheckbox = (e) => {
    let id = e.target.name
    let index = toDoList.findIndex(item => {
      return item.id === id
    })
    let newtoDoList = [...toDoList]
    newtoDoList[index].isCompleted = !newtoDoList[index].isCompleted
    settoDoList(newtoDoList)
    saveToLS()
  }


  return (
    <>
      <Navbar />
      <div className="mx-3 md:container md:mx-auto my-5 rounded-xl p-5 bg-green-100 min-h-[80vh] md:w-[35%]">
        <h1 className='font-bold text-center text-2xl'>Manage your daily tasks at one place</h1>
        <div className="addTodo my-6 flex flex-col gap-4">
          <h2 className='text-xl font-bold'>Add a ToDo</h2>
          <div className="flex">
          <input onChange={handleChange} value={toDo} type="text" className='border w-full rounded-full px-5 py-2' />
          <button onClick={handleAdd} disabled={toDo.length <= 3} className='bg-green-500 mx-2 rounded-full hover:bg-green-700 disabled:bg-green-700 p-4 py-2 text-sm font-bold '>Add</button>
          </div>
        </div>
        <input className='my-4' onChange={toggleFinished} type="checkbox" checked={showFinished} id="show" />
        <label className='mx-2' htmlFor="show">Show Finished</label>
        <div className='h-[1px] bg-black opacity-15 w-3/4 mx-auto my-2'></div>
        <h2 className='text-2xl font-bold'>Your ToDOs</h2>
        <div className="todos">
          {toDoList.length === 0 && <div className='m-5'>No ToDos </div>}
          {toDoList.map(
            item => {
              return (showFinished || !item.isCompleted) && <div key={item.id} className={"todo flex justify-between my-3"}>
                <div className='flex gap-6'>
                  <input onChange={handleCheckbox} type="checkbox" checked={item.isCompleted} name={item.id} id="" />
                  <div className={item.isCompleted ? "line-through" : ""}>
                    {item.toDo}
                  </div>
                </div>
                <div className="buttons flex h-full">
                  <button onClick={(e) => { handleEdit(e, item.id) }} className='bg-green-500 p-2 py-1 text-sm mx-2 font-bold rounded-md hover:bg-green-700'><FaRegEdit /></button>
                  <button onClick={(e) => { handleDelete(e, item.id) }} className='bg-green-500 p-2 py-1 text-sm mx-2 font-bold rounded-md hover:bg-green-700'><MdDelete /></button>
                </div>
              </div>
            }
          )}

        </div>
      </div>
    </>
  )
}

export default App
