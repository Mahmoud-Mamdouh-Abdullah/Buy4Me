import React, { useState } from 'react';
import { BsPersonFill } from 'react-icons/bs';
import { RiLockPasswordFill } from 'react-icons/ri';
import { MdEmail, MdLocationOn } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { register } from '../utils/api';
import { connect } from 'react-redux';
import { hideLoading, showLoading } from 'react-redux-loading';

const Registration = (props) => {

    const { dispatch } = props;
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [address, setAddress] = useState('');
    const [success, setSuccess] = useState(false);


    const handleInputChange = (e) => {
        switch (e.target.name) {
            case 'name': {
                setName(e.target.value);
                break;
            }
            case 'email': {
                setEmail(e.target.value);
                break;
            }
            case 'password': {
                setPassword(e.target.value);
                break;
            }
            case 'address': {
                setAddress(e.target.value);
                break;
            }
            default:
                break;
        }
    }


    const handleRegisterClick = () => {
        dispatch(showLoading());
        register({
            name,
            email,
            password,
            address
        }).then(user => {
            setSuccess(true);
            setTimeout(() => {
                setSuccess(false);
                dispatch(hideLoading());
            }, 2000)
        })
    }

    return (
        <div className="login-sec">
            <div className="d-flex flex-column">

                {success && (
                    <div class="p-2 alert alert-success" role="alert">
                        Registration Success
                    </div>
                )}

                <span className="login-title-one">Register Now !</span>
                <span className="login-title-two">Create your account and enjoy shopping</span>
            </div>
            <div className="login-input-div">
                <div className="login-input-container">
                    <input
                        onChange={handleInputChange}
                        name='name'
                        value={name}
                        type="text"
                        placeholder="Mahmoud M." />
                    <div className="login-icon-backgroung">
                        <BsPersonFill size={24} color="#FFF" />
                    </div>
                </div>

                <div className="login-input-container mt-4">
                    <input
                        onChange={handleInputChange}
                        name='email'
                        value={email}
                        type="email"
                        placeholder="example@gmail.com" />
                    <div className="login-icon-backgroung">
                        <MdEmail size={24} color="#FFF" />
                    </div>
                </div>

                <div className="login-input-container mt-4">
                    <input
                        onChange={handleInputChange}
                        name='password'
                        value={password}
                        type="password"
                        placeholder="Abc1234..." />
                    <div className="login-icon-backgroung">
                        <RiLockPasswordFill size={24} color="#FFF" />
                    </div>
                </div>

                <div className="login-input-container mt-4">
                    <input
                        onChange={handleInputChange}
                        name='address'
                        value={address}
                        type="text"
                        placeholder="22 st Cairo, Egypt" />
                    <div className="login-icon-backgroung">
                        <MdLocationOn size={24} color="#FFF" />
                    </div>
                </div>

            </div>

            <div className="login-buttons-container">
                <button
                    onClick={handleRegisterClick}
                    className="login-page-btn"
                >Register Now</button>
                <Link to="/login" className="login-regis-link">
                    <span>Already have account?</span>
                </Link>
            </div>
        </div>
    )
}

export default connect()(Registration);