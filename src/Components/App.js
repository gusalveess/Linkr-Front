import { BrowserRouter, Routes, Route } from "react-router-dom";
import '../Assets/Reset.css'
import Feed from "./Feed/Feed";
import SignIn from "./SignIn/SignIn";
import SignUp from "./SignUp/SignUp";
import PostsUser from "./PostsUser/PostsUser"

export default function App() {
  
    return (
      <>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<SignIn />} />
              <Route path="/sign-up" element={<SignUp/>} />
              <Route path="/feed" element={<Feed/>}/>
              <Route path="/user/:idUser" element={<PostsUser/>}/>
            </Routes>
          </BrowserRouter>
      </>
    );
  }