import axios from "axios";
import styled from "styled-components";
import Header from "../Header/Header";
import GlobalStyle from "../../Assets/GlobalStyle";
import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from 'react-router-dom';
import { IoMdHeartEmpty } from "react-icons/io";

export default function PostsUser() {
    const { idUser } = useParams();

    const [itens, setItens] = useState([])
    //let id = 1

    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoxLCJpYXQiOjE2NjYyNTk3OTh9.BGN4oPtmE9837XB218ZLY3WpikBFjFODa2r1UuX6PRU"

    useEffect(() => {

        const config = {
            headers: { Authorization: `Bearer ${token}` }
        }
        const promise = axios.get(`http://localhost:4000/user/1`, config)
        promise.then(res => {
                setItens(res.data)
                
                console.log(itens)
                console.log(res.data)
                console.log(itens)
                
            })
          promise.catch((err) => {
                if(err.response) {
                    alert(err.response.data)
                  }
            })

}, [])
console.log(itens)
console.log(itens[0].profilePicture)
    return (
        <>
            <GlobalStyle />
            <Header />

            <User>
                 <img src={itens[0].profilePicture} />
                 <h1>{itens[0].username} posts</h1>  
            </User>
            <Post>
                <Left>
                     <img src={itens[0].profilePicture} />   
                    <IoMdHeartEmpty />
                </Left>
                {/* <h1>Bob marley</h1> */}
            </Post>
        </>
    )
}

const Post = styled.div`
width:50%;
height:40vh;
margin:auto;
margin-top: 3rem;
border-radius:10px;

background-color: #151515;
img{

}

`

const User = styled.div`
 display:flex;
 
 width:50%;
 height:10vh;
 margin:auto; 
margin-top:3rem;

 h1{
    
    margin:auto;
    margin-left:10px;
    text-align:baseline;
    font-size:8vh;
    color:#FFFFFF;
    font-family: "Passion One", cursive;
    
 }

 img{
    width:80px;
    height:80px;
    object-fit:cover;
    border-radius:40px;
 }

 `

const Left = styled.div`
width:20%;
height:100%;
display:flex;
padding-top:20px;
flex-direction:column;
justify-content:flex-start;
align-items:center;

border:1px solid white;
img{
    width:50px;
    height:50px;
    object-fit:cover;
    border-radius:30px;
 }


`