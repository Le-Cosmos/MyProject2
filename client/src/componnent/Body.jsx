import React, { useState, useEffect } from "react";
import Puzzle from "./Puzzle";



function Body(props) {
  const [search, setSearch] = useState([]);
  const getData = async () => {
    var data = [];
    var js = [];
    data = await fetch("/home");
    js = await data.json();
    setSearch(js);
  }

  useEffect(() => getData, []);
  if (search){
    return <div className={"body-puzzle " + (props.visible ? "invisible" : "")}>{(search.map((shoe, index) => createShoeBox(shoe, index)))} </div>;
  }
  else{
    return <div className="body-puzzle ">chargement3</div>;
  }
}
function createShoeBox(shoe, index) {
  return (
    <Puzzle
      key= {index}
      Shoe= {shoe}
    />
)};

export default Body;
