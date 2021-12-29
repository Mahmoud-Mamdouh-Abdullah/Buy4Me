import React from 'react';
import { FiShoppingCart } from 'react-icons/fi';
import { GiShoppingBag } from 'react-icons/gi';
import { BsPersonCircle } from 'react-icons/bs';
import { MdLogout } from 'react-icons/md';
import { connect } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { removeAuthedUserAction } from '../redux/actions/authedUser';


const Header = (props) => {

    const { authedUser, cart, dispatch } = props;
    const location = useLocation();

    const handleLogoutClick = () => {
        dispatch(removeAuthedUserAction());
    }

    return (
        <nav className="header-container" id="header">
            <div>
                <Link to="/" className="navbar-brand d-flex flex-row justify-content-center">
                    <GiShoppingBag size={24} color="#FFF" className="me-1" />
                    <span className="brand-name">BUY4ME</span>
                </Link>
            </div>

            <div className="text-white">
                <ul className="header-menu">
                    <li className="nav-item hide-sm">
                        <Link to="/" className="nav-link text-white">Home</Link>
                    </li>
                    <li className="nav-item hide-sm">
                        <Link to="#Categories" className="nav-link text-white">Categories</Link>
                    </li>
                    <li className="nav-item hide-sm">
                        <Link to="/#contact-us" className="nav-link text-white">Contact us</Link>
                    </li>
                    <li className="nav-item hide-sm">
                        <Link to="/#footer" className="nav-link text-white">About</Link>
                    </li>

                    {authedUser !== null && (
                        <li className="nav-item cart-container">
                            <span class="notify-badge">{cart.itemsCount}</span>
                            <Link to="/cart" className="nav-link text-white">
                                <FiShoppingCart size={24} />
                            </Link>
                        </li>
                    )}


                    {authedUser === null ? (
                        <li className={"nav-item " + (location.pathname === '/login' ? 'd-none' : '')}>
                            <div className="d-flex flex-column justify-content-center ms-4">
                                <Link to="/login">
                                    <button className="btn-login">Join Now</button>
                                </Link>
                            </div>
                        </li>
                    ) : (
                        <li className="nav-item cart-container">
                            <Link to="/" className='text-white ms-4 d-flex justify-content-center align-items-center gap-3'>
                                <BsPersonCircle size={30} />
                                <span className='header-profile-name'>{authedUser.data.user.name}</span>
                                <MdLogout onClick={handleLogoutClick} size={30} />
                            </Link>
                        </li>
                    )}
                </ul>

            </div>
        </nav>
    )
}

const mapStateToProps = ({ authedUser, cart }) => {
    return {
        authedUser,
        cart
    }
}

export default connect(mapStateToProps)(Header);