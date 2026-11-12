import localRecipes from '../data/recipes.json';

const REMOTE_URL =
  'https://raw.githubusercontent.com/YOUR_USERNAME/CookBook/main/src/data/recipes.json';

let cache = null;

// Network call, with local data as a fallback (offline, repo not published yet...)
async function loadAll() {
  if (cache) return cache;
  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 6000);
    const res = await fetch(REMOTE_URL, { signal: controller.signal });
    clearTimeout(timer);
    if (!res.ok) throw new Error(`Server error (${res.status})`);
    cache = await res.json();
  } catch (e) {
    console.warn('API unavailable, using local data:', e.message);
    cache = localRecipes;
  }
  return cache;
}

// Short version of a recipe (lists + SQLite favorites)
export const toSummary = (r) => ({
  id: r.id,
  name: r.name,
  emoji: r.emoji,
  category: r.category,
  area: r.area,
});

const normalize = (s) =>
  s.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();

export async function getCategories() {
  const all = await loadAll();
  return [...new Set(all.map((r) => r.category))];
}

export async function getRecipes(category) {
  const all = await loadAll();
  const list = category && category !== 'All' ? all.filter((r) => r.category === category) : all;
  return list.map(toSummary);
}

export async function searchRecipes(query) {
  const all = await loadAll();
  const q = normalize(query);
  return all
    .filter((r) => normalize(`${r.name} ${r.category} ${r.ingredients.join(' ')}`).includes(q))
    .map(toSummary);
}

export async function getRandomRecipe() {
  const all = await loadAll();
  return toSummary(all[Math.floor(Math.random() * all.length)]);
}

export async function getRecipeById(id) {
  const all = await loadAll();
  return all.find((r) => r.id === id) ?? null;
}