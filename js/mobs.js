import { HamburgerButton } from "./HamburgerButton.mjs";

HamburgerButton();

async function getData() {
    const url = `https://api.astroworldmc.com/api/v1/mobs`;
    const mobCard = document.getElementById('mobCard');

    try {
        const response = await fetch(url);
        const data = await response.json();
        const items = Array.isArray(data) ? data : (data.data);

        console.log(data);

        mobCard.innerHTML = '';

        // Note: If your array is nested (e.g., data.results), use data.results.forEach(...)
        items.forEach(entry => {
            const item = document.createElement('div');
            const image = document.createElement('img');
            const fileName = entry.name.toLowerCase().replace(/\s+/g, '-');

            item.classList.add('mob-entry');
            image.classList.add('mob-image');

            image.src = `./images/mobs/${fileName}.webp`;
            image.alt = entry.name;
            image.loading = 'lazy';

            item.innerHTML = `
            <h3>${entry.name}</h3>
            <p>Type: ${entry.type}</p>
            `;

            item.appendChild(image);
            mobCard.appendChild(item);
        });
    } catch (error) {
        console.error('Error fetching API:', error);
    }
}

getData();
