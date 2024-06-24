import "./App.css";
import Pokelist from "./components/Pokelist/Pokelist";
import axios from "axios";
import { useState, useEffect } from "react";
const URL = "https://pokeapi.co/api/v2/pokemon";

function App() {
  const [resolvedProps, setResolvedProps] = useState();

  async function getPokeApiData() {
    const limit = 20;
    const start = 140;
    const pokeListPackage = await axios.get(
      URL + "?offset=" + start + "&limit=" + limit
    );
    return pokeListPackage;
  }

  useEffect(() => {
    const pokeList = async (start, limit) => {
      let result = await getPokeApiData(start, limit);
      return result;
    };

    const getProps = async () => {
      let res = await pokeList();
      setResolvedProps(res);
    };

    getProps();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        {resolvedProps ? <Pokelist props={resolvedProps} /> : null}
      </header>
    </div>
  );
}

export default App;
