import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MessageProvider } from "../Contexts/messageContext";
import "../Assets/Reset.css";
import SignIn from "./SignIn/SignIn";
import SignUp from "./SignUp/SignUp";

import Alert from "./Alert/Alert";

export default function App() {
	return (
		<BrowserRouter>
			<MessageProvider>
				<Alert />

				<Routes>
					<Route path="/" element={<SignIn />} />
					<Route path="/sign-up" element={<SignUp />} />
				</Routes>
			</MessageProvider>
		</BrowserRouter>
	);
}
