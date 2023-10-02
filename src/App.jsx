import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import NavigationBar from './components/NavigationBar/NavigationBar';
import AnimatedRoutes from './routes/animatedRoutes/animatedRoutes';

function App() {
  return (
    <Router>
      <NavigationBar />
      <AnimatedRoutes />
    </Router>
  );
}

export default App;
