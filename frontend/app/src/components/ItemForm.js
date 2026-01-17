import React, { useState } from "react";
import '../App.css';

export const TYPE_LABELS = {
  film: "Фильм",
  series: "Сериал"
};

export const GENRES = [
  "action", "adventure", "comedy", "drama", "romance", "horror",
  "thriller", "fantasy", "animation", "documentary", "historical",
  "crime", "western", "superhero", "psychological", "family"
];

export const GENRES_LABELS = {
  action: "Боевик",
  adventure: "Приключения",
  comedy: "Комедия",
  drama: "Драма",
  romance: "Романтика",
  horror: "Ужасы",
  thriller: "Триллер",
  fantasy: "Фэнтези",
  animation: "Анимационный",
  documentary: "Документальный",
  historical: "Исторический",
  crime: "Криминал",
  western: "Вестерн",
  superhero: "Супергеройский",
  psychological: "Психологический",
  family: "Семейный"
};



export default function ItemForm({ onAdd }) {
  const [title, setTitle] = useState("");
  const [type, setType] = useState("");
  const [genres, setGenres] = useState([]);
  const [poster, setPoster] = useState("");

  const handleSubmit = e => {
    e.preventDefault();
    if (!title || !type) return;
    onAdd({ title, type, genres, poster });
    setTitle("");
    setType("");
    setGenres([]);
    setPoster("");
  };

  const handleGenreChange = (genre) => {
    if (genres.includes(genre)) {
      setGenres(genres.filter(g => g !== genre));
    } else {
      setGenres([...genres, genre]);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="item-form">
      <h2>Добавить фильм/сериал</h2>
      <input
        type="text"
        placeholder="Название"
        value={title}
        onChange={e => setTitle(e.target.value)}
      />
    <input
        type="text"
        placeholder="Ссылка на постер (опционально)"
        value={poster}
        onChange={e => setPoster(e.target.value)}
    />
      <select value={type} onChange={e => setType(e.target.value)}>
        <option value="">Выберите тип</option>
        {Object.entries(TYPE_LABELS).map(([value, label]) => (
            <option key={value} value={value}>{label}</option>
            ))}
      </select>

      <div className="genres-container">
        <strong>Жанры:</strong>
        <div className="genres-list">
        {GENRES.map(genre => (
        <label key={genre}>
            <input
            type="checkbox"
            value={genre}
            checked={genres.includes(genre)}
            onChange={() => handleGenreChange(genre)}
            />
            {GENRES_LABELS[genre]}
        </label>
        ))}
        </div>
      </div>

      <button type="submit">Добавить</button>
    </form>
  );
}