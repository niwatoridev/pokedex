import "./Pokecard.css";

function Pokecard(props) {
  const singleType = props.singleType;

  function typeRender() {
    if (singleType) {
      return (
        <div className="pokeTypeDiv">
          <div className="pokeTypeOneDiv">
            <p className="pokeType">{props.typeOne}</p>
          </div>
        </div>
      );
    } else {
      return (
        <div className="pokeTypeDiv">
          <div className="pokeTypeOneDiv">
            <p className="pokeType">{props.typeOne}</p>
          </div>
          <div className="pokeTypeTwoDiv">
            <p className="pokeType">{props.typeTwo}</p>
          </div>
        </div>
      );
    }
  }

  return (
    <div className="pokeCardContainer">
      <div className="pokeImgContainer">
        <div className="imgBackground">
          <img className="pokeImg" src={props.pokeImg} alt="pokemonImage" />
        </div>
        <p className="pokeNumber">{props.pokeNumber}</p>
      </div>
      <div className="pokeInfoContainer">
        <p className="pokeName">{props.pokeName}</p>
        {typeRender()}
      </div>
    </div>
  );
}

export default Pokecard;
