import { hamburgerButton } from "./HamburgerButton.mjs";

hamburgerButton();

async function getData() {
    const url = `https://api.astroworldmc.com/api/v1/enchantments`;
    const enchantmentCard = document.getElementById('enchantmentCard');

    try {
        const response = await fetch(url);
        const data = await response.json();
        const items = Array.isArray(data) ? data : (data.data);

        console.log(data);

        enchantmentCard.innerHTML = '';

        // Note: If your array is nested (e.g., data.results), use data.results.forEach(...)
        items.forEach(entry => {
            const item = document.createElement('div');

            item.classList.add('enchantment-entry');

            item.innerHTML = `
            <h3>${entry.name}</h3>
            <p>Category: ${entry.category}</p>
            `;

            enchantmentCard.appendChild(item);
        });
    } catch (error) {
        console.error('Error fetching API:', error);
    }
}

getData();