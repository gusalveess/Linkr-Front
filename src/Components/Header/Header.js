import axios from "axios";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { AiOutlineSearch} from "react-icons/ai";
import { AiOutlineDown } from "react-icons/ai";
import { AiOutlineUp} from "react-icons/ai";
import { Link} from 'react-router-dom';

export default function Header() {
  const[search,setSearch]=useState('')
  const [click,setClick]=useState(false)

  let user = JSON.parse(localStorage.getItem("linkr"));

  const img = user.userImage
  //console.log(search)
  const v={ color: "white", fontSize: "1.5em" }
  


  return (
    <>
      <Top>
        <h1>Linkr</h1>
        <SearchBar>
        <input 
        type="text"
        placeholder="Search for people"
        defaultValue={search}
        onChange={(e)=> setSearch(e.target.value)}
        /> 
        <AiOutlineSearch/>
        </SearchBar>
          <Container>
            <ScreenUser>
              {click ? (<AiOutlineDown onClick={()=>setClick(false)}style={v}/>) : (<AiOutlineUp style={v} onClick={()=>setClick(true)}/>)}
              <img src={img}/>
            </ScreenUser >
            { click ? (<Link to={'/'}><Logout><h1>Logout</h1></Logout></Link>) :(<></>)}
          </Container>
      </Top>  
    </>
  );
}

const Top = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left:20px;

  width: 100%;
  height: 72px;
  background-color: #151515;

  h1 {
    font-family: "Passion One", cursive;
    font-weight: 700;
    color: #fff;
    font-size: 49px;
  }
`;

const SearchBar= styled.div`
  width:35%;
  height:60%;
  background-color:#FFFFFF;
  border-radius:8px;
  display:flex;
  align-items:center;
  justify-content:space-between;
  padding-left:10px;
  padding-right:10px;
  

  input{
    border:none;
    font-family:"Lato";
    font-size:19px;
  }

  textarea:focus, input:focus {
    box-shadow: 0 0 0 0;
    outline: 0;
}
`
const ScreenUser=styled.div`
display:flex;
height:50px;
right:20px;
bottom:20px;
position: relative;



align-items:center;

img{
  margin-left:10px;
  width:50px;
  height:50px;
  object-fit:cover;
  border-radius:40px;
}



`

const Container = styled.div`
display:inline;
margin-top:50px;

  
  h1{
    display:flex;
    justify-content:center;
  
    align-items:center;
    font-weight: 400;

  font-size:17px;

  
}


`
const Logout = styled.div`
display:flex;
justify-content:center;

width:100%;
  height:47px;

  background-color:#151515;
  border-bottom-left-radius:15px;
`