const API_URL = "http://localhost:5003/api/items";

export async function getItems() {
  const res = await fetch(API_URL);
  return res.json();
}

export async function addItem(item) {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(item),
  });
  return res.json();
}

export async function deleteItem(id) {
  await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });
}