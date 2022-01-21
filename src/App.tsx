import { Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from 'react-query';

import Header from './layout/Header';
import Home from './pages/home';
import LoginModal from "./components/LoginModal";
import Trade from './pages/trade';

import { useStore } from './store/login';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount: true,
      refetchOnReconnect: false,
      retry: false,
    },
  },
});

function App() {
  const { shouldOpenLoginModal } = useStore();

  return (
    <QueryClientProvider client={queryClient}>
      <Header />
      {shouldOpenLoginModal && <LoginModal />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/trade" element={<Trade />} />
      </Routes>
    </QueryClientProvider>
  );
}

export default App;
