import { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [accounts, setAccounts] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  const signUp = (username, password, email) => {
    // Check if username already exists
    const existingUser = accounts.find(acc => acc.username === username);
    if (existingUser) {
      return { success: false, message: 'Username already exists' };
    }

    // Check if email already exists
    const existingEmail = accounts.find(acc => acc.email === email);
    if (existingEmail) {
      return { success: false, message: 'Email already exists' };
    }

    // Create new account
    const newAccount = {
      id: Date.now(),
      username,
      password,
      email,
      createdAt: new Date().toISOString()
    };

    setAccounts([...accounts, newAccount]);
    return { success: true, message: 'Account created successfully' };
  };

  const login = (username, password) => {
    const account = accounts.find(
      acc => acc.username === username && acc.password === password
    );

    if (account) {
      setCurrentUser(account);
      return { success: true, message: 'Login successful' };
    }

    return { success: false, message: 'Invalid username or password' };
  };

  const logout = () => {
    setCurrentUser(null);
  };

  return (
    <AuthContext.Provider value={{ accounts, currentUser, signUp, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
