import React, {useState} from "react";
import SneakPage from "./SneakPage"

function Puzzle(props) {
  const [active, setActive]  = useState(0);
  const handleChange = () => {
    if (active){
      setActive(0);
    } else {
      setActive(1);
    }
  }
  const dt = props.Shoe;
  return (
    <div>
      <button onClick={handleChange} className={"puzzle " + (dt.diffPrice < 0 ? "red" :(dt.diffPrice > 0 ? "green" : "grey"))} >
        <img className="img-puzzle" src={props.Shoe.thumbnail} alt="" />
        <div className="puzzle2">
          <h4 className="name-puzzle">{props.Shoe.silhoutte}</h4>
          <h5>Price:</h5>
          <p className="price-puzzle">{props.Shoe.retailPrice}€</p>
        </div>
      </button>
       {(active === 1) && (
        <div className= "sneak-page-wrap">
          <button onClick={handleChange} className="close-but"></button>
          <SneakPage S={dt}/>
        </div>
      )}
    </div>
  );
}

export default Puzzle;
