window.addEventListener("load", () => {
    const loader = document.querySelector(".loader");
  
    loader.classList.add("loader--hidden");
  
    loader.addEventListener("transitionend", () => {
        loader.classList.add("loader--hidden");
    });
  });
  


let currentPokemon;
let myArray =[];

async function init (){

    let content = document.getElementById('pokemonsContainer');
    
    let url=`https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0`;
    let response = await fetch(url);
    currentPokemon = await response.json();

    let pokemonArray = currentPokemon.results;
    myArray = [...pokemonArray];
    myArray.forEach((item)=> {
        const {name,url} = item;
    })

    console.log(myArray);
    for (let index = 0; index < 100; index++) {
        const element = pokemonArray[index].name;
        
        const url = pokemonArray[index].url;
        
        const response = await fetch(url);
        currentPokemon = await response.json();
        
        const nameOfPokemon = currentPokemon.name;
        const pokemonId = currentPokemon.id;
        const img = currentPokemon.sprites.other["official-artwork"].front_default;
        

        content.innerHTML += `
        <div class="miniContainer" id="${pokemonId}" onclick="loadPokemon(${pokemonId})">
            <div class="name-and-id">
                <h4>${nameOfPokemon.charAt(0).toUpperCase()+currentPokemon.name.slice(1)}</h4>
                <h4>#00${pokemonId}</h4>
            </div>
            <img src="${img}">
            <div class = "types2" id="pokemonTypes${pokemonId}"></div>
        </div>`;
        renderPokemonTypes2(pokemonId);

    }

}


function renderPokemonTypes2(id){
    let pokemonTypes = currentPokemon.types;
    
    for (let i = 0; i < pokemonTypes.length; i++) {
        const element = pokemonTypes[i];
        const typeName = element.type.name;
        changeBg(typeName, id);

        document.getElementById(`pokemonTypes${id}`).innerHTML += `
            <h6>${typeName.toString().charAt(0).toUpperCase()+typeName.toString().slice(1)}</h6>`;
    }
}

function changeBg(type,id){
    let typeName = type;
    if (typeName == "grass" || typeName == "bug"){
        document.getElementById(id).classList.add("green-bg");
    }else if(typeName == "fire") {
        document.getElementById(id).classList.add("red-bg");
    }else if(typeName == "water") {
        document.getElementById(id).classList.add("blue-bg");
    }else if (typeName =="flying"){
        document.getElementById(id).classList.add("flying-bg")
    }else if (typeName == "ground") {document.getElementById(id).classList.add("ground-bg")}
    else if (typeName == "poison") {document.getElementById(id).classList.add("red-bg")}
    else if (typeName == "electric") {document.getElementById(id).classList.add("electric-bg")
    document.getElementById('pokemonName').style="color:black;"}
    else if (typeName == "normal") {document.getElementById(id).classList.add("green-bg")}
    else if (typeName == "fairy") {document.getElementById(id).classList.add("fairy-bg")}
    else if (typeName == "fighting") {document.getElementById(id).classList.add("fighting-bg")}
    else if (typeName == "psychic") {document.getElementById(id).classList.add("psychic-bg")}
    
}

async function searchPokemon(){
    let pokemon = document.getElementById('searchPokemon').value.toLowerCase();
    let url=`https://pokeapi.co/api/v2/pokemon/${pokemon}`;
    let response = await fetch(url);
    currentPokemon = await response.json();
    let pokemonId = currentPokemon.id;
    loadPokemon(pokemonId);
}

async function loadPokemon(id){
    document.getElementById('list').innerHTML = '';
    document.getElementById('wrapper').classList.remove('d-none');
    document.getElementById('default-content').classList.add('d-none');

    let url=`https://pokeapi.co/api/v2/pokemon/${id}`;
    let response = await fetch(url);
    currentPokemon = await response.json();

    

    renderPokemonInfo();
    renderPokemonTypes();
    renderPokemonNavigation();
    renderPokemonAbout();
}

function renderPokemonInfo(){
    document.getElementById('pokedex').classList.remove('d-none');
    let pokemonId = currentPokemon.id;

    document.getElementById('pokemonName').innerHTML = `
    <div>
        <div class="top-left-box"></div>
        <div class="arrow-heart">
            <img class="arrow" src="./img/arrow_left.png" style="width:50px;cursor:pointer;z-index:99;" onclick="goBack()">
            <i class="fa-regular fa-heart" style="color: #fff;font-size:40px;"></i>
        </div>
        <div class="name-id">
            <h3>${currentPokemon.name.charAt(0).toUpperCase()+currentPokemon.name.slice(1)}</h3>
            <h5>#00${pokemonId}</h5>
        </div>
        <div id="pokemonTypes" class="types"></div>
        <img class="pokeball" src="./img/poke_ball_icon_155925.png">
    </div>`;
    document.getElementById('pokemonImg').src = currentPokemon.sprites.other["official-artwork"].front_default;
    
}

function renderPokemonTypes(){
    let pokemonTypes = currentPokemon.types;
    for (let i = 0; i < pokemonTypes.length; i++) {
        const element = pokemonTypes[i];
        const typeName = element.type.name;
        changeBg(typeName, 'pokedex');
        document.getElementById('pokemonTypes').innerHTML += `
            <h6>${typeName.toString().charAt(0).toUpperCase()+typeName.toString().slice(1)}</h6>`;
    }
}

function renderPokemonNavigation() {
    let content = document.getElementById('info-container');
    content.innerHTML ='';
    content.innerHTML += `
    <div>
        <nav>
            <li id="about" onclick="renderPokemonAbout()">About</li>
            <li id="base_stats" onclick="renderPokemonBaseStats()">Base Stats</li>
            <li id="moves" onclick="renderPokemonMoves()">Moves</li>
        </nav>
    </div>`;
}


