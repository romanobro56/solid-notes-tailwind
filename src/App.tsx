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
    e.preventDefault();
    const taskInput = document.querySelector('#taskInput') as HTMLInputElement
    const newTask: Task = {
      id: Math.random().toString(36).substring(2),
      text: taskInput.value,
      completed: false,
    };
    console.log(newTask);
    setTaskList([newTask, ...taskList]);
    taskInput.value = '';
  };
  const deleteTask = (task: Task) => {
    setTaskList(taskList.filter((item) => item !== task));
  };
  const toggleStatus = (taskId: string) => {
    setTaskList(
      (task) => task.id === taskId,
      'completed',
      (completed) => !completed,
    );
  };
  return (
    <div class="flex flex-col justify-center">
      <h1 class="mb-4 self-center text-zinc-800 hover:text-sky-800 text-4xl mt-4">note app</h1>
      <div class="h-screen flex flex-col items-center">
        <form class="bg-gray-600 shadow-lg rounded w-10/12 flex flex-col max-w-4xl" autocomplete="off">
          <input type="text" id="taskInput" class="block w-11/12 p-4 self-center text-gray-900 border rounded-lg bg-gray-700 sm:text-md focus:ring-blue-500 focus:border-blue-500 border-gray-600 placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 m-5" />
          <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onclick={(e) => addTask(e)}>
          Add task
          </button>
        </form>
        <h1 class="my-5 self-center text-zinc-800 hover:text-red-700 text-3xl">tasks</h1>
        <div class="grid grid-cols-2 gap-4 h-min items-center rounded w-10/12 max-w-4xl">
          <For each={taskList.filter((e)=> !(e.completed))}>
              {(task: Task) => (
                <div class="m-3 rounded bg-gray-600 min-h-50 justify-center flex items-stretch">
                  <input
                    type="checkbox"
                    checked={task.completed}
                    role="button"
                    class="w-5 h-5 my-3 mx-2"
                    onClick={() => {
                      toggleStatus(task.id)
                    }}
                  />
                  <div class='bg-light flex-auto p-2 m-px align-middle break-words items-center'>
                    {task.text}
                  </div>
                  <button class="bg-red-500 py-2 px-4 rounded py-3 my-3 max-h-2.5 mx-2" onClick={() => deleteTask(task)}>
                  </button>
                </div>
              )}
            </For>
          </div>
          <div class='w-10/12 h-1 bg-gray-500 max-w-4xl' />
          <div class="grid grid-cols-2 gap-4 h-min items-center rounded w-10/12 max-w-4xl">
            <For each={taskList.filter((e)=> (e.completed))}>
              {(task: Task) => (
                <div class="m-3 rounded bg-gray-400 min-h-50 justify-center flex items-stretch">
                  <input
                    type="checkbox"
                    checked={task.completed}
                    role="button"
                    class="w-5 h-5 my-3 mx-2"
                    onClick={() => {
                      toggleStatus(task.id)
                    }}
                  />
                  <div class='bg-light flex-auto p-2 m-px align-middle break-words items-center'>
                    {task.text}
                  </div>
                  <button class="bg-red-500 py-2 px-4 rounded py-3 my-3 max-h-2.5 mx-2" onClick={() => deleteTask(task)}>
                  </button>
                </div>
              )}
            </For>
          </div>
      </div> 
    </div>
  );
}

export default App;