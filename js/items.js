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
            const imagePath = `./images/items/${fileName}.webp`;

            item.classList.add('mob-entry');
            image.classList.add('mob-image');

            image.src = imagePath;
            image.alt = entry.name;
            image.loading = 'lazy';

            item.innerHTML = `
            <h3>${entry.name}</h3>
            <p>Type: ${entry.type}</p>
            `;

            item.appendChild(image);

            item.addEventListener('click', () => {

                modalContent.innerHTML = `
                <h2>${entry.name}</h2>
                <img src="${imagePath}" alt="${entry.name}" class="modal-image">
                <p><strong>Description</strong> ${entry.description}</p>
                <p><strong>Durability:</strong> ${entry.durability}</p>
                ${entry.foodValue ? `<p><strong>Hunger Value:</strong> ${entry.foodValue.hunger}</p>` : ''}
                ${entry.foodValue ? `<p><strong>Saturation Value:</strong> ${entry.foodValue.saturation}</p>` : ''}
                ${entry.fuelValue ? `<p><strong>Fuel Value:</strong> ${entry.fuelValue}</p>` : ''}
                ${entry.enchantable ? `<p><strong>Enchantable:</strong> ${entry.enchantable}</p>` : ''}
                <p><strong>Notes:</strong> ${entry.notes}</p>
                `;
                modal.showModal();
            });

            itemCard.appendChild(item);
        });
    } catch (error) {
        console.error('Error fetching API:', error);
    }
}

getData();