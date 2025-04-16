let currentPage = 1;
const container = document.getElementById("character-container");
const maxPages = 42;

function fetchCharacters(page) {
    container.innerHTML = '<div class="loading">Загрузка персонажей...</div>';

    fetch(`https://rickandmortyapi.com/api/character?page=${page}`)
        .then(response => response.json())
        .then(data => {
            container.innerHTML = '';

            data.results.forEach(character => {
                const characterCard = document.createElement("div");
                characterCard.classList.add("character-card", character.status.toLowerCase());

                const characterImage = document.createElement("img");
                characterImage.src = character.image;
                characterImage.alt = character.name;
                characterImage.classList.add('character-image');

                const characterName = document.createElement("h2");
                characterName.textContent = character.name;

                const characterSpecies = document.createElement("p");
                characterSpecies.textContent = `Вид: ${character.species}`;


                const characterStatus = document.createElement("p");
                characterStatus.textContent = `Статус: ${character.status}`;
                characterStatus.classList.add('status', `status-${character.status.toLowerCase()}`);

                characterCard.appendChild(characterImage);
                characterCard.appendChild(characterName);
                characterCard.appendChild(characterSpecies);
                characterCard.appendChild(characterStatus);

                container.appendChild(characterCard);
            });

            updatePagination(data.info);
        })
        .catch(error => {
            console.error("Ошибка загрузки:", error);
            container.innerHTML = '<div class="error">Произошла ошибка при загрузке данных</div>';
        });
}

function updatePagination(info) {
    const paginationContainer = document.querySelector('.pagination') || document.createElement('div');
    paginationContainer.className = 'pagination';

    paginationContainer.innerHTML = `
        <button class="pagination-button" onclick="changePage('prev')">
            Предыдущая
        </button>
        <span class="page-number">Страница ${currentPage} из ${maxPages}</span>
        <button class="pagination-button" onclick="changePage('next')">
            Следующая
        </button>
    `;

    if (!document.querySelector('.pagination')) {
        document.body.appendChild(paginationContainer);
    }
}

function changePage(direction, totalPages) {
    if (direction === 'prev') {
        currentPage = currentPage > 1 ? currentPage - 1 : maxPages;
    } else if (direction === 'next') {
        currentPage = currentPage < maxPages ? currentPage + 1 : 1;
    }
    fetchCharacters(currentPage);
}

document.addEventListener('DOMContentLoaded', () => {
    fetchCharacters(currentPage);
});
