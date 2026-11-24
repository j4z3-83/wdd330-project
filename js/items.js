import { hamburgerButton } from "./HamburgerButton.mjs";

hamburgerButton();

async function getData() {
    const url = `https://api.astroworldmc.com/api/v1/items`;
    const itemCard = document.getElementById('itemCard');

    try {
        const response = await fetch(url);
        const data = await response.json();
        const items = Array.isArray(data) ? data : (data.data);

        console.log(data);

        itemCard.innerHTML = '';

        // Note: If your array is nested (e.g., data.results), use data.results.forEach(...)
        items.forEach(entry => {
            const item = document.createElement('div');
            const image = document.createElement('img');
            const fileName = entry.name.toLowerCase().replace(/\s+/g, '-');

            item.classList.add('mob-entry');
            image.classList.add('mob-image');

            image.src = `./images/items/${fileName}.webp`;
            image.alt = entry.name;
            image.loading = 'lazy';

            item.innerHTML = `
            <h3>${entry.name}</h3>
            <p>Type: ${entry.type}</p>
            `;

            item.appendChild(image);
            itemCard.appendChild(item);
        });
    } catch (error) {
        console.error('Error fetching API:', error);
    }
}

getData();