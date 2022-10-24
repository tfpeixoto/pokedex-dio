const pokeApi = {}

function convertPokeApiDetailPokemon(pokeDetails) {
  const pokemon = new Pokemon()
  pokemon.number = pokeDetails.id;
  pokemon.name = pokeDetails.name;
  pokemon.photo = pokeDetails.sprites.other.dream_world.front_default

  const types = pokeDetails.types.map(typeSlot => typeSlot.type.name);
  const [type] = types
  pokemon.types = types
  pokemon.type = type

  return pokemon
}

pokeApi.getPokemonDetail = (pokemon) => {
  return fetch(pokemon.url)
    .then(response => response.json()
    .then(convertPokeApiDetailPokemon)
)}

pokeApi.getPokemons = (offset = 0, limit = 5) => {
  const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`

  return fetch(url)
    .then(response => response.json())
    .then(data => data.results)
    .then(pokemons => pokemons.map(pokeApi.getPokemonDetail))
    .then(detailRequests => Promise.all(detailRequests))
    .then(pokemonsDetails => pokemonsDetails)
}

pokeApi.getPokemon = (id) => {
  const url = `https://pokeapi.co/api/v2/pokemon/${id}`

  return fetch(url)
    .then(response => response.json())
    .then(convertPokeApiDetailPokemon)
}
