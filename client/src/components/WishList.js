import React from "react";
import { connect } from "react-redux";
import { HiOutlineArrowNarrowLeft } from 'react-icons/hi';
import WishListItem from "./WishListItem";
import { Link } from 'react-router-dom';
const WishList = (props) => {

    const { wishlist } = props;
    const productsList = wishlist.products_list;

    return (
        <div className="app-font main-wishList">
            <Link
                to='/'
                className="text-black return-to-shopping">
                <HiOutlineArrowNarrowLeft size={25} />
                <span>Continue Shopping</span>
            </Link>
            <span className="wishlist-title">WishList</span>
            <span className="wishlist-count">{productsList.length} Item(s)</span>

            <div className="wishlist-items-div">
                {productsList.map(product => (
                    <WishListItem id={product._id} />
                ))}
            </div>
        </div>
    )
}

const mapStateToProps = ({ authedUser, wishlist }) => {
    return {
        authedUser,
        wishlist,
    }
}

export default connect(mapStateToProps)(WishList);