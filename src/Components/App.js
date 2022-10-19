import { BrowserRouter, Routes, Route } from "react-router-dom";
import '../Assets/Reset.css'
import SignIn from "./SignIn/SignIn";
import SignUp from "./SignUp/SignUp";

export default function App() {
  
    return (
      <>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<SignIn />} />
              <Route path="/sign-up" element={<SignUp/>} />
            </Routes>
          </BrowserRouter>
      </>
    );
  }