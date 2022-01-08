import React, { useEffect, useState } from "react";
import { BsHeart, BsHeartFill } from 'react-icons/bs';
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { handleUpdateWishListAction } from "../redux/actions/wishlist";
import { BASE_URL } from "../utils/api";


const ProductItem = (props) => {

    const [isLiked, setLiked] = useState(0);
    const navigate = useNavigate();
    const { product, category, authedUser, wishlist, dispatch } = props;


    useEffect(() => {
        if (authedUser !== null) {
            let check = false;
            wishlist.products_list.forEach(element => {
                if (element._id === product._id) {
                    setLiked(1);
                    check = true;
                }
            });
            if (!check) {
                setLiked(0);
            }
        }
    }, [authedUser, product._id, wishlist]);

    const handleLoveClick = (e) => {
        let token = authedUser.data.token;
        let id = authedUser.data.user._id;
        console.log(token);
        if (isLiked) {
            let newWishList = wishlist.products_list.filter(item => (
                (item._id !== product._id)
            ));
            dispatch(handleUpdateWishListAction(id, { products_list: newWishList }, token));
        } else {
            let newWishList = [...wishlist.products_list, { _id: product._id }];
            dispatch(handleUpdateWishListAction(id, { products_list: newWishList }, token));
        }
    }

    const handleDetailsClick = () => {
        navigate(`/product/${product._id}`, { state: { product, path: category } });
    }


    return (
        <div className="product-container">
            <button
                onClick={handleDetailsClick}
                className="btn-none">
                <img className="fit-image" src={BASE_URL + product.images[0].url} alt="productImage" width="200px" height="200px" />
            </button>
            <button
                onClick={handleDetailsClick}
                className="btn-none d-flex flex-column justify-content-center align-items-center">
                <span className="product-brand-name">{product.brandName}</span>
                <span className="product-item-name p-2">{
                    (product.title.length > 80) ? (product.title.substring(0, 80)).concat('...') : product.title
                }</span>
            </button>
            <button
                onClick={handleDetailsClick}
                className="btn-none">
                <div className="product-item-price-container">
                    <div className="product-item-price">
                        <span className="product-item-price-badge">$</span>
                        <span className="product-item-price-value">{(product.price).toFixed(2)}</span>
                    </div>
                </div>
            </button>
            <button
                className="product-love-icon"
                onClick={handleLoveClick}>
                {isLiked ? (<BsHeartFill color="red" size={24} />) : <BsHeart color="#141414" size={24} />}
            </button>
        </div>
    )
}

const mapStateToProps = ({ authedUser, wishlist }) => {
    return {
        authedUser,
        wishlist,
    }
}

export default connect(mapStateToProps)(ProductItem);