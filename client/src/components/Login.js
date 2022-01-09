import React, { useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { BsPersonFill } from 'react-icons/bs';
import { RiLockPasswordFill } from 'react-icons/ri';
import { connect } from 'react-redux';
import { handleLogin } from "../redux/actions/authedUser";

const Login = (props) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { dispatch, authedUser } = props;
    const navigate = useNavigate();



    useEffect(() => {
        (authedUser !== null && navigate('/'));
    }, [authedUser, navigate]);

    const handleInputChange = (e) => {
        switch (e.target.name) {
            case 'email': {
                setEmail(e.target.value);
                break;
            }
            case 'password': {
                setPassword(e.target.value);
                break;
            }
            default:
                break;
        }
    }

    const handleLoginClick = () => {
        dispatch(handleLogin(email, password));
    }

    return (
        <div className="login-sec">
            <div className="d-flex flex-column">
                <span className="login-title-one">Welcome Back!</span>
                <span className="login-title-two">Login to Continue</span>
            </div>
            <div className="login-input-div">
                <div className="login-input-container">
                    <input
                        onChange={handleInputChange}
                        name="email"
                        value={email}
                        type="text"
                        placeholder="example@gmail.com"
                    />
                    <div className="login-icon-backgroung">
                        <BsPersonFill size={24} color="#FFF" />
                    </div>
                </div>

                <div className="login-input-container mt-4">
                    <input
                        onChange={handleInputChange}
                        name="password"
                        value={password}
                        type="password"
                        placeholder="Abc1234..."
                    />
                    <div className="login-icon-backgroung">
                        <RiLockPasswordFill size={24} color="#FFF" />
                    </div>
                </div>

                <Link to="/" className="forget-pass-link">
                    <span>Forget Password ?</span>
                </Link>
            </div>

            <div className="login-buttons-container">
                <button
                    onClick={handleLoginClick}
                    className="login-page-btn"
                >Login</button>
                <Link to="/register" className="login-regis-link">
                    <span>Don't have an account?</span>
                </Link>
            </div>
        </div>
    )
}

const mapStateToProps = ({ authedUser }) => {
    return {
        authedUser
    }
}

export default connect(mapStateToProps)(Login);