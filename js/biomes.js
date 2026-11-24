import { hamburgerButton } from "./HamburgerButton.mjs";

hamburgerButton();

const modal = document.getElementById('modal');
const modalContent = document.getElementById('modalContent');
const closeModal = document.getElementById('closeModal');

closeModal.addEventListener('click', () => modal.close());
modal.addEventListener('click', (e) => {
    if (e.targert === modal) modal.style.display = 'none';
});

async function getData() {
    const url = `https://api.astroworldmc.com/api/v1/biomes`;
    const biomeCard = document.getElementById('biomeCard');

    try {
        const response = await fetch(url);
        const data = await response.json();
        const items = Array.isArray(data) ? data : (data.data);

        console.log(data);

        biomeCard.innerHTML = '';

        // Note: If your array is nested (e.g., data.results), use data.results.forEach(...)
        items.forEach(entry => {
            const item = document.createElement('div');
            const image = document.createElement('img');
            const fileName = entry.name.toLowerCase().replace(/\s+/g, '-');
            const imagePath = `./images/biomes/${fileName}.webp`;

            item.classList.add('biome-entry');
            image.classList.add('biome-image');

            image.src = imagePath;
            image.alt = entry.name;
            image.loading = 'lazy';

            item.innerHTML = `
            <h3>${entry.name}</h3>
            <p>Dimension: ${entry.dimension}</p>
            `;

            item.appendChild(image)

            item.addEventListener('click', () => {
                const mobsList = entry.spawningMobs.join('<br>');
                const structuresList = entry.structuresFound.join('<br>');
                const terrainList = entry.terrainFeatures.join('<br>');
                const blocksList = entry.uniqueBlocks.join('<br>');

                modalContent.innerHTML = `
                <h2>${entry.name}</h2>
                <img src="${imagePath}" alt="${entry.name}" class="modal-image">
                <p><strong>Dimension:</strong> ${entry.dimension}</p>
                <p><strong>Category:</strong> ${entry.category}</p>
                <p><strong>Precipitation:</strong> ${entry.precipitation}</p>
                <p><strong>Spawning Mobs:<br></strong>${mobsList || 'None'}</p>
                <p><strong>Structures Found:<br></strong>${structuresList || 'None'}</p>
                <p><strong>Terrain Features:<br></strong>${terrainList || 'None'}</p>
                <p><strong>Unique Blocks:<br></strong>${terrainList || 'None'}</p>
                `;
                
                modal.showModal();
            });

            biomeCard.appendChild(item);
        });
    } catch (error) {
        console.error('Error fetching API:', error);
    }
}

getData();