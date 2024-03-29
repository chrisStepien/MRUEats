import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout, reset } from '../features/auth/authSlice';
import React, { useState } from 'react'
import Hamburger from "./Hamburger"
import '../styles/Header.css'

function Header() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);

    const [hamburgerOpen, setHamburgerOpen] = useState(false);

    const toggleHamburger = () => {
        setHamburgerOpen(!hamburgerOpen);
    }

    const onLogout = () => {

        dispatch(logout());
        dispatch(reset());
        navigate('/');

    }

    return (
        <>
            <header className='header'>
                <h1><Link to='/'>MRU EATS</Link></h1>
                <ul className="menu-header">
                    {user ? (<>
                        <li><Link to='/account'>Account</Link></li>
                        {user.isAdmin ? (<li><Link to='/admin'>Admin</Link></li>) : ""}
                        {user.isCourier ? (<li><Link to='/courier'>Courier</Link></li>) : ""}
                        <li><a className='btn' onClick={onLogout}>Logout</a></li>

                    </>) : (<>
                        <li><Link to='/login'>Login</Link></li>
                        <li><Link to='/register'>Register</Link></li>
                    </>)}
                </ul>
                <div className="hamburger" onClick={toggleHamburger}>
                    <Hamburger />
                </div>
            </header>
            <div className="locationInfo">
                {user ? (<>
                    <p>Delivering to: {user.deliverTo == null ? ("Please set a delivery location") : user.deliverTo}</p>
                </>) : (
                    <p>Feeding hungry cougars one meal at a time.</p>
                )}
            </div>
            <style jsx="true">{`
                
                .menu-header{
                    display:flex;
                    flex-wrap: wrap;
                    justify-content: flex-end;
                    margin: 0px;
                    padding: 0px;
                    overflow: hidden;
                    z-index: 20;
                }
                .menu-header li{
                    list-style-type: none;
                    padding-right: 10px;
                }
                .hamburger{
                    display: none;
                    z-index: 6;
                } 
                @media (max-width: 767px){
                  
                    .hamburger{
                        z-index: 6;
                        margin-right: 10px;
                        align-self: center;
                        display:flex;
                        position:absolute;
                        right: 0;
                        top: 6px;
                        width:30px;
                        height:30px;
                    }
                
                   
                    .menu-header{
                        display: ${hamburgerOpen ? 'flex' : 'none'};
                        flex-direction: column;
                        background-color: #033453;
                        height: fit-content;
                        font-size: 20px;
                        width: 100vw;
                        top: 96px;
                        right: 0;
                        justify-content: flex-start;
                        position: absolute;
                        
                    }
                    
                }
            `}</style>
        </>
    )
}

export default Header