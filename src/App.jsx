import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import NavigationBar from './components/NavigationBar/NavigationBar';
import AnimatedRoutes from './routes/animatedRoutes/animatedRoutes';
import { createContext, useState } from 'react';

export const CartContext = createContext();

function App() {
  const [cart, setCart] = useState([]);
  function toggleAddToCart(game) {
    if (cart.find((item) => item.id === game.id)) {
      setCart(cart.filter((item) => item.id !== game.id));
    } else {
      setCart([
        ...cart,
        {
          id: game.id,
          name: game.name,
          image: game.background_image,
          price: 60,
        },
      ]);
    }
  }

  return (
    <CartContext.Provider value={{ cart, toggleAddToCart }}>
      <Router>
        <NavigationBar />
        <AnimatedRoutes />
      </Router>
    </CartContext.Provider>
  );
}

export default App;
