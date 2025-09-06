import { Link } from 'react-router-dom';
import './Header.css';
import logo from '../assets/mealmate-logo.png'; // make sure the path is correct!

function Header() {
  return (
    <header className="header">
      <div className="logo">
        <img src={logo} alt="MealMate logo" height="32" />
        MealMate
      </div>
      <nav className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/search">Search</Link>
        <Link to="/contact">Contact</Link>
        <Link to="/login">Login</Link>
        <Link to="/surprise">Surprise Me</Link>
      </nav>
    </header>
  );
}

export default Header;

