const KEY = 'cookbook_favorites';

const read = () => {
  try {
    return JSON.parse(localStorage.getItem(KEY)) || [];
  } catch {
    return [];
  }
};
const write = (list) => localStorage.setItem(KEY, JSON.stringify(list));

export async function getFavorites() {
  return read();
}

export async function addFavorite(r) {
  const list = read().filter((f) => f.id !== r.id);
  list.unshift({
    id: r.id,
    name: r.name,
    emoji: r.emoji ?? '',
    category: r.category ?? '',
    area: r.area ?? '',
  });
  write(list);
}

export async function removeFavorite(id) {
  write(read().filter((f) => f.id !== id));
}

export async function clearFavorites() {
  write([]);
}