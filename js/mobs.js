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
            const imagePath = `./images/mobs/${fileName}.webp`;

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
                const dropsList = entry.drops
                    .map(drop => `${drop.chance}% chance ${drop.item} (${drop.count.min} - ${drop.count.max})`)
                    .join('<br>');
                const biomesList = entry.spawnBiomes
                    .join('<br>');

                modalContent.innerHTML = `
                <h2>${entry.name}</h2>
                <img src="${imagePath}" alt="${entry.name}" class="modal-image">
                <p><strong>HP:</strong> ${entry.hp}</p>
                <p><strong>Breedable:</strong> ${entry.breedable}</p>
                ${entry.breedable ? `<p><strong>Breeding item:</strong> ${entry.breedingItem}</p>` : ''}
                <p><strong>Spawn Biomes:<br></strong>${biomesList || 'None'}</p>
                <p><strong>XP drop:</strong> ${entry.xpDrop.min} - ${entry.xpDrop.max}</p>
                <p><strong>Item drops:<br></strong>${dropsList || 'None'}</p>
                `;
                modal.showModal();
            });

            mobCard.appendChild(item);
        });
    } catch (error) {
        console.error('Error fetching API:', error);
    }
}

getData();
