document.getElementById('search-button').addEventListener('click', searchMovies);

async function searchMovies() {
    const query = document.getElementById('search-input').value;
    if (!query) {
        alert('Please enter a search term.');
        return;
    }

    const apikey = 'd0995219';
    const resultsContainer = document.getElementById('results');
    resultsContainer.innerHTML = '<p>Loading...</p>';

    try {
        const response = await fetch(`https://www.omdbapi.com/?s=${encodeURIComponent(query)}&apikey=${apikey}`);
        const data = await response.json();

        if (data.Response === 'False') {
            resultsContainer.innerHTML = '<p>No movies found.</p>';
            return;
        }

        resultsContainer.innerHTML = '';
        data.Search.slice(0, 10).forEach(movie => {
            const movieElement = document.createElement('div');
            movieElement.className = 'movie';

            const title = movie.Title || 'No Title';
            const year = movie.Year || 'Unknown Year';
            const poster = movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/150x200?text=No+Poster';

            movieElement.innerHTML = `
        <img src="${poster}" alt="${title}">
        <h3>${title}</h3>
        <p>${year}</p>
      `;

            resultsContainer.appendChild(movieElement);
        });
    } catch (error) {
        resultsContainer.innerHTML = '<p>Error fetching movies. Please try again.</p>';
        console.error(error);
    }
}