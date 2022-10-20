import { createContext, useContext, useState } from "react";

const MessageContext = createContext();

function MessageProvider({ children }) {
	const [message, setMessage] = useState({ type: "" });

	return (
		<MessageContext.Provider value={{ message, setMessage }}>
			{children}
		</MessageContext.Provider>
	);
}

function useMessage() {
	const context = useContext(MessageContext);

	return context;
}

export { MessageProvider, useMessage };
