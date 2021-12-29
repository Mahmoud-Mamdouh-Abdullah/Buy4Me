import React, { useEffect } from "react";
import { connect } from "react-redux";
import Categories from "./Categories";
import ContactUs from "./ContactUs";
import Landing from "./Landing";
import { handleGetCartAction } from "../redux/actions/cart";


const Home = (props) => {

    const { authedUser, dispatch } = props;

    useEffect(() => {
        if (authedUser !== null) {
            const id = authedUser.data.user._id;
            const token = authedUser.data.token;
            dispatch(handleGetCartAction(id, token));
        }
    })
    return (
        <div>
            <Landing />
            <Categories />
            <ContactUs />
        </div>
    )
}

const mapStateToProps = ({ authedUser }) => {
    return {
        authedUser
    }
}

export default connect(mapStateToProps)(Home);