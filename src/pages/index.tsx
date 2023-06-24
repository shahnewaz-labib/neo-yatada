import Head from "next/head";
import { api } from "~/utils/api";

export default function Home() {
  const tasks = api.posts.getAll.useQuery();
  const data = tasks.data;
  return (
    <>
      <Head>
        <title>Neo YATADA</title>
        <meta name="description" content="Yet Another To And Do App" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex flex-col items-center justify-center p-10">
        <div>Tasks:</div>
        <div>
          {data?.map((post) => (
            <div key={post.id}>{post.content}</div>
          ))}
        </div>
      </main>
    </>
  );
}
