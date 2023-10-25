// AuthContext.tsx
import React, { createContext, useContext, useState, ReactNode } from "react";

type User = {
	id: number;
	name: string;
	password: string;
	sector: string;
};

type AuthContextType = {
	user: User | null;
	login: (user: User) => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

type AuthProviderProps = {
	children: ReactNode;
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
	const [user, setUser] = useState<User | null>(null);

	const login = (user: User) => {
		setUser(user);
	};

	return (
		<AuthContext.Provider value={{ user, login }}>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => {
	const context = useContext(AuthContext);
	if (context === undefined) {
		throw new Error("useAuth must be used within an AuthProvider");
	}
	return context;
};
