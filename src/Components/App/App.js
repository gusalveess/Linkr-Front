import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MessageProvider } from "../../Contexts/messageContext";

import GlobalStyle from "./GlobalStyle";
import SignIn from "../SignIn/SignIn";
import SignUp from "../SignUp/SignUp";
import PrivatePage from "../PrivatePage/PrivatePage";
import Timeline from "../Timeline/Timeline";

export default function App() {
	return (
		<>
			<GlobalStyle />

			<BrowserRouter>
				<MessageProvider>
					<Routes>
						<Route path="/" element={<SignIn />} />
						<Route path="/sign-up" element={<SignUp />} />

						<Route
							path="/timeline"
							element={
								<PrivatePage>
									<Timeline />
								</PrivatePage>
							}
						/>
					</Routes>
				</MessageProvider>
			</BrowserRouter>
		</>
	);
}
