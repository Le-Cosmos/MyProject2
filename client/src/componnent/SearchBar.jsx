import React, { useState } from "react";
import SearchResult from "./SearchButton";


function SearchBar() {
  let [search, setSearch] = useState([]);
  let [input, setInput] = useState("");
  var typingTimer;
  var doneTypingInterval = 500;
  async function handleSearch(event) {
    clearTimeout(typingTimer);
    typingTimer = setTimeout(async() =>{
      var data = [];
      var js = [];
      const sea = await input.toLowerCase();
      if (sea) {
        try{
          data = await fetch("/search/" + sea);
          js = await data.json();
        }
        catch (error){
          console.log(error);
        }
      }
      setSearch(js);
    } ,doneTypingInterval);
  }
  const handleChange = async (event) =>{
    const newValue = await event.target.value
    setInput(newValue);
    handleSearch(input);
  }

  const exit = () =>{
    document.activeElement.blur();
    setInput("");
  }
  return (
    <div>
      <div className="search">
        <input
          className="search-bar"
          name="search-bar"
          onChange={handleChange}
          type="text"
          placeholder="Search ..."
          value={input}
        />
        <div className="search-result">
          {input && (search.map((shoe, index) => createSearchResult(shoe, index)))}
        </div>
      </div>
      {input && <button onClick={exit} className="close-but1"></button>}
    </div>
  );
}

export default SearchBar;

function createSearchResult(shoe, index) {
  return (
    <SearchResult
      key = {index}
      Shoe = {shoe}
    />
  );
}
