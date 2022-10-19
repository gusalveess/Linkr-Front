import axios from "axios";
import styled from "styled-components";
import { AiOutlineLeft } from 'react-icons/ai'
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Header() {

  return (
    <>
      <Top>
        <h1>Linkr</h1>

        <div></div>

        <div>
          <AiOutlineLeft />
        </div>
      </Top>
      <Hidden>
        <div>Logout</div>
      </Hidden>
    </>
  );
}

const Top = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  height: 72px;
  background-color: #151515;

  h1 {
    font-family: "Passion One", cursive;
    font-weight: 700;
    color: #fff;
    font-size: 49px;
  }

  svg {
    color: #fff;
  }
`;

const Hidden = styled
