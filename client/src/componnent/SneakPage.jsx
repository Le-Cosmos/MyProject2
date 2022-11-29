import React from "react";
import stockXImg from "../Stockx_logo.png"
function SneakPage(props) {
  if(props){
    const dt = props.S;
    return (
        <div className= "sneak-page">
          <div className="infoPage">
            <img className="imgPage" src={dt.thumbnail} alt="" />
            <h4 className="pageName">{dt.shoeName}</h4>
            <h1>About it ...</h1>
            <p>{dt.description}</p>
          </div>
          <div className="description">
            <h4 className="pageName">Name: {dt.silhoutte}</h4>
            <h4 className="pageName">Brand: {dt.brand}</h4>
            <h4>Release date:{dt.date}</h4>
            <h4 className="pricePage">Price: {dt.retailPrice}€</h4>
            <h4> Buy Now on: </h4>
            <div className="buynow">
              <a href={dt.resellLinks.stockX}><img className="logo" src={stockXImg} alt=""/></a>
              <h4 className="pricePage">: {dt.lowestResellPrice.stockX}€</h4>
            </div>
          </div>
        </div>
    );
  }
}
export default SneakPage;
