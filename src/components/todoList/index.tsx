import React from "react";
import "./index.scss";
import TodoItem from "./todo";
import AddTodoForm from "./addTodo";
import { fetchApi } from "../../utils/api";

export interface ToDoInterface {
  id?: number;
  title: string;
  description: string;
  status: boolean;
  due_date?: string;
  UserId?: number;
  tags?: string[];
  image?: string;
}

const TodoList: React.FC = () => {
  const [todos, setTodos] = React.useState<ToDoInterface[]>([]);
  const [selectedTodos, setSelectedTodos] =
    React.useState<ToDoInterface[]>(todos);
  const [tags, setTags] = React.useState<string[]>([]);
  const [search, setSearch] = React.useState<string>("");
  const [addMode, setAddMode] = React.useState<boolean>(false);

  React.useEffect(() => {
    fetchApi("/api/todos", "GET").then(
      ({ success, data }) => {
        console.log(data);
        if (success && Array.isArray(data)) {
          setTodos(data as ToDoInterface[]);
        } else {
          console.error("Error:", data);
        }
      },
      (error) => {
        console.error("Error:", error);
      },
    );
  }, []);

  React.useEffect(() => {
    setSelectedTodos(todos);
    todos.forEach((todo) => {
      todo.tags?.forEach((tag) => {
        if (!tags.includes(tag)) {
          setTags([...tags, tag]);
        }
      });
    });
  }, [todos]);

  const handleSearch = (e: { target: { value: string } }) => {
    setSearch(e.target.value);
    if (search === "" || search === null) {
      setSelectedTodos(todos);
    } else {
      setSelectedTodos(
        todos.filter((todo) => todo.title.includes(e.target.value)),
      );
    }
  };

  return (
    <div>
      <h2>Todos ({todos.filter((todo) => !todo.status).length} remaining)</h2>
      <div className="todo-buttons">
        <button
          className={"button primary"}
          onClick={() => setAddMode(!addMode)}
        >
          {addMode ? "Close" : "Add"}
        </button>
        <button className={"button secondary"}>Complete All</button>
        <button className={"button secondary"}>Delete All</button>
      </div>

      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Search"
          value={search}
          className={"grow"}
          onChange={handleSearch}
        />

        <select className={""}>
          <option value="all">All</option>
          {tags.map((tag, index) => {
            return (
              <option key={index} value={tag}>
                {tag}
              </option>
            );
          })}
        </select>
      </div>

      {addMode && <AddTodoForm />}

      <ul>
        {selectedTodos.map((todo, index) => (
          <TodoItem key={index} {...todo} />
        ))}
        <TodoItem
          title="Title"
          description="Todo"
          status={false}
          tags={["tag1", "tag2", "tag3"]}
        />
      </ul>
    </div>
  );
};

export default TodoList;