function renderPokemonAbout(){
    document.getElementById('info-stats').innerHTML = "";
    document.getElementById('moves').style = "";
    document.getElementById('base_stats').style = "";
    document.getElementById('about').style.cssText = "border-bottom:2px solid blue;padding-bottom:15px;width:10%;";
    let pokemonHeight = currentPokemon.height;
    let pokemonWeight = currentPokemon.weight;
    let pokemonAbilities = currentPokemon.abilities;
    let pokemonAbilitiesArray = [];

    for (let i = 0; i < pokemonAbilities.length; i++) {
        const ability = pokemonAbilities[i];
        pokemonAbilitiesArray.push(ability.ability.name);
    }
    document.getElementById('info-stats').innerHTML += `
    <div class="pokeMainContainer">
        <div class="pokeInfoContainer">
            <h4>Height</h4>
            <h4>${pokemonHeight}" (${pokemonHeight*2.54} cm)</h4>
        </div>
        <div class="pokeInfoContainer">
            <h4>Weight</h4>
            <h4>${pokemonWeight} lbs (${(pokemonWeight*0.453592).toFixed(2)} kg)</h4>
        </div>
        <div class="pokeInfoContainer">
            <h4>Abilities</h4>
            <h4>${pokemonAbilitiesArray}</h4>
        </div>
    </div>
    `;

}

function renderPokemonBaseStats(){
    document.getElementById('moves').style = "";
    document.getElementById('about').style ="";
    document.getElementById('base_stats').style.cssText = "border-bottom:2px solid blue;padding-bottom:15px;width:15%;";
    document.getElementById('info-stats').innerHTML = "";
    let statsArray=[];
    let stats = currentPokemon.stats;

    console.log(statsArray);


    for (let index = 0; index < stats.length; index++) {
        const stat = stats[index].base_stat;
        statsArray.push(stat);
    }
    document.getElementById('info-stats').innerHTML += `
    <div class="pokeMainContainer">
        <div class="pokeInfoContainer">
            <h4>HP</h4>
            <div style="display:flex;align-items:center;gap:10px;"><div class="hp" style="height:20px;width:${statsArray[0]}px;background-color:green;"></div><h4>${statsArray[0]}</h4></div>
        </div>
        <div class="pokeInfoContainer">
            <h4>Attack</h4>
            <div style="display:flex;align-items:center;gap:10px;"><div class="hp" style="height:20px;width:${statsArray[1]}px;background-color:yellow;"></div><h4>${statsArray[1]}</h4></div>
        </div>
        <div class="pokeInfoContainer">
            <h4>Defense</h4>
            <div style="display:flex;align-items:center;gap:10px;"><div class="hp" style="height:20px;width:${statsArray[2]}px;background-color:red;"></div><h4>${statsArray[2]}</h4></div>
        </div>
        <div class="pokeInfoContainer">
            <h4>Special Attack</h4>
            <div style="display:flex;align-items:center;gap:10px;"><div class="hp" style="height:20px;width:${statsArray[3]}px;background-color:blue;"></div><h4>${statsArray[3]}</h4></div>
        </div>
        <div class="pokeInfoContainer">
            <h4>Special Defense</h4>
            <div style="display:flex;align-items:center;gap:10px;"><div class="hp" style="height:20px;width:${statsArray[4]}px;background-color:brown;"></div><h4>${statsArray[4]}</h4></div>
        </div>
        <div class="pokeInfoContainer">
            <h4>Speed</h4>
            <div style="display:flex;align-items:center;gap:10px;"><div class="hp" style="height:20px;width:${statsArray[5]}px;background-color:black;"></div><h4>${statsArray[5]}</h4></div>
        </div>
    </div>`;
}

function renderPokemonMoves (){
    document.getElementById('base_stats').style = "";
    document.getElementById('about').style = "";
    document.getElementById('moves').style.cssText = "border-bottom:2px solid blue;padding-bottom:15px;width:15%;";
    document.getElementById('info-stats').innerHTML="";
    let moves = currentPokemon.moves;
    let movesArray = [];

    for (let index = 0; index < moves.length; index++) {
        const move = moves[index].move.name;
        movesArray.push(move);
    }
    document.getElementById('info-stats').innerHTML += `<div id="moves_container"></div>`;

    for(let i = 0; i < movesArray.length; i++) {
        document.getElementById('moves_container').innerHTML +=`<div class="moves-bubbles">${movesArray[i]}</div>`;
    }
}

function goBack() {
    document.getElementById('wrapper').classList.add('d-none');
    document.getElementById('default-content').classList.remove('d-none');
    document.getElementById('pokemonName').style="";
    document.getElementById('pokedex').classList.remove('green-bg', 'red-bg' , 'blue-bg' , 'ground-bg' , 'flying-bg' , 'fairy-bg' , 'electric-bg', 'fighting-bg','psychic-bg');
}

function filterPokemons() {
    let search = document.getElementById('searchPokemon').value;
    search = search.toLowerCase();
    

    let list = document.getElementById('list');
    list.innerHTML = '';

    const maxResults = 5; // Set the maximum number of results to display
    let resultsCount = 0; // Initialize the count of displayed results

    for (let index = 0; index < myArray.length && resultsCount < maxResults; index++) {
        let name = myArray[index].name;
        let id = (myArray[index].url).slice(-3).replaceAll('/', '');
        
        if (name.toLowerCase().startsWith(search)) {
            list.innerHTML += `<li class="suggested-name" onclick="loadPokemon(${id})">${name}</li>`;
            resultsCount++; // Increment the displayed results count
        }
    }
}
