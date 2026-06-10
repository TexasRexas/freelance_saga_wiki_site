// Interactive component: Federation Freelancer License Builder

const guildRanks = {
    "Church Orders": ["Acolyte – Deacon", "Theurge – Evangelist", "Champion – Langrave", "Warden – Page"],
    "Arena Guilds": ["Brawler – Pitborn", "Duelist – Cadet", "Icon – Prospect", "Reaver – Hound"],
    "Arcane Societies": ["Scholar – Apprentice", "Magister – Scribe", "Luminary – Fellow", "Arbiter – Examiner"],
    "Grand Masques": ["Player – Extra", "Gallant – Courtier", "Virtuoso – Trouper", "Shadow – Stagehand"],
    "Concordance Movement": ["Kindled – Awakened", "Advocate – Organizer", "Herald – Voice", "Guardian – Shieldbearer"],
    "Freelancer Association": ["Prospect – Applicant", "Specialist – Associate", "Party Lead – Lead", "Guild Exemplar – Proctor"]
};

const freelancerRanks = [
    "Prospect – Applicant",
    "Prospect – Initiate",
    "Prospect – Junior Freelancer",
    "Specialist – Associate",
    "Specialist – Specialist",
    "Party Lead – Lead",
    "Party Lead – Contract Captain",
    "Guild Exemplar – Proctor"
];

function populateSelect(select, options, placeholder) {
    select.innerHTML = "";
    const first = document.createElement("option");
    first.value = "";
    first.textContent = placeholder;
    select.appendChild(first);

    options.forEach(optionText => {
        const option = document.createElement("option");
        option.value = optionText;
        option.textContent = optionText;
        select.appendChild(option);
    });
}

function updateGuildRanks() {
    const guild = document.getElementById("builder-guild").value;
    const guildRank = document.getElementById("builder-guild-rank");

    if (guild && guildRanks[guild]) {
        populateSelect(guildRank, guildRanks[guild], "Choose a guild rank");
    } else {
        populateSelect(guildRank, [], "Choose a guild first");
    }
}

function readPortraitUpload(event) {
    const file = event.target.files[0];
    const preview = document.getElementById("builder-photo-preview");

    if (!file) {
        preview.src = "images/characters/placeholder.svg";
        return;
    }

    const reader = new FileReader();
    reader.onload = () => {
        preview.src = reader.result;
    };
    reader.readAsDataURL(file);
}

function generateLicense(event) {
    event.preventDefault();

    const data = {
        name: document.getElementById("builder-name").value.trim() || "Unnamed Freelancer",
        age: document.getElementById("builder-age").value.trim() || "Unknown",
        race: document.getElementById("builder-race").value.trim() || "Unlisted",
        archetype: document.getElementById("builder-archetype").value.trim() || "Unlisted",
        gender: document.getElementById("builder-gender").value.trim() || "Unlisted",
        guild: document.getElementById("builder-guild").value || "Independent",
        guildRank: document.getElementById("builder-guild-rank").value || "Unranked",
        freelancerRank: document.getElementById("builder-freelancer-rank").value || "Unranked",
        photo: document.getElementById("builder-photo-preview").src
    };

    const output = document.getElementById("generated-license");

    output.innerHTML = `
        <div class="license-card generated-license-card">
            <div class="license-topline">
                <div>
                    <h2>Federation Freelancer License</h2>
                    <p>Union City Freelancer Association Identification Record</p>
                </div>
            </div>

            <div class="license-content">
                <div class="license-photo-frame">
                    <img class="license-photo" src="${data.photo}" alt="${data.name} uploaded license portrait">
                </div>

                <div class="license-details">
                    <div class="license-field">
                        <span class="license-label">Name</span>
                        <span class="license-value">${data.name}</span>
                    </div>
                    <div class="license-field">
                        <span class="license-label">Age</span>
                        <span class="license-value">${data.age}</span>
                    </div>
                    <div class="license-field">
                        <span class="license-label">Race</span>
                        <span class="license-value">${data.race}</span>
                    </div>
                    <div class="license-field">
                        <span class="license-label">Archetype</span>
                        <span class="license-value">${data.archetype}</span>
                    </div>
                    <div class="license-field">
                        <span class="license-label">Gender</span>
                        <span class="license-value">${data.gender}</span>
                    </div>
                    <div class="license-field full">
                        <span class="license-label">Guild Affiliation</span>
                        <span class="license-value">${data.guild}</span>
                    </div>
                    <div class="license-field">
                        <span class="license-label">Guild Rank</span>
                        <span class="license-value">${data.guildRank}</span>
                    </div>
                    <div class="license-field">
                        <span class="license-label">Freelancer Rank</span>
                        <span class="license-value">${data.freelancerRank}</span>
                    </div>
                </div>
            </div>

            <div class="license-stamp">Generated Freelancer Record</div>
        </div>
    `;
}

document.addEventListener("DOMContentLoaded", () => {
    const guildSelect = document.getElementById("builder-guild");
    const guildRankSelect = document.getElementById("builder-guild-rank");
    const freelancerSelect = document.getElementById("builder-freelancer-rank");
    const portraitUpload = document.getElementById("builder-photo");
    const form = document.getElementById("license-builder-form");

    if (guildRankSelect) {
        populateSelect(guildRankSelect, [], "Choose a guild first");
    }

    if (freelancerSelect) {
        populateSelect(freelancerSelect, freelancerRanks, "Choose a freelancer rank");
    }

    if (guildSelect) {
        guildSelect.addEventListener("change", updateGuildRanks);
    }

    if (portraitUpload) {
        portraitUpload.addEventListener("change", readPortraitUpload);
    }

    if (form) {
        form.addEventListener("submit", generateLicense);
    }
});
