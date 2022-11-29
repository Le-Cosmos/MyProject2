import React, {useState} from "react";
import SneakPage from "./SneakPage"

function SearchResult(props) {
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
    <button onClick={handleChange} className={"search-btn " + (active === 1 ? "premier-plan" : "")}>
      <img className="img-search" src={dt.thumbnail} alt="" />
      <p className="name-search">{dt.shoeName}</p>
      <p className="price-search">{dt.retailPrice} €</p>
      <p className="date-search">{dt.date}</p>
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

export default SearchResult;
