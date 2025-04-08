const container = document.getElementById("character-container");

fetch("https://rickandmortyapi.com/api/character")
    .then((response) => response.json())
    .then((data) => {
        data.results.forEach((character) => {
            const characterCard = document.createElement("div");
            characterCard.classList.add("character-card");
            characterCard.classList.add(character.status);

            const characterImage = document.createElement("img");
            characterImage.src = character.image;
            characterImage.alt = character.name;

            const characterName = document.createElement("h2");
            characterName.textContent = character.name;

            const characterSpecies = document.createElement("p");
            characterSpecies.textContent = `Species: ${character.species}`;

            const characterStatus = document.createElement("p");
            characterStatus.textContent = `Status: ${character.status}`;
            characterStatus.classList.add('status', `status-${character.status}`);

            characterCard.appendChild(characterImage);
            characterCard.appendChild(characterName);
            characterCard.appendChild(characterSpecies);
            characterCard.appendChild(characterStatus);

            container.appendChild(characterCard);
        });
    })
    .catch((error) => {
        console.error("Error fetching data:", error);
    });
