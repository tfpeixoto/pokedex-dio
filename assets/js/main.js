const pokemonList = document.querySelector('[data-container]')
const loadMoreButton = document.querySelector('[data-more]')
const maxRecords = 151
const limit = 10
let offset = 0

function loadPokemonsItens(offset, limit) {
  pokeApi.getPokemons(offset, limit)
    .then((pokemons = []) => {
      const newHtml = pokemons.map(pokemon => {
        return `
        <li class="pokemon ${pokemon.type}">
          <a href="pokemon.html?id=${pokemon.number}" class="poke-link">
            <span class="number">${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>
      
            <divc class="detail">
              <ol class="types">
                ${pokemon.types.map(type => `<li class="type">${type}</li>`).join('')}
              </ol>
      
              <img src="${pokemon.photo}" alt="${pokemon.name}" />
            </div>
          </a>
        </li>
      `
      }).join('')

      pokemonList.innerHTML += newHtml
    })
}
loadPokemonsItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
  offset += limit
  const qtdRecordWithNextPage = offset + limit

  if (qtdRecordWithNextPage >= maxRecords) {
    const newLimit = maxRecords - offset

    loadPokemonsItens(offset, newLimit)
    loadMoreButton.parentElement.removeChild(loadMoreButton)

    return
  } else {
    loadPokemonsItens(offset, limit)

  }

})
