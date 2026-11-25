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
    const url = `https://api.astroworldmc.com/api/v1/trades`;
    const tradeCard = document.getElementById('tradeCard');

    try {
        const response = await fetch(url);
        const data = await response.json();
        const items = Array.isArray(data) ? data : (data.data);

        console.log(data)

        const trades = items.flatMap(villager =>
            villager.levels.flatMap(lvl =>
                lvl.trades.map(trade => ({
                    villager: villager.name,
                    level: lvl.name,
                    ...trade
                }))
            )
        );

        tradeCard.innerHTML = '';

        // Note: If your array is nested (e.g., data.results), use data.results.forEach(...)
        items.forEach(entry => {
            const item = document.createElement('div');
            const image = document.createElement('img');
            const fileName = entry.name.toLowerCase().replace(/\s+/g, '-');
            const imagePath = `./images/trades/${fileName}.webp`;

            item.classList.add('trade-entry');
            image.classList.add('trade-image');

            image.src = imagePath;
            image.alt = entry.name

            item.innerHTML = `
            <h3>${entry.name}</h3>
            <p>Workstation: ${entry.workstation}</p>
            `;

            item.appendChild(image)

            item.addEventListener('click', () => {


                const levelsList = entry.levels
                    .map(lvl => {
                        const matchingTrades = trades.filter(
                            t => t.villager === entry.name && t.level === lvl.name
                        );

                        const tradesHtml = matchingTrades.map(t => `
                            <li>You give ${JSON.stringify(t.givesAmount)}
                            ${JSON.stringify(t.gives)}. 
                            You recieves ${JSON.stringify(t.receivesAmount)} 
                            ${JSON.stringify(t.receives)}</li>`)
                            .join('');

                        return `
                            <div>
                                <strong>Level ${lvl.level}: ${lvl.name}</strong>
                                <ul>${tradesHtml}</ul>
                            </div>
                        `;
                    })
                    .join('');

                modalContent.innerHTML = `
                <h2>${entry.name}</h2>
                <img src="${imagePath}" alt="${entry.name}" class="modal-image">
                <p><strong>Description:</strong> ${entry.description}</p>
                <p><strong>Workstation:</strong> ${entry.workstation}</p>
                <p><strong>Trader Levels:<br></strong>${levelsList || 'None'}</p>
                `;

                modal.showModal();
            });

            tradeCard.appendChild(item);
        });
    } catch (error) {
        console.error('Error fetching API:', error);
    }
}

getData();