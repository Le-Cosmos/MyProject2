
import Body from "./Body";
import Heading from "./Heading";
import BodyNext from "./BodyNext";
import React, {useState} from "react";
import BodyBoard from "./BodyBoard";
import UserInterface from "./Connect";


function App() {
  const [page, setPage] = useState(1);
  const goPage1 = () => setPage(1);
  const goPage2 = () => setPage(2);
  const goPage3 = () => setPage(3);
  return (
    <div>
      <div className= "navBar">
        <button onClick = {goPage1}> PRODUCTS </button>
        <button onClick = {goPage2}> NEXT DAYS </button>
        <button onClick = {goPage3}> BOARD </button>
      </div>
      <Heading />
      <Body visible = {(page === 1) ? 0 : 1}/>
      <BodyNext visible = {(page === 2) ? 0 : 1}/>
      <BodyBoard visible = {(page === 3) ? 0: 1}/>
      <UserInterface />
    </div>
  );
}

export default App;
