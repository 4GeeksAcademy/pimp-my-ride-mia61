import React, {useContext, useState, useEffect } from 'react';
import { Context } from "../store/appContext"
import { Link, useNavigate } from 'react-router-dom';
import "../../styles/Navbar.css";
import { Button } from '../pages/Button';


function Navbar() {
    const [click, setClick] = useState(false);
    const [button, setButton] = useState(true);
    const {isLoggedIn, setIsLoggedIn} = useState(false);
    const navigate = useNavigate();
    const [isMounted, setIsMounted] = useState(false);
    const { store, actions } = useContext(Context);

    const handleClick = () => setClick(!click);
    const closeMobileMenu = () => setClick(false);

    const showButton = () => {
        if (window.innerWidth <= 960) {
            setButton(false);
        } else {
            setButton(true);
        }
    };

    const handleLogout = () => {
        actions.logUserOut();
        console.log('Logged out');
        navigate('/');
    }



    useEffect(() => {
        window.addEventListener("resize", showButton);
        showButton(); 
        return () => window.removeEventListener("resize", showButton);
    }, []);

    return (
        <>
            <nav className="navbar">
                <div className="navbar-container">
                    <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
                        PIMP MY RIDE <i className='fab fa-typo3 navbar-logo' />
                    </Link>
                    <div className="menu-icon" onClick={handleClick}>
                        <i className={click ? "fas fa-times" : "fas fa-bars"} />
                    </div>
                    <ul className={click ? "nav-menu active" : "nav-menu"}>
                        <li className="nav-item">
                            <Link to="/" className="nav-links" onClick={closeMobileMenu}>
                                Home
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/services" className="nav-links" onClick={closeMobileMenu}>
                                Our Advanteges
                            </Link>
                        </li>
                        {/* <li className="nav-item">
                            <Link to="/products" className="nav-links" onClick={closeMobileMenu}>
                                Products
                            </Link>
                        </li> */}
                    </ul>
                    {store.isLoggedIn ? (
                        <Button buttonStyle="btn--outline" onClick={handleLogout}>
                        LOG OUT
                        </Button>
                    ) : (
                        button && (
                         <Button buttonStyle="btn--outline" onClick={() => navigate('/customer-signup')}>
                        SIGN UP
                        </Button>
                         )
                        )}
                </div>
            </nav>
        </>
    );
}

export default Navbar;