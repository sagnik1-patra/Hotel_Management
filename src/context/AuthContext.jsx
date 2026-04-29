import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const signup = (name, email, password) => {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    
    if (users.find(u => u.email === email)) {
      throw new Error('User with this email already exists');
    }

    const newUser = { id: Date.now().toString(), name, email, password, role: 'user' };
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    
    setUser(newUser);
    localStorage.setItem('currentUser', JSON.stringify(newUser));
  };

  const login = (email, password) => {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const foundUser = users.find(u => u.email === email && u.password === password);
    
    if (foundUser) {
      setUser(foundUser);
      localStorage.setItem('currentUser', JSON.stringify(foundUser));
    } else {
      throw new Error('Invalid email or password');
    }
  };

  const adminLogin = (username, password) => {
    if (username === 'Sagnik' && password === '22122000') {
      const adminUser = { id: 'admin', name: 'Admin Sagnik', role: 'admin' };
      setUser(adminUser);
      localStorage.setItem('currentUser', JSON.stringify(adminUser));
    } else {
      throw new Error('Invalid Admin Credentials');
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('currentUser');
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, adminLogin, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
