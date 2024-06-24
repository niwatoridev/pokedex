import "./Pokelist.css";
import axios from "axios";
import Pokecard from "../PokeCard/Pokecard";
import { useState, useEffect } from "react";
const URL = "https://pokeapi.co/api/v2/pokemon";

//falta resolver esta promesa
// async function _getPokemonInfo(id) {
//   await axios
//     .get(URL + "/" + id)
//     .then((pokemonInfoRaw) => pokemonInfoRaw.data)
//     .catch((error) => console.log(error));
// }

function _formatCard(data) {
  const cardProps = {};
  const pokeTypes = data.types;
  cardProps.id = data.id;
  cardProps.pokeName = _capitalizeFirstLetter(data.name);
  cardProps.pokeImg = data.sprites.other["official-artwork"].front_default;
  cardProps.pokeNumber = "N.º " + data.id;
  cardProps.pokeTypesFormated = _formatTypes(pokeTypes);

  return cardProps;
}

function _formatTypes(pokeTypes) {
  const multipleType = pokeTypes[1] ? true : false;
  const pokeTypesFormated = {};
  if (multipleType) {
    pokeTypesFormated.typeOne = _capitalizeFirstLetter(pokeTypes[0].type.name);
    pokeTypesFormated.typeTwo = _capitalizeFirstLetter(pokeTypes[1].type.name);
  } else {
    pokeTypesFormated.typeOne = _capitalizeFirstLetter(pokeTypes[0].type.name);
  }
  return pokeTypesFormated;
}

function _capitalizeFirstLetter(word) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

function Pokelist(props) {
  const rawPokemonList = props.props.data.results;
  const [listForAxiosRequest, setListForAxios] = useState([]);
  const [pokemonData, setPokemonData] = useState([]);
  const [formattedCardList, setFormattedCardList] = useState([]);

  useEffect(() => {
    function getFinalPokemonList(arr) {
      const pokeNamesList = [];
      arr.map((element) => {
        return pokeNamesList.push(element.name);
      });
      setListForAxios(pokeNamesList);
    }
    getFinalPokemonList(rawPokemonList);
  }, [rawPokemonList]);

  useEffect(() => {
    const fetchPokemonData = async () => {
      const requests = listForAxiosRequest.map((name) =>
        axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`)
      );

      try {
        const responses = await Promise.all(requests);
        const data = responses.map((response) => response.data);
        setPokemonData(data);
      } catch (error) {
        console.error("Error fetching Pokémon data:", error);
      }
    };

    fetchPokemonData();
  }, [listForAxiosRequest]);

  useEffect(() => {
    function formatAllCards(arr) {
      let newArr = [];
      arr.map((element) => {
        return newArr.push(_formatCard(element));
      });
      setFormattedCardList(newArr);
    }
    formatAllCards(pokemonData);
  }, [pokemonData]);

  return (
    <div>
      <h1>Pokedex</h1>
      <ul>
        {formattedCardList.map((entry) => (
          <div key={entry.id}>
            <Pokecard
              pokeName={entry.pokeName}
              pokeNumber={entry.pokeNumber}
              pokeImg={entry.pokeImg}
              typeOne={entry.pokeTypesFormated.typeOne}
              typeTwo={entry.pokeTypesFormated.typeTwo}
              singleType={entry.pokeTypesFormated.typeTwo ? false : true}
            />
          </div>
        ))}
      </ul>
    </div>
  );
}

export default Pokelist;
