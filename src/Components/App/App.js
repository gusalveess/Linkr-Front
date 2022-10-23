import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MessageProvider } from "../../Contexts/messageContext";

import GlobalStyle from "./GlobalStyle";
import PrivatePage from "../PrivatePage/PrivatePage";
import Alert from "../Alert/Alert";
import SignIn from "../SignIn/SignIn";
import SignUp from "../SignUp/SignUp";
import Timeline from "../Timeline/Timeline";
import HashtagPage from "../Hashtags/HashtagPage";
import PostsUser from "../Posts/PostsUser";

export default function App() {
	return (
		<>
			<GlobalStyle />

			<BrowserRouter>
				<MessageProvider>
					<Alert />

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

						<Route
							path="/hashtag/:hashtag"
							element={
								<PrivatePage>
									<HashtagPage />
								</PrivatePage>
							}
						/>
						<Route
							path="/user/:id"
							element={
								<PrivatePage>
									<PostsUser/>
								</PrivatePage>
							}
						/>
					</Routes>
				</MessageProvider>
			</BrowserRouter>
		</>
	);
}
