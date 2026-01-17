import React, { useEffect, useState } from "react";
import { getItems, addItem, deleteItem } from "./api";
import ItemList from "./components/ItemList";
import ItemForm from "./components/ItemForm";

function App() {
  const [items, setItems] = useState([]);

  const loadItems = async () => {
    const data = await getItems();
    setItems(data);
  };

  const handleAdd = async item => {
    console.log("Adding item:", item);
    const newItem = await addItem(item);
    setItems([...items, newItem]);
  };

  const handleDelete = async id => {
    await deleteItem(id);
    setItems(items.filter(i => i.id !== id));
  };

  useEffect(() => {
    loadItems();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>FilmsListApp</h1>
      <ItemForm onAdd={handleAdd} />
      <ItemList items={items} onDelete={handleDelete} />
    </div>
  );
}

export default App;