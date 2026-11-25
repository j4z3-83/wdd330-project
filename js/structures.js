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
            const imagePath = `./images/structures/${fileName}.webp`;

            item.classList.add('structure-entry');
            image.classList.add('structure-image');

            image.src = imagePath;
            image.alt = entry.name
            image.loading = 'lazy';

            item.innerHTML = `
            <h3>${entry.name}</h3>
            <p>Dimension: ${entry.dimension}</p>
            `;

            item.appendChild(image)

            item.addEventListener('click', () => {
                const featuresList = entry.features.join('<br>');
                const dangersList = entry.dangers.join('<br>');
                const mobsList = entry.hostileMobs.join('<br>');
                const rewardsList = entry.rewards.join('<br>');
                const lootList = entry.loot
                    .map(loot => `${(loot.chance * 100).toFixed(0)}% chance ${loot.item} (${loot.count.min} - ${loot.count.max})`)
                    .join('<br>');

                modalContent.innerHTML = `
                <h2>${entry.name}</h2>
                <img src="${imagePath}" alt="${entry.name}" class="modal-image">
                <p><strong>Dimension:</strong> ${entry.dimension}</p>
                <p><strong>Features:<br></strong>${featuresList || 'None'}</p>
                <p><strong>Dangers:<br></strong>${dangersList || 'None'}</p>
                <p><strong>Hostile Mobs:<br></strong>${mobsList || 'None'}</p>
                <p><strong>Rewards:<br></strong>${rewardsList || 'None'}</p>
                <p><strong>Loot:<br></strong>${lootList || 'None'}</p>
                `;
                modal.showModal();
            });

            structureCard.appendChild(item);
        });
    } catch (error) {
        console.error('Error fetching API:', error);
    }
}

getData();