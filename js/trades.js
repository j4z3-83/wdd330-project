import { HamburgerButton } from "./HamburgerButton.mjs";

HamburgerButton();

async function getData() {
    const url = `https://api.astroworldmc.com/api/v1/trades`;
    const tradeCard = document.getElementById('tradeCard');

    try {
        const response = await fetch(url);
        const data = await response.json();
        const items = Array.isArray(data) ? data : (data.data);

        console.log(data)

        tradeCard.innerHTML = '';

        // Note: If your array is nested (e.g., data.results), use data.results.forEach(...)
        items.forEach(entry => {
            const item = document.createElement('div');
            const image = document.createElement('img');
            const fileName = entry.name.toLowerCase().replace(/\s+/g, '-');

            item.classList.add('trade-entry');
            image.classList.add('trade-image');

            image.src = `./images/trades/${fileName}.webp`;
            image.alt = entry.name

            item.innerHTML = `
            <h3>${entry.name}</h3>
            <p>Workstation: ${entry.workstation}</p>
            `;

            item.appendChild(image)
            tradeCard.appendChild(item);
        });
    } catch (error) {
        console.error('Error fetching API:', error);
    }
}

getData();