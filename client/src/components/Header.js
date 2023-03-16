import React from 'react';
import { FiShoppingCart } from 'react-icons/fi';
import { GiShoppingBag } from 'react-icons/gi';
import { MdLogout } from 'react-icons/md';
import { connect } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { removeAuthedUserAction } from '../redux/actions/authedUser';
import defaultImage from '../assets/images/default_user_white.png';
import { BASE_URL } from '../utils/api';

const Header = (props) => {

    const { authedUser, cart, dispatch } = props;
    const location = useLocation();
    const navigate = useNavigate();

    const handleLogoutClick = () => {
        dispatch(removeAuthedUserAction());
        navigate('/login');
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
                        <Link to="/#Categories" className="nav-link text-white">Categories</Link>
                    </li>
                    <li className="nav-item hide-sm">
                        <Link to="/#contact-us" className="nav-link text-white">Contact us</Link>
                    </li>
                    <li className="nav-item hide-sm">
                        <Link to="/#footer" className="nav-link text-white">About</Link>
                    </li>

                    {authedUser !== null && (
                        <li className="nav-item cart-container">
                            <span class="notify-badge">{cart.itemsCount | 0}</span>
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
                        <li className="nav-item d-flex flex-row justify-content-center align-items-center gap-3">
                            <div class="dropdown">
                                <button
                                    id="dropdownMenuButton1"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                    className='btn-none text-white ms-4 d-flex justify-content-center align-items-center gap-3'>
                                    <img
                                        className='fit-image'
                                        style={{ border: '1px solid #6c6c6c', borderRadius: '20px', padding: '3px' }}
                                        src={(authedUser.data.user.imgUrl === null) ? defaultImage :
                                            (BASE_URL + authedUser.data.user.imgUrl)}
                                        alt='default'
                                        width='30px'
                                        height='30px' />
                                    <span className='header-profile-name'>{authedUser.data.user.name}</span>
                                </button>
                                <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                    <li>
                                        <Link className='dropdown-item app-font' to="/orders">Orders</Link>
                                    </li>
                                    <li>
                                        <Link to='/wishlist' class="dropdown-item app-font">WishList</Link>
                                    </li>
                                    <li>
                                        <Link to='/profile' class="dropdown-item app-font">My Profile</Link>
                                    </li>
                                </ul>
                            </div>
                            <button onClick={handleLogoutClick} className='btn-none'>
                                <MdLogout size={25} />
                            </button>
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