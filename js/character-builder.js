// Bonus interactive component: simple Alterra character starter generator

const names = {
    Human: ["Adrian Valebrook", "Lyra Ashford", "Elias Castellan"],
    Dwarf: ["Rhys Silverhall", "Nia Copperhearth", "Seren Ironside"],
    Orc: ["Kabir Stormchaser", "Aanya Stonecleaver", "Priya Shadowstalker"],
    Halfling: ["Orion Riverrunner", "Astra Seabrook", "Nova Bareboat"],
    Ormyri: ["Zephyr Crimson", "Ember Saffron", "Cascade Azure"]
};

const archetypes = {
    Human: ["Diplomat", "Pioneer", "Vanguard"],
    Dwarf: ["Hearthkeeper", "Virtuoso", "Stalwart"],
    Orc: ["Nemophilist", "Hospitalier", "Condottiere"],
    Halfling: ["Historian", "Supplier", "Trailblazer"],
    Ormyri: ["Dragonguard", "Skyrider", "Emberwright"]
};

const guilds = ["Church Orders", "Arena Guilds", "Arcane Societies", "Grand Masques", "Concordance Movement"];

function randomItem(list) {
    return list[Math.floor(Math.random() * list.length)];
}

function buildCharacter() {
    const ancestry = document.getElementById("ancestry").value;
    const result = document.getElementById("character-result");

    if (!ancestry) {
        result.innerHTML = "<strong>Archive Error:</strong> Select an ancestry to generate a character starter.";
        return;
    }

    const characterName = randomItem(names[ancestry]);
    const archetype = randomItem(archetypes[ancestry]);
    const guild = randomItem(guilds);

    result.innerHTML = `
        <h3>${characterName}</h3>
        <p><strong>Ancestry:</strong> ${ancestry}</p>
        <p><strong>Ancestral Archetype:</strong> ${archetype}</p>
        <p><strong>Suggested Guild:</strong> ${guild}</p>
        <p><strong>Story Hook:</strong> This character has recently arrived in Union City seeking work, belonging, and a chance to leave a mark on the Federation.</p>
    `;
}

document.addEventListener("DOMContentLoaded", () => {
    const button = document.getElementById("generate-character");
    if (button) {
        button.addEventListener("click", buildCharacter);
    }
});
