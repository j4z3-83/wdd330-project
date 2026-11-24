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
    const url = `https://api.astroworldmc.com/api/v1/enchantments`;
    const enchantmentCard = document.getElementById('enchantmentCard');

    try {
        const response = await fetch(url);
        const data = await response.json();
        const items = Array.isArray(data) ? data : (data.data);

        console.log(data);

        enchantmentCard.innerHTML = '';

        items.forEach(entry => {
            const item = document.createElement('div');
            const image = document.createElement('img');
            const imagePath = `./images/enchantments/enchanted-book.gif`;

            item.classList.add('enchantment-entry');
            image.classList.add('enchantment-image');

            image.src = imagePath;
            image.alt = entry.name;
            image.loading = 'lazy';

            item.innerHTML = `
            <h3>${entry.name}</h3>
            <p>Category: ${entry.category}</p>
            `;

            item.appendChild(image);

            item.addEventListener('click', () => {
                const effectList = entry.effectPerLevel.join('<br>');
                const incompatibleList = entry.incompatibleWith.join('<br>');
                const obtainList = entry.obtainedFrom.join('<br>');

                modalContent.innerHTML = `
                <h2>${entry.name}</h2>
                <img src="${imagePath}" alt="${entry.name}" class="modal-image">
                <p><strong>Category:</strong> ${entry.category}</p>
                <p><strong>Description:</strong> ${entry.description}</p>
                <p><strong>Max Level:</strong> ${entry.maxLevel}</p>
                <p><strong>Effect Per Level:<br></strong>${effectList || 'None'}</p>
                <p><strong>Incompatible With:<br></strong>${incompatibleList || 'None'}</p>
                <p><strong>Notes:</strong> ${entry.notes}</p>
                <p><strong>Obtain From:<br></strong>${obtainList || 'None'}</p>
                `;
                modal.showModal();
            });

            enchantmentCard.appendChild(item);
        });
    } catch (error) {
        console.error('Error fetching API:', error);
    }
}

getData();