import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

import Header from '../Header/Header';
import SignIn from "../SignIn/SignIn";

export default function PrivatePage ({ children }) {
    const navigate = useNavigate();

	const hasToken =  JSON.parse(localStorage.getItem("linkr"))?.token;

	useEffect(() => {
		if (!hasToken) {
			localStorage.removeItem('linkr');
			navigate("/");
		}
	})

	if (hasToken) {
		return (
			<>
			    <Header />
			    {children}
			</>
		);
	}

	return null;
}
