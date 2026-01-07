const base = import.meta.env.VITE_API_BASE_URL;

export async function getTasks() {
  const res = await fetch(`${base}/tasks`);
  return res.json();
}

export async function addTask(title) {
  const res = await fetch(`${base}/tasks`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title })
  });
  return res.json();
}

export async function updateTask(id, data) {
  const res = await fetch(`${base}/tasks/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
  return res.json();
}

export async function deleteTask(id) {
  await fetch(`${base}/tasks/${id}`, { method: "DELETE" });
}
