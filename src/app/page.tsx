"use client";
import { Content, Montserrat } from "next/font/google";
import { ChangeEvent, useState } from "react";
//import { getUsersTasks } from apiCalls;
import { User } from "@prisma/client";
import { check } from "prettier";
import { randomInt, randomUUID } from "crypto";

// If loading a variable font, you don't need to specify the font weight
const montserrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-montserrat",
});

interface Task {
  id: string;
  content: string;
  checked: boolean;
}

function getUsersTasks(userId: string): Task[] {
  //do db
  // do api
  return [
    {
      id: "2hj13ghjg3",
      content: "Buy Cow",
      checked: false,
    },
    {
      id: "346jkh54k3j",
      content: "Send Email",
      checked: true,
    },
    {
      id: "1227836k3j",
      content: "Call Aunty",
      checked: false,
    },
  ];
}

async function Home() {
  const [currentUser, setCurrentUser] = useState();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [formTask, setformTask] = useState<Task>({
    id: randomInt.toString() as string,
    content: "",
    checked: false,
  });
  function handleAddTask() {
    if (formTask.content === "") return;
    setTasks((prevTasks) => [...prevTasks, formTask]);

    setformTask({
      id: randomInt.toString() as string,
      content: "",
      checked: false,
    });
  }
  function addTaskFeildChange(event: ChangeEvent<HTMLInputElement>) {
    setformTask((prevTask) => ({
      ...prevTask,
      content: event.target.value,
    }));
  }
  function toggleCheckbox(id: string) {
    setTasks((prevTask) =>
      prevTask.map((task) =>
        task.id === id ? { ...task, checked: !task.checked } : task
      )
    );
  }

  return (
    <>
      <div className="flex flex-col items-center justify-center p-10">
        <div>Add a task:</div>
        <div>Tasks in hand:</div>

        <div className="p-2">
          {tasks?.map((task) => (
            <div key={task.id} className="flex items-center space-x-2 p-1">
              <input
                type="checkbox"
                checked={task.checked}
                onChange={() => toggleCheckbox(task.id)}
                className="checkbox"
              />
              <div>{task.content}</div>
            </div>
          ))}
        </div>

        <div className="mt-4 flex items-center space-x-2">
          <input
            type="text"
            placeholder="Add a task"
            className="input-bordered input-primary input input-sm w-full max-w-xs"
            onChange={addTaskFeildChange}
            value={formTask.content}
          />
          <button className="btn-success btn-sm btn" onClick={handleAddTask}>
            Add
          </button>
        </div>
      </div>
    </>
  );
}
export default Home;
