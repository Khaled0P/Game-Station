import Store from '../Store/Store';
import Home from '../Home/Home';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import GamePage from '../GamePage/GamePage';

const Router = () => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait" initial={false}>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/store/game" element={<GamePage />} />
        <Route path="/store" element={<Store />} />
      </Routes>
    </AnimatePresence>
  );
};

export default Router;
