import { createContext, useState, useContext } from 'react';

const MovieContext = createContext();

export function MovieProvider({ children }) {
  const [movieQuery, setMovieQuery] = useState('');
  const [showSignIn, setShowSignIn] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);

  return (
    <MovieContext.Provider value={{ movieQuery, setMovieQuery, showSignIn, setShowSignIn, showSignUp, setShowSignUp }}>
      {children}
    </MovieContext.Provider>
  );
}

export function useMovie() {
  const context = useContext(MovieContext);

  if (!context) {
    throw new Error('useMovie much be used within a MovieProvider');
  }

  return context;
}
