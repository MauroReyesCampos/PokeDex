let pokeDexNames = {};
let pokeDexTypes = {};

async function getPokemonNames() {
    try {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon/');
        const data = await response.json();
        pokeDexNames = data;
        const names = pokeDexNames.results;
        let i = 1;
        names.forEach(index => {
            let pokeName = index.name;
            let cardTitleIndex = "card-title-" + i;
            let cardTitle = document.getElementById(cardTitleIndex);
            cardTitle.innerText = pokeName;
            getPokemonTypes(pokeName, i);
            i++;
        });
    } catch {
        console.log("Error: " + error);
    }
}

async function getPokemonTypes(name, index) {
    try {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon/' + name);
        const dataType = await response.json();
        pokeDexTypes = dataType;
        const types = pokeDexTypes.types;
        let divId = "pokemonType-" + index;
        const div = document.getElementById(divId);
        types.forEach(element => {
            let pokeType = element.type.name;
            const divType = document.createElement("div");
            divType.className = "pb-xxl-3 text-capitalize";
            divType.innerText = String(pokeType);
            div.appendChild(divType);
            console.log(pokeType);
        });
    } catch {
        console.log("Error: " + error);
    }
}

getPokemonNames();