import React from "react";
import '../App.css';
import {GENRES_LABELS, TYPE_LABELS} from "./ItemForm";

export default function ItemList({ items, onDelete }) {
  return (
    <div className="item-list">
      {items.map(item => (
        <div key={item.id} className="item-card">
          <h3>{item.title}</h3>
          {item.poster && (
            <img
                src={item.poster}
                alt={item.title}
                className="item-poster"
            />
            )}
          <p>{TYPE_LABELS[item.type] || item.type}</p>

          {item.genres && item.genres.length > 0 && (
            <p>
              Жанры:{" "}
              {item.genres
                .map(genre => GENRES_LABELS[genre] || genre)
                .join(", ")}
            </p>
          )}

          <button onClick={() => onDelete(item.id)}>Удалить</button>
        </div>
      ))}
    </div>
  );
}