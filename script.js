document.getElementById('quiz-form').addEventListener('submit', async (e) => {
  e.preventDefault();

  const form = e.target;
  const data = {
    favorite_genres: form.favorite_genres.value,
    favorite_movie: form.favorite_movie.value,
    preferred_decade: form.preferred_decade.value,
    watch_mood: form.watch_mood.value,
    language_preference: form.language_preference.value
  };

  const res = await fetch("https://backend-00cc.onrender.com/recommend", {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });

  const movies = await res.json();
  const resultsDiv = document.getElementById('results');
  resultsDiv.innerHTML = "";

  movies.forEach(m => {
    resultsDiv.innerHTML += `
      <div class="bg-white rounded shadow p-4">
        <img src="${m.poster}" alt="${m.title}" class="rounded mb-2">
        <h2 class="text-lg font-semibold">${m.title} (${m.year})</h2>
        <p class="text-sm text-gray-600">${m.description}</p>
        <p class="text-yellow-500 mt-2">⭐ ${m.rating}</p>
      </div>
    `;
  });
});
