const body = document.getElementById("body");
const mainSection = document.getElementById("main-section");
const floatSection = document.getElementById("float-section");
const cards = document.getElementById("cards");
const pokemonTitle= document.getElementById("pokemon-title");
const pokemonId = document.getElementById("pokemon-id");
const pokemonImg = document.getElementById("pokemon-img");
const pokemonBase = document.getElementById("base");
const pokemonHeight = document.getElementById("height");
const pokemonSpecies = document.getElementById("species")
const pokemonWeight = document.getElementById("weight");
const pokemonAbilities = document.getElementById("abilities");
const pokemonTypes = document.getElementById("types");
const pokemonStats = document.getElementById("stats");
const pokemonSearch = document.getElementById("pokemonSearchInput");
const pokemonButton = document.getElementById("pokemonSearchButton");

let pokeDexNames = {};
let pokeDexInfo = {};

function pokemonSearchInfo() {
    let pokeSearch = pokemonSearch.value;
    getPokemonInfo(pokeSearch);
}

async function getPokemonNames() {
    try {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon/');
        const data = await response.json();
        pokeDexNames = data;
        const names = pokeDexNames.results;
        let imgIndex = 1;
        names.forEach(index => {
            let pokeName = index.name;
            createPokemonCard(pokeName, imgIndex);
            imgIndex++;
        });
    } catch(error) {
        console.log("Error: " + error);
    }
}

async function getPokemonInfo(name) {
    try {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon/' + name);
        const dataType = await response.json();
        pokeDexInfo = dataType;
        const pokemonInfo = pokeDexInfo;
        createPokemonDetail(pokemonInfo);
    } catch(error) {
        console.log("Error: " + error);
    }
}

function createPokemonCard(name, i) {
    const pokeCol = document.createElement("div");
    const pokeLink = document.createElement("a");
    const pokeCard = document.createElement("div");
    const pokeImg = document.createElement("img");
    const pokeCardBody = document.createElement("div");
    const pokeCardTitle = document.createElement("h5");

    pokeCol.className = "col pt-2 pb-2 pt-xxl-3 pb-xxl-3";
    pokeLink.className = "link text-decoration-none text-reset";
    pokeLink.href = "#";
    pokeCard.className = "card ms-0";
    pokeImg.src = "./assets/img/pokemon/" + i + ".png";
    pokeImg.className = "card-img-top";
    pokeCardBody.className = "card-body";
    pokeCardTitle.className = "card-title text-uppercase fw-bold"
    pokeCardTitle.innerText = name;

    cards.appendChild(pokeCol);
    pokeCol.appendChild(pokeLink);
    pokeLink.appendChild(pokeCard);
    pokeCard.appendChild(pokeImg);
    pokeCard.appendChild(pokeCardBody);
    pokeCardBody.appendChild(pokeCardTitle);

    const pokemonLink = document.querySelectorAll('a.link');
    pokemonLink.forEach(element => {
    element.classList.add('pe-auto')
    });

    pokeLink.onclick = function() {getPokemonInfo(name)};
    pokemonButton.onclick = function() {pokemonSearchInfo()};
}

function createPokemonDetail(pInfo) {
    floatSection.style.visibility = "visible";
    pokemonTitle.innerText = pInfo.name;
    pokemonId.innerText = "ID: " + pInfo.id;
    pokemonImg.src = "./assets/img/pokemon/" + pInfo.id + ".png";
    pokemonBase.innerText = pInfo.base_experience;
    pokemonHeight.innerText = pInfo.height;
    pokemonSpecies.innerText = pInfo.species.name;
    pokemonWeight.innerText = pInfo.weight;

    const abilitiesTitle = document.createElement("h5");
    abilitiesTitle.innerText = "Abilities:"
    pokemonAbilities.appendChild(abilitiesTitle);
    const abilities = pInfo.abilities;
    abilities.forEach(index => {
        let pokeAbility = index.ability.name;
        const ability = document.createElement("div");
        ability.className = "abilities text-capitalize";
        ability.innerText = pokeAbility;
        pokemonAbilities.appendChild(ability);
    });

    const typesTitle = document.createElement("h5");
    typesTitle.innerText = "Types:"
    pokemonTypes.appendChild(typesTitle);
    const types = pInfo.types;
    types.forEach(element => {
        let pokeType = element.type.name;
        const type = document.createElement("div");
        type.className = "types text-capitalize";
        type.innerText = pokeType;
        pokemonTypes.appendChild(type);
    });

    const statsTitle = document.createElement("h5");
    statsTitle.innerText = "Stats:"
    pokemonStats.appendChild(statsTitle);
    const stats = pInfo.stats;
    stats.forEach(element => {
        let pokeStatName = element.stat.name;
        let pokeStat = element.base_stat;
        const statName = document.createElement("div");
        statName.className = "stats text-capitalize pb-xxl-3";
        statName.innerText = pokeStatName; //+ ": " + pokeStat;
        pokemonStats.appendChild(statName);
        const statBar = document.createElement("div");
        statBar.className = "progress";
        statBar.role = "progressbar";
        statBar.ariaLabel = "Stat";
        statBar.ariaValueNow = pokeStat;
        statBar.ariaValueMin = "0";
        statBar.ariaValueMax = "100";
        statName.appendChild(statBar);
        const statProgress = document.createElement("div");
        statProgress.className = "progress-bar bg-danger";
        statProgress.style.width = pokeStat + "%";
        statProgress.innerText = pokeStat + "%";
        statBar.appendChild(statProgress);
    });
    const pokemonLink = document.querySelectorAll('a.link');
    pokemonLink.forEach(element => {
    element.classList.replace('pe-auto', 'pe-none')
    });
    
    const close = document.getElementById("close-button");
    close.onclick = function() {closePokemonDetail()};
}

function closePokemonDetail() {
    floatSection.style.visibility = "hidden";
    body.style.overflow = "visible";
    pokemonSearch.value = ""
    const pokemonAbilities = document.getElementById("abilities");
    const pokemonTypes = document.getElementById("types");
    const pokemonStats = document.getElementById("stats");

    while (pokemonAbilities.hasChildNodes()) {
        pokemonAbilities.removeChild(pokemonAbilities.firstChild);
    }

    while (pokemonTypes.hasChildNodes()) {
        pokemonTypes.removeChild(pokemonTypes.firstChild);
    }

    while (pokemonStats.hasChildNodes()) {
        pokemonStats.removeChild(pokemonStats.firstChild);
    }

    const pokemonLink = document.querySelectorAll('a.link');
    pokemonLink.forEach(element => {
    element.classList.add('pe-auto')
    });
}

getPokemonNames();
