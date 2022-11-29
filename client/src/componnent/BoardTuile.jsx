import React, {useState} from "react";
import SneakPage from "./SneakPage"

function BoardTuile(props) {
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
    <button  onClick={handleChange} className="board-tuile">
      <h4 className="board-place-tuile">{props.Place + 1}</h4>
      <img className="img-board-tuile" src={dt.thumbnail} alt="" />
      <h4 className="board-name-tuile">{dt.shoeName}</h4>
      <h4>{dt.date}</h4>
      <div className="price-tuile">
      <p>Retail price: {dt.retailPrice}€</p>
      <p>Bene on lowest ask: {dt.diffPrice}€</p>
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

export default BoardTuile;
