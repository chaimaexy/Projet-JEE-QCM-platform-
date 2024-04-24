import React from 'react';
import './Navbar.css';
import platLogo from '../../assets/platLogo.png';
import { Link } from 'react-router-dom';

const Navbar = ({ userId, onLogout }) => {
    const handleLogoutClick = () => {
        if (onLogout) {
            onLogout(); // Call onLogout function if it's defined
        }
    };

    return (
        <nav className='container'>
            <img src={platLogo} alt="" className='logo' />
            <ul>
                <li><Link to="/" className='btnnHome'>Home</Link></li>
                
                {userId ? (
                    <>
                        <li><Link to="/results" className='btnnHome'>View Results</Link></li> {/* Link to view results */}
                        <li><Link  to="/" onClick={handleLogoutClick} className='btnnLogout'>Logout</Link></li> {/* Logout button */}
                    </>
                ) : (
                    <>
                        <li><Link to="/login" className='btnn'>Sign in</Link></li> {/* Link to login page */}
                    </>
                )}
            </ul>
        </nav>
    );
};

export default Navbar;
