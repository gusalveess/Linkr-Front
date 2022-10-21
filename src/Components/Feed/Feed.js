import axios from "axios";
import styled from "styled-components";
import Header from "../Header/Header";
import GlobalStyle from "../../Assets/GlobalStyle";
import { useEffect,useState } from "react";
import {Link} from 'react-router-dom';

export default function Feed(){

    const [id,setId]= useState(1)
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoxLCJpYXQiOjE2NjYyNTk3OTh9.BGN4oPtmE9837XB218ZLY3WpikBFjFODa2r1UuX6PRU"
    

    


    return(
        <>
        <GlobalStyle/>
        <Header/>
        
       <Post>
        TESTE
        <img src="https://www.palmares.gov.br/wp-content/uploads/2019/02/Bob-marley-1.jpg"/>
        <Link to={`/user/${id}`}><h1>Bob marley</h1></Link>
       </Post>
        
       

        </>
    )
}

const Post = styled.div`
width:50%;
height:40vh;
margin:auto;
margin-top: 3rem;
border:1px solid white;



`

