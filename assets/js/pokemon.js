const pokemonList = document.querySelector('[data-pokemon]')
const backPokedex = document.querySelector('[data-back]')

function receivePokemon() {
  const queryString = window.location.search;
  const urlParamns = new URLSearchParams(queryString)
  const pokemon = urlParamns.get('id')

  return pokemon
}

async function loadPokemon() {
  const pokemon = await receivePokemon();

  await pokeApi.getPokemon(pokemon)
    .then(pokemon => {
      pokemonList.innerHTML = `
        <div class="pokemon-container ${pokemon.type}">
          <div class="pokemon-nav">
            <button type="button" onclick="history.back()">Back</button>
          </div>

          <div class="pokemon-title">
            <h1 class="name">${pokemon.name}</h1>
            <span class="number">${pokemon.number}</span>
          </div>
          
          <ol class="pokemon-types">
            ${pokemon.types.map(type => `<li class="type">${type}</li>`).join('')}
          </ol>
          
          <img src="${pokemon.photo}" alt="${pokemon.name}" />

          <div class="pokemon-details">
          </div>
        </div>
      `
    })
}
loadPokemon()

// https://pokeapi.co/api/v2/pokemon/1
// https://dribbble.com/shots/6540871-Pokedex-App
