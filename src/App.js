import { useState } from "react";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");

  const addTask = () => {
    if (!input.trim()) return;
    setTasks([...tasks, { id: Date.now(), text: input, done: false }]);
    setInput("");
  };

  const toggleTask = (id) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, done: !t.done } : t));
  };

  const removeTask = (id) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  const startEdit = (task) => {
    setEditingId(task.id);
    setEditText(task.text);
  };

  const saveEdit = (id) => {
    if (!editText.trim()) return;
    setTasks(tasks.map(t => t.id === id ? { ...t, text: editText } : t));
    setEditingId(null);
    setEditText("");
  };

  return (
    <div className="container">
      <h1>Minhas Tarefas:</h1>
      <div className="input-area">
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === "Enter" && addTask()}
          placeholder="Nova tarefa..."
        />
        <button onClick={addTask}>Adicionar</button>
      </div>
      <ul>
        {tasks.map(task => (
          <li key={task.id} className={task.done ? "done" : ""}>
            {editingId === task.id ? (
              <div className="edit-area">
                <input
                  value={editText}
                  onChange={e => setEditText(e.target.value)}
                  onKeyDown={e => e.key === "Enter" && saveEdit(task.id)}
                  autoFocus
                />
                <button className="save-btn" onClick={() => saveEdit(task.id)}>✔</button>
              </div>
            ) : (
              <>
                <input
                  type="checkbox"
                  checked={task.done}
                  onChange={() => toggleTask(task.id)}
                />
                <span onClick={() => toggleTask(task.id)}>{task.text}</span>
                <div className="actions">
                  <button className="edit-btn" onClick={() => startEdit(task)}>EDITAR</button>
                  <button className="del-btn" onClick={() => removeTask(task.id)}>EXCLUIR</button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;