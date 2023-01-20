import { Component, createSignal, For } from "solid-js";
import { createStore } from 'solid-js/store';

const App: Component = () => {
  type Task = {
    id: string
    text: string
    completed: boolean
  };
  const [taskList, setTaskList] = createStore([] as Task[]);
  const addTask = (e: Event) => {
    e.preventDefault()

    const taskInput = document.querySelector('#taskInput') as HTMLInputElement

    const newTask: Task = {
      id: Math.random().toString(36).substring(2),
      text: taskInput.value,
      completed: false,
    }

    setTaskList([newTask, ...taskList])

    taskInput.value = ''
  };
  const deleteTask = (task: Task) => {
    setTaskList(taskList.filter((item) => item !== task))
  };
  const toggleStatus = (taskId: string) => {
    setTaskList(
      (task) => task.id === taskId,
      'completed',
      (completed) => !completed,
    )
  };
  return (
    <div class="flex flex-col justify-center">
      <h1 class="mb-4 self-center text-zinc-800 hover:text-sky-800 text-4xl mt-4">note app</h1>
      <div class="h-screen flex flex-col items-center">
        <form class="bg-gray-600 shadow-lg rounded w-8/12 flex flex-col">
          <input type="text" id="task-input" class="block w-11/12 p-4 self-center text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 m-5" />
          <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Add task
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;