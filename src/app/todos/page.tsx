"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";

interface Todo {
  id: string;
  title: string;
  contents: string;
  isDone: boolean;
}

function page() {
  const [title, setTitle] = useState("");
  const [contents, setContents] = useState("");
  const [isDone, setIsDone] = useState(false);
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    const getData = async () => {
      const data: Todo[] = await getPost();
      console.log("ㄷㅇㅌ", data);
      setTodos(data);
    };
    getData();
  }, []);

  const getPost = async (): Promise<Todo[]> => {
    const res = await axios.get("http://localhost:4000/todos");
    return res.data;
  };

  const addPost = async () => {
    await axios.post("http://localhost:4000/todos", {
      title,
      contents,
      isDone,
    });
  };

  const handleTodoDone = async (id: string) => {
    setIsDone(true);
    await axios.patch(`http://localhost:4000/todos/${id}`, { isDone: true });
  };

  return (
    <>
      <div>
        <div>
          <h1> 제목</h1>

          <input type="text" onChange={(e) => setTitle(e.target.value)} />
        </div>
        <div>
          <h1> 내용</h1>

          <input type="text" onChange={(e) => setContents(e.target.value)} />
        </div>
        <button onClick={addPost}>추가하기</button>
      </div>

      <div>
        <div>
          <h1>투두리스트</h1>
          {todos
            .filter((todo) => !todo.isDone)
            .map((todo) => {
              return (
                <div key={todo.id}>
                  {todo.isDone}
                  {todo.title}
                  {todo.contents}
                  <button type="button" onClick={() => handleTodoDone(todo.id)}>
                    완료
                  </button>
                </div>
              );
            })}
        </div>
        <div>
          <h1>완료리스트</h1>
          {todos
            .filter((todo) => todo.isDone)
            .map((todo) => {
              return (
                <div key={todo.id}>
                  {todo.isDone}
                  {todo.title}
                  {todo.contents}
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
}

export default page;
