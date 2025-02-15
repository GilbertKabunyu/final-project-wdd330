document.getElementById('search-button').addEventListener('click', searchBooks);
document.getElementById('close-modal').addEventListener('click', closeModal);

async function searchBooks() {
    const query = document.getElementById('search-input').value;
    if (!query) {
        alert('Please enter a search term.');
        return;
    }

    const resultsContainer = document.getElementById('results');
    resultsContainer.innerHTML = '<p>Loading...</p>';

    try {
        const response = await fetch(`https://openlibrary.org/search.json?q=${encodeURIComponent(query)}`);
        const data = await response.json();

        if (data.docs.length === 0) {
            resultsContainer.innerHTML = '<p>No books found.</p>';
            return;
        }

        resultsContainer.innerHTML = '';
        data.docs.slice(0, 10).forEach(book => {
            const bookElement = document.createElement('div');
            bookElement.className = 'book';

            const title = book.title || 'No Title';
            const author = book.author_name ? book.author_name.join(', ') : 'Unknown Author';
            const coverId = book.cover_i;
            const coverUrl = coverId ? `https://covers.openlibrary.org/b/id/${coverId}-M.jpg` : 'https://via.placeholder.com/150x200?text=No+Cover';
            const bookId = book.key;

            bookElement.innerHTML = `
            <img src="${coverUrl}" alt="${title}">
            <h3>${title}</h3>
            <p>By ${author}</p>
          `;

            bookElement.addEventListener('click', () => fetchReviews(bookId, title));
            resultsContainer.appendChild(bookElement);
        });
    } catch (error) {
        resultsContainer.innerHTML = '<p>Error fetching books. Please try again.</p>';
        console.error(error);
    }
}

async function fetchReviews(bookId, title) {
    const reviewsModal = document.getElementById('reviews-modal');
    const reviewsTitle = document.getElementById('reviews-title');
    const reviewsList = document.getElementById('reviews-list');

    reviewsTitle.textContent = `Reviews for "${title}"`;
    reviewsList.innerHTML = '<p>Loading reviews...</p>';
    reviewsModal.style.display = 'flex';

    try {
        const response = await fetch(`https://openlibrary.org${bookId}.json`);
        const data = await response.json();

        if (data.description) {
            reviewsList.innerHTML = `
            <div class="review">
              <p><strong>Description:</strong> ${data.description.value || data.description}</p>
            </div>
          `;
        } else {
            reviewsList.innerHTML = '<p>No reviews available.</p>';
        }
    } catch (error) {
        reviewsList.innerHTML = '<p>Error fetching reviews. Please try again.</p>';
        console.error(error);
    }
}

function closeModal() {
    document.getElementById('reviews-modal').style.display = 'none';
}