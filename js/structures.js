import { HamburgerButton } from "./HamburgerButton.mjs";

HamburgerButton();

async function getData() {
    const url = `https://api.astroworldmc.com/api/v1/structures`;
    const structureCard = document.getElementById('structureCard');

    try {
        const response = await fetch(url);
        const data = await response.json();
        const items = Array.isArray(data) ? data : (data.data);

        console.log(data)

        structureCard.innerHTML = '';

        // Note: If your array is nested (e.g., data.results), use data.results.forEach(...)
        items.forEach(entry => {
            const item = document.createElement('div');
            const image = document.createElement('img');
            const fileName = entry.name.toLowerCase().replace(/\s+/g, '-');

            item.classList.add('structure-entry');
            image.classList.add('structure-image');

            image.src = `./images/structures/${fileName}.webp`;
            image.alt = entry.name

            item.innerHTML = `
            <h3>${entry.name}</h3>
            <p>Dimension: ${entry.dimension}</p>
            `;

            item.appendChild(image)
            structureCard.appendChild(item);
        });
    } catch (error) {
        console.error('Error fetching API:', error);
    }
}

getData();