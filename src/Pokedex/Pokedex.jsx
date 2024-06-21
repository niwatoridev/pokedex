import './Pokedex.css';
import axios from "axios";

const URL = 'https://pokeapi.co/api/v2/pokemon/'


async function _getPokemonInfo(id) {
  await axios.get(URL + id)
  .then((pokemonInfoRaw) => _formatCard(pokemonInfoRaw.data))
  .catch((error) => console.log(error))
};

function _formatCard(data){
const name = _capitalizeFirstLetter(data.name)
const singleType = data.types[1] ? false : true
console.log(name)
console.log('N.º ' + data.id)
// Logica para imprimir tipos//
console.log(singleType ? _capitalizeFirstLetter(data.types[0].type.name) : _capitalizeFirstLetter(data.types[0].type.name) + ' / ' + _capitalizeFirstLetter(data.types[1].type.name))
}


function _capitalizeFirstLetter(word){
  return word.charAt(0).toUpperCase() + word.slice(1)
}

function createSingleCard(pokemonId){
_getPokemonInfo(pokemonId)
}



function Pokedex() {
  return (
    <div className="pokedexMainContainer">
      <header className="pokedexMainContainerHeader">
          <h1 onClick={() => createSingleCard(146)}>Pokedex</h1>
      </header>
    </div>
  );
}

export default Pokedex;
