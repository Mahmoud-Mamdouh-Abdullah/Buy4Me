import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { BASE_URL, getProductById } from "../utils/api";
import { hideLoading, showLoading } from "react-redux-loading";
import { handleUpdateWishListAction } from "../redux/actions/wishlist";
import { handleUpdateCartAction } from "../redux/actions/cart";

const WishListItem = (props) => {

    const { id, authedUser, wishlist, cart, dispatch } = props;
    const [inCart, setInCart] = useState(false);
    const [data, setData] = useState({
        images: [{
            url: ''
        }],
        price: 0,
        title: '',
        brandName: ''
    });

    useEffect(() => {
        dispatch(showLoading());
        getProductById(id).then(product => {
            console.log(product);
            setData(product);
            dispatch(hideLoading());
        });

        let cartCheck = false;
        cart.productList.forEach(element => {
            if (element._id === id) {
                setInCart(true);
                cartCheck = true;
            }
        });
        if (!cartCheck) {
            setInCart(false);
        }

    }, [cart.productList, dispatch, id]);


    const handleRemoveFromWishList = () => {
        let token = authedUser.data.token;
        let userId = authedUser.data.user._id;
        let newWishList = wishlist.products_list.filter(item => (
            (item._id !== id)
        ));
        console.log(newWishList);
        dispatch(handleUpdateWishListAction(userId, { products_list: newWishList }, token));
    }


    const handleCartClick = () => {
        if (inCart) {
            //remove from cart
            const userId = authedUser.data.user._id;
            const token = authedUser.data.token;
            let newCart = cart.productList.filter((item) => (
                item._id !== id
            ));
            dispatch(handleUpdateCartAction(userId, { products_list: newCart }, token));
        } else {
            //add to cart
            const userId = authedUser.data.user._id;
            const token = authedUser.data.token;
            let newCart = [...cart.productList, { _id: id, qty: 1 }];
            dispatch(handleUpdateCartAction(userId, { products_list: newCart }, token));
        }
    }


    return (
        <div className="wishlist-item">
            <img className="fit-image" src={(data.images !== []) && BASE_URL + data.images[0].url} alt="test" height="140px" />
            <div className="wish-title-brand-price">
                <span className="text-start">{
                    data.title.length > 65 ?
                        data.title.substring(0, 65).concat('...')
                        : data.title}
                    {data.title.length < 38 ? (<pre />) : ''
                    }
                </span>
                <span className="fw-bold" >{data.brandName}</span>
                <span>${data.price.toFixed(2)}</span>
            </div>
            <button
                onClick={handleCartClick}
                className="wish-move-cart">{inCart ? 'Remove From Cart' : 'Move To Cart'}</button>
            <button
                onClick={handleRemoveFromWishList}
                className="btn-none wish-remove">Remove</button>
        </div>
    )
}

const mapStateToProps = ({ authedUser, wishlist, cart }) => {
    return {
        authedUser,
        wishlist,
        cart
    }
}

export default connect(mapStateToProps)(WishListItem);