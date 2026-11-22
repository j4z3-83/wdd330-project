import { HamburgerButton } from "./HamburgerButton.mjs";

HamburgerButton();

async function getData() {
    const url = 'https://api.astroworldmc.com/api/v1/mobs';

    try {
        const response = await fetch(url);
        const data = await response.json();
        console.log(data);
        
    } catch (error) {
        console.error('Error fetching API:', error);
    }
}

getData();

