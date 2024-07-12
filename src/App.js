import axios from "axios";
import React, { useState } from "react";
import "./App.css";

const BACKEND_URL = "http://localhost:3001/api/tasks";

function App() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);

  const getTasksFromBackend = async () => {
    const response = await axios.get(`${BACKEND_URL}/`);
    const backendTasks = response.data;

    const converted = backendTasks.map((task) => {
      return {
        id: task["_id"],
        description: task["description"],
      };
    });

    setTasks(converted);
  };

  const handleAddTask = async () => {
    const trimmed = task.trim();
    if (trimmed) {
      setTask("");

      try {
        await axios.post(`${BACKEND_URL}/`, {
          description: trimmed,
        });
      } catch (error) {
        console.error(error);
      }
    }

    await getTasksFromBackend();
  };

  const handleDeleteTask = async (index) => {
    const taskId = tasks[index].id;

    await axios.delete(`${BACKEND_URL}/${taskId}`);

    await getTasksFromBackend();
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>To Do List</h1>
        <div className="input-container">
          <input
            type="text"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            placeholder="Enter a new task"
            className="rounded-input"
          />
          <button onClick={handleAddTask} className="rounded-button">
            Save
          </button>
        </div>
      </header>
      <div className="task-container">
        <ul>
          {tasks.map((task, index) => (
            <li key={index}>
              <span className="task-number">{index + 1}. </span>
              <span className="task-item">{task.description}</span>
              <button
                className="delete-button"
                onClick={() => handleDeleteTask(index)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
