import React, {useState} from "react";
import SneakPage from "./SneakPage"


function DayBoxTuile(props) {
  const [active, setActive]  = useState(0);
  const handleChange = () => {
    if (active){
      setActive(0);
    } else {
      setActive(1);
    }
  }
  const dt = props.S;
  return (
    <div className= {(active === 1) ? "premier-plan" : ""}>
      <button onClick={handleChange} className={"tuile " + (props.Position === 1 ? "first" : (props.Position === 2 ? "second" :(props.Position === 3 ? "third" :(props.Position === 4? "forth" : "fifth"))))}>
        <img className="img-tuile" src={dt.thumbnail} alt="" />
        <div className="tuile2">
          <h4 className="name-tuile2">{dt.silhoutte}</h4>
          <div>
          <p>Retail: {dt.retailPrice}€</p>
          <p>Resell: {dt.lowestResellPrice.stockX}€</p>
          </div>
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

export default DayBoxTuile;
