import { HamburgerButton } from "./HamburgerButton.mjs";

HamburgerButton();

async function getData() {
    const url = `https://api.astroworldmc.com/api/v1/biomes`;
    const mobCard = document.getElementById('biomeCard');

    try {
        const response = await fetch(url);
        const data = await response.json();
        const items = Array.isArray(data) ? data : (data.data);

        console.log(data)
        mobCard.innerHTML = '';

        // Note: If your array is nested (e.g., data.results), use data.results.forEach(...)
        items.forEach(entry => {
            const item = document.createElement('div');
            const image = document.createElement('img');
            const fileName = entry.name.toLowerCase().replace(/\s+/g, '-');


            item.classList.add('biome-entry');
            image.classList.add('biome-image');

            image.src = `./images/biomes/${fileName}.webp`;
            image.alt = entry.name

            item.innerHTML = `
            <h2>${entry.name}</h2>
            <p>Dimension: ${entry.dimension}</p>
            `;

            item.appendChild(image)
            mobCard.appendChild(item);
        });
    } catch (error) {
        console.error('Error fetching API:', error);
    }
}

getData();