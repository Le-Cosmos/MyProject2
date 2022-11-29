import React, { useState } from "react";

function UserInterface(props) {
  const [connected, setConnected] = useState(0);
  const [logginPage, setLogginPage] = useState(0);
  const [userStat, setUserStat] = useState();
  const [userInfo, setUserInfo] = useState(
    {
      lName: "",
      fName: "",
      mail: "",
      password: ""
    });

  const goRegist = () => setLogginPage(1);
  const goLoggin = () => setLogginPage(2);
  const closeTab = () => setLogginPage(3);
  const handleLoggin = async (event) =>{
    if(userInfo.mail && userInfo.password){
      const reg = await fetch("/user/loggin", {
        method: 'POST',
        body: userInfo
      })
      const res = await reg.json();
      if (res){
        closeTab();
        setUserStat(res.json);
        setConnected(1);
      } else {
        setUserInfo({
              lName: "",
              fName: "",
              mail: "Plz Be Correct",
              password: ""
            })
      }
    } else {
      setUserInfo({
            lName: "",
            fName: "",
            mail: "Plz Be Correct",
            password: ""
          })
    }
  }
  const handleRegister = async (event) =>{
    if(userInfo.lName && userInfo.fName && userInfo.mail && userInfo.password){
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userInfo)
      };
      const reg = await fetch(`/user/register`, requestOptions);
      const res = await reg.json();
      if (res){
        closeTab();
        setUserStat(res.json);
        setConnected(1);
      } else {
        setUserInfo({
              lName: "",
              fName: "",
              mail: "Plz Be Correct",
              password: ""
            })
      }
    } else {
      setUserInfo({
            lName: "",
            fName: "",
            mail: "Plz Be Correct",
            password: ""
          })
    }
  }
  const handleChange = async (event) =>{
    const newValue = event.target.value
    const inputName = event.target.name
    setUserInfo(preValue =>{
      if(inputName === "name"){
        return {
              lName: preValue.lName,
              fName: newValue,
              mail: preValue.mail,
              password: preValue.password
        }
      } else if (inputName === "mail"){
        return {
          lName: preValue.lName,
          fName: preValue.fName,
          mail: newValue,
          password: preValue.password
        }
      } else if (inputName === "lName") {
        return {
          lName: newValue,
          fName: preValue.fName,
          mail: preValue.mail,
          password: preValue.password
        }
      } else if (inputName === "password"){
        return {
          lName: preValue.lName,
          fName: preValue.fName,
          mail: preValue.mail,
          password: newValue
        }
      }
    })
  }

  return (
      <div className= "user">
        <div className = "little-wrapper">
          <div className = {"user-connected " + (connected === 0 ? "invisible" : "")}>
            <p>Icone</p>
            <p>Hi !</p>
          </div>
          <div className = {connected === 1 ? "invisible" : ""}>
            <button onClick = {goRegist} className= "sign connec">Sign</button>
            <button onClick = {goLoggin} className= "log connec">Login</button>
          </div>
        </div>
        <div className = {"register-wrapper " + (logginPage !== 1 ? "invisible" : "")}>
          <button onClick={closeTab} type="button" className="close-but"></button>
          <button onClick= {goLoggin}type="button" className="special droite" >L O G  I N</button>
          <div className = "register">
            <h3>Thx for data !</h3>
            <div className = "input-connect-wrapper">
              <input onChange = {handleChange} className= "input-connec" type="text" name="name" value={userInfo.fName} placeholder="Name..."/>
            </div>
            <div className = "input-connect-wrapper">
              <input onChange = {handleChange} className= "input-connec" type="text" name="lName" value={userInfo.LName} placeholder="Last Name..."/>
            </div>
            <div className = "input-connect-wrapper">
              <input onChange = {handleChange} className= "input-connec" type="text" name="mail" value={userInfo.mail} placeholder="Email..."/>
            </div>
            <div className = "input-connect-wrapper">
              <input onChange = {handleChange} className= "input-connec" type="text" name="password" value={userInfo.password} placeholder="Password..."/>
            </div>
            <button onClick= {handleRegister} type="button" className="reg-but">Register</button>
          </div>
        </div>
        <div className = {"register-wrapper " + (logginPage !== 2 ? "invisible" : "")}>
        <button onClick= {goRegist} type="button" className = "special gauche"> S I G N </button>
          <div className = "register">
            <h3>hello world !</h3>
            <button onClick ={closeTab} type="button" className="close-but"></button>
            <div className = "input-connect-wrapper">
              <input onChange = {handleChange} className= "input-connec" type="text" name="mail" value={userInfo.mail} placeholder="Email..."/>
            </div>
            <div className = "input-connect-wrapper">
              <input onChange = {handleChange} className= "input-connec" type="text" name= "password" value={userInfo.password} placeholder="Password..."/>
            </div>
            <button onClick={handleLoggin} type="button" className="reg-but">Loggin</button>
          </div>
        </div>
      </div>
  );
}

export default UserInterface;
