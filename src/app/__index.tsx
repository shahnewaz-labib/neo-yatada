import Head from "next/head";
import { useState } from "react";
import { api } from "~/utils/api";

interface Post {
  id: string;
  content: string;
}

export default function Home() {
  const tasks = api.posts.getAll.useQuery();
  const data = tasks.data as Post[] | undefined;

  // State to keep track of the checked status for each task
  const [checkedTasks, setCheckedTasks] = useState<string[]>([]);

  // Function to toggle the checkbox for a task
  const toggleCheckbox = (taskId: string) => {
    if (checkedTasks.includes(taskId)) {
      // If task is already checked, remove it from the array
      setCheckedTasks((prevCheckedTasks) =>
        prevCheckedTasks.filter((id) => id !== taskId)
      );
    } else {
      // If task is not checked, add it to the array
      setCheckedTasks((prevCheckedTasks) => [...prevCheckedTasks, taskId]);
    }
  };

  const handleAddTask = () => {
    console.log("clicked");
  };

  return (
    <>
      <Head>
        <title>Neo YATADA</title>
        <meta name="description" content="Yet Another To And Do App" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex flex-col items-center justify-center p-10">
        <div>Add a task:</div>
        <div>Tasks in hand:</div>

        <div className="p-2">
          {data?.map((post) => (
            <div key={post.id} className="flex items-center space-x-2 p-1">
              <input
                type="checkbox"
                checked={checkedTasks.includes(post.id)}
                onChange={() => toggleCheckbox(post.id)}
                className="checkbox"
              />
              <div>{post.content}</div>
            </div>
          ))}
        </div>

        <div className="mt-4 flex items-center space-x-2">
          <input
            type="text"
            placeholder="Add a task"
            className="input-bordered input-primary input input-sm w-full max-w-xs"
          />
          <button className="btn-success btn-sm btn" onClick={handleAddTask}>
            Add
          </button>
        </div>
      </main>
    </>
  );
}
