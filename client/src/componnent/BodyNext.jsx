import React, { useState, useEffect } from "react";
import DayBox from "./DayBox";



function BodyNext(props) {
  const [arrayOfDay, setArrayOfDay] = useState([]);
  const getDataD = async () => {
    try {
      var dat = await fetch("/nextreleasedate");
      var res = await dat.json();
      setArrayOfDay(res);
    }
    catch (error){
      console.log(error);
    }
  }

  function createDayBox(day, i) {

    return (
      <DayBox
        key = {i}
        Day = {arrayOfDay[i]}
      />
    );
  }
  useEffect(() => getDataD, []);
  if (arrayOfDay){
    return <div className={"bodyN " + (props.visible ? "invisible" : "")}>{(arrayOfDay.map((day, index) => createDayBox(day, index)))} halllalalal</div>;
  }
  else{
    return <div className="bodyN ">chargement</div>;
  }
}


export default BodyNext;
