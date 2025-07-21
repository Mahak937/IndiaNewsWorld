const apiKey = '09826bdccddf446b8fc6246aae9aee4b';
const highlightDiv = document.getElementById('highlightNews');
const newsContainer = document.getElementById('newsContainer');
const regionSelect = document.getElementById('newsRegion');

// Load both highlights and today's news
function loadAllNews() {
  loadTodaysHighlights();
  loadTodaysNews();
}
const spinner = document.getElementById('loadingSpinner');

// Load top highlight news
async function loadTodaysHighlights() {
  const region = regionSelect.value;
  const url = region
    ? `https://newsapi.org/v2/top-headlines?country=${region}&pageSize=1&apiKey=${apiKey}`
    : `https://newsapi.org/v2/top-headlines?language=en&pageSize=1&apiKey=${apiKey}`;

  try {
    const res = await fetch(url);
    const data = await res.json();
    const highlight = data.articles[0];

    highlightDiv.innerHTML = `
      <div class="highlight-card">
        <img src="${highlight.urlToImage || 'https://via.placeholder.com/600x300'}" alt="News image">
        <div>
          <h2>${highlight.title}</h2>
          <p>${highlight.description || 'No description available.'}</p>
          <a href="${highlight.url}" target="_blank">Read Full Article</a>
        </div>
      </div>
    `;
  } catch (err) {
    highlightDiv.innerHTML = `<p>⚠️ Could not load highlight news.</p>`;
  }
}

// Load more top news
async function loadTodaysNews() {
  const region = regionSelect.value;
  const url = region
    ? `https://newsapi.org/v2/top-headlines?country=${region}&pageSize=6&apiKey=${apiKey}`
    : `https://newsapi.org/v2/top-headlines?language=en&pageSize=6&apiKey=${apiKey}`;

  try {
    const res = await fetch(url);
    const data = await res.json();
    newsContainer.innerHTML = "";

    data.articles.forEach(article => {
      const card = document.createElement("div");
      card.className = "news-card";
      card.innerHTML = `
        <img src="${article.urlToImage || 'https://via.placeholder.com/400x200'}" alt="News">
        <h3>${article.title}</h3>
        <p>${article.description || 'No description available.'}</p>
        <a href="${article.url}" target="_blank">Read More</a>
      `;
      newsContainer.appendChild(card);
    });
  } catch (err) {
    newsContainer.innerHTML = `<p>⚠️ Could not load news articles.</p>`;
  }
}

// Region switch listener
regionSelect.addEventListener('change', loadAllNews);

// Load initially
loadAllNews();
async function loadTodaysHighlights() {
  const region = regionSelect.value;
  const url = region
    ? `https://newsapi.org/v2/top-headlines?country=${region}&pageSize=1&apiKey=${apiKey}`
    : `https://newsapi.org/v2/top-headlines?language=en&pageSize=1&apiKey=${apiKey}`;

  try {
    spinner.classList.remove('hidden');
    const res = await fetch(url);
    const data = await res.json();
    spinner.classList.add('hidden');
  
  } catch (err) {
    spinner.classList.add('hidden');

  }
}
// Auto refresh every 15 minutes (900000 ms)
setInterval(() => {
  loadAllNews();
}, 900000); // 15 minutes

const today = new Date().toISOString().split("T")[0];
const tenDaysAgo = new Date(Date.now() - 10 * 86400000).toISOString().split("T")[0];

const url = `https://newsapi.org/v2/everything?q=india&from=${tenDaysAgo}&to=${today}&sortBy=publishedAt&language=en&apiKey=${apiKey}`;

