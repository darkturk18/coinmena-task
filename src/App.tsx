import { useEffect } from 'react';
import { Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from 'react-query';

import Header from './layout/Header';
import LoginModal from "./components/LoginModal";
import Home from './pages/home';
import Trade from './pages/trade';

import { useStore } from './store/login';

import './App.scss';

const queryClient = new QueryClient()

function App() {
  const { loggedIn, shouldOpenLoginModal } = useStore();

  useEffect(() => {
    console.log(loggedIn, shouldOpenLoginModal);
  }, [loggedIn, shouldOpenLoginModal]);

  return (
    <QueryClientProvider client={queryClient}>
      <Header />
      {(!loggedIn && shouldOpenLoginModal) && <LoginModal />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/trade" element={<Trade />} />
      </Routes>
    </QueryClientProvider>
  );
}

export default App;
