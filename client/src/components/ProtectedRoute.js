import React from "react";
import { connect } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";


const ProtectedRoute = ({ component: Component, authedUser, ...restProps }) => {

    const location = useLocation();

    return (
        (authedUser !== null) ? <Component {...restProps} /> :
            <Navigate
                to="/login"
                state={location.pathname} />
    )
}


const mapStateToProps = ({ authedUser }) => {
    return {
        authedUser
    }
}

export default connect(mapStateToProps)(ProtectedRoute);