async function fetchSportsNews() {
    const newsContainer = document.getElementById('news-container');
    newsContainer.innerHTML = '<p>Loading...</p>';
    const apiKey = '1a02941451dc4f859e812ea598a0c79b';

    try {
        const response = await fetch(`https://newsapi.org/v2/top-headlines?category=sports&apiKey=${apiKey}`);
        const data = await response.json();

        if (data.articles.length === 0) {
            newsContainer.innerHTML = '<p>No news found.</p>';
            return;
        }

        newsContainer.innerHTML = '';
        data.articles.slice(0, 10).forEach(article => {
            const articleElement = document.createElement('div');
            articleElement.className = 'article';

            const title = article.title || 'No Title';
            const description = article.description || 'No Description';
            const image = article.urlToImage || 'https://via.placeholder.com/300x200?text=No+Image';
            const url = article.url || '#';

            articleElement.innerHTML = `
          <img src="${image}" alt="${title}">
          <h3>${title}</h3>
          <p>${description}</p>
          <a href="${url}" target="_blank">Read more</a>
        `;

            newsContainer.appendChild(articleElement);
        });
    } catch (error) {
        newsContainer.innerHTML = '<p>Error fetching news. Please try again.</p>';
        console.error(error);
    }
}

fetchSportsNews();