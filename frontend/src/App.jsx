import { useEffect, useMemo, useState } from "react";
import { getTasks, addTask, updateTask, deleteTask } from "./api";
import "./App.css";

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [text, setText] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    getTasks().then(setTasks);
  }, []);

  const leftCount = useMemo(
    () => tasks.filter(t => !t.completed).length,
    [tasks]
  );

  async function handleAdd(e) {
    e.preventDefault();
    const t = text.trim();
    if (!t || saving) return;

    setSaving(true);
    try {
      const created = await addTask(t);
      setTasks(prev => [created, ...prev]);
      setText("");
    } finally {
      setSaving(false);
    }
  }

  async function toggle(task) {
    const updated = await updateTask(task._id, { completed: !task.completed });
    setTasks(prev => prev.map(t => (t._id === task._id ? updated : t)));
  }

  async function edit(task) {
    const val = prompt("Edit task", task.title);
    if (val === null) return;
    const trimmed = val.trim();
    if (!trimmed) return;

    const updated = await updateTask(task._id, { title: trimmed });
    setTasks(prev => prev.map(t => (t._id === task._id ? updated : t)));
  }

  async function remove(task) {
    await deleteTask(task._id);
    setTasks(prev => prev.filter(t => t._id !== task._id));
  }

  return (
    <div className="page">
      <div className="card">
        <header className="header">
          <div>
            <h1 className="title">To-Do</h1>
            <p className="subtitle">
              {leftCount} remaining • {tasks.length} total
            </p>
          </div>
          <span className="pill">MERN</span>
        </header>

        <form onSubmit={handleAdd} className="addRow">
          <input
            className="input"
            value={text}
            onChange={e => setText(e.target.value)}
            placeholder="Add a task…"
            maxLength={120}
          />
          <button className="btn primary" disabled={!text.trim() || saving}>
            {saving ? "Adding…" : "Add"}
          </button>
        </form>

        <div className="list">
          {tasks.length === 0 ? (
            <div className="empty">
              <div className="emptyIcon">✓</div>
              <div>
                <div className="emptyTitle">No tasks yet</div>
                <div className="emptySub">Add your first task above.</div>
              </div>
            </div>
          ) : (
            tasks.map(task => (
              <div className="row" key={task._id}>
                <label className="check">
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => toggle(task)}
                  />
                  <span className="box" />
                </label>

                <div className="taskText">
                  <div className={task.completed ? "task done" : "task"}>
                    {task.title}
                  </div>
                  <div className="meta">
                    {task.completed ? "Completed" : "Pending"}
                  </div>
                </div>

                <div className="actions">
                  <button
                    type="button"
                    className="btn"
                    onClick={() => edit(task)}
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    className="btn danger"
                    onClick={() => remove(task)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        <footer className="footer">
          <span className="hint">Tip: click a checkbox to mark complete.</span>
        </footer>
      </div>
    </div>
  );
}
