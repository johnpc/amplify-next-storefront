import { useState, useEffect } from "react";
import { generateClient } from "aws-amplify/data";
import { Schema } from "@/amplify/data/resource";
import { signOut } from "aws-amplify/auth";
import { useRouter } from "next/navigation";

const client = generateClient<Schema>();

export default function HomePage() {
  const router = useRouter();

  const logOut = async () => {
    await signOut();
    router.push("/sign-in");
  };
  const [todos, setTodos] = useState<Schema["Todo"][]>([]);
  async function listTodos() {
    const response = await fetch("/api/todos/list");
    const jsonResponse = await response.json();
    const { data } = jsonResponse;
    setTodos(data ?? []);
  }

  useEffect(() => {
    listTodos();
    const sub = client.models.Todo.observeQuery().subscribe(({ items }) =>
      setTodos([...items])
    );

    return () => sub.unsubscribe();
  }, []);

  return (
    <main>
      <h1>Hello, Amplify 👋</h1>
      <button onClick={() => logOut()}>Sign out</button>
      <button
        onClick={async () => {
          // create a new Todo with the following attributes
          const { errors, data: newTodo } = await client.models.Todo.create({
            // prompt the user to enter the title
            content: window.prompt("title"),
            done: false,
            priority: "medium",
          });
          console.log(errors, newTodo);
        }}
      >
        Create{" "}
      </button>

      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>{todo.content}</li>
        ))}
      </ul>
    </main>
  );
}
