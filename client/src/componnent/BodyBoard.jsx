import React, { useState, useEffect } from "react";
import BoardTuile from "./BoardTuile";



function BodyBoard(props) {
  const [classement, setClassement] = useState([]);
  const ge = async () => {
    try {
      var dat = await fetch("/bestDeal");
      var res = await dat.json();
      setClassement(res);
    }
    catch (error){
      console.log(error);
    }
  }

  function createDayBox(day, i) {

    return (
      <BoardTuile
        key = {i}
        Shoe = {classement[i]}
        Place = {i}
      />
    );
  }
  useEffect(() => ge, []);
  if (classement){
    return <div className={"bodyB " + (props.visible ? "invisible" : "")}>{(classement.map((shoe, index) => createDayBox(shoe, index)))} </div>;
  }
}


export default BodyBoard;
