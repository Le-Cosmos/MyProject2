
import DayBoxTuile from "./DayBoxTuile";
import React, {useState, useEffect} from "react";
import nextChev from  "../chevron-right1.png"
import prevChev from  "../chevron-left1.png"

function DayBox(props) {
  const[arrayShoes, setArrayShoes] = useState();
  const[place, setPlace] = useState(1);
  const getDa = async () => {
    try {
      var dat = await fetch(`/date/${props.Day}`);
      var res = await dat.json();
      setArrayShoes(res);
    }
    catch (error){
      console.log(error);
    }
  }

  const setNext = () => {
      setPlace(preVal => {
        if (preVal === 5 || (!(arrayShoes[place]))) {
          return 1;
        } else {
          return (preVal + 1);
        }
      });
  }

  const setPrev = () => {
      setPlace(preVal => {
        if (preVal === 1 || (!(arrayShoes[place - 2]))) {
          return arrayShoes.length;
        } else {
          return (preVal - 1);
        }
      });
  }

  useEffect(() => getDa);
  if(arrayShoes){
  return (
    <div className= "days">
    <div className = "days-title" >
    <h1>{arrayShoes[0].date}</h1>
    </div>
    <img className="chevron r" src={nextChev} alt=""/>
    <button onClick = {setNext} className = "arrow next" type="button" name="next"> {"=>"} </button>
    <img className="chevron l" src={prevChev} alt=""/>
    <button onClick = {setPrev} className = "arrow prev" type="button" name="prev">{"<="} </button>
      {arrayShoes.map((shoe, index) => (<DayBoxTuile
        key = {index}
        S = {shoe}
        Position = {place}
        />))}
      </div>
    );
  }
}

export default DayBox;
