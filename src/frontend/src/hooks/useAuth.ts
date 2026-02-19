import { useState, useEffect } from 'react';

interface User {
  username: string;
  password: string;
}

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState<string | null>(null);

  useEffect(() => {
    const loggedInUser = localStorage.getItem('currentUser');
    if (loggedInUser) {
      setIsAuthenticated(true);
      setCurrentUser(loggedInUser);
    }
  }, []);

  const register = (username: string, password: string): boolean => {
    const users = JSON.parse(localStorage.getItem('users') || '[]') as User[];
    
    if (users.some(u => u.username === username)) {
      return false;
    }

    users.push({ username, password });
    localStorage.setItem('users', JSON.stringify(users));
    return true;
  };

  const login = (username: string, password: string): boolean => {
    const users = JSON.parse(localStorage.getItem('users') || '[]') as User[];
    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
      localStorage.setItem('currentUser', username);
      setIsAuthenticated(true);
      setCurrentUser(username);
      return true;
    }

    return false;
  };

  const logout = () => {
    localStorage.removeItem('currentUser');
    setIsAuthenticated(false);
    setCurrentUser(null);
  };

  return {
    isAuthenticated,
    currentUser,
    register,
    login,
    logout,
  };
}
