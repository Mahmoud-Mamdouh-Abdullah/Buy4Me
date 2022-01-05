import React, { useEffect, useState } from "react";
import { FaFacebookF, FaRegHeart, FaTwitter } from "react-icons/fa";
import { BsCart2 } from 'react-icons/bs';
import { MdRemoveShoppingCart } from 'react-icons/md';
import { Link, useLocation } from "react-router-dom";
import { BASE_URL } from "../utils/api";
import { connect } from "react-redux";
import { handleUpdateCartAction } from '../redux/actions/cart';



const ProductDetails = (props) => {

    const { authedUser, cart, dispatch } = props;
    const [inCart, setInCart] = useState(false);
    const { product, path } = useLocation().state;

    useEffect(() => {
        if (authedUser !== null) {
            let check = false;
            cart.productList.forEach(element => {
                if (element._id === product._id) {
                    setInCart(true);
                    check = true;
                }
            });
            if (!check) {
                setInCart(false);
            }
        }
    }, [authedUser, cart.productList, product._id]);


    const handleAddToCart = () => {
        const id = authedUser.data.user._id;
        const token = authedUser.data.token;
        let newCart = [...cart.productList, { _id: product._id, qty: 1 }];
        dispatch(handleUpdateCartAction(id, { products_list: newCart }, token));
    }

    const handleRemoveFromCart = () => {
        const id = authedUser.data.user._id;
        const token = authedUser.data.token;
        let newCart = cart.productList.filter((item) => (
            item._id !== product._id
        ));
        dispatch(handleUpdateCartAction(id, { products_list: newCart }, token));
    }

    const formatTitle = (title) => {
        if (title.length > 50) {
            title = title.substring(0, 50).concat('...');
        }
        return title;
    }

    return (
        <div className="product-details-container">
            <ul className="">
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>/</li>
                <li>
                    <Link to={`/products/${path}`}>{path}</Link>
                </li>
                <li>/</li>
                <li>
                    <span className="text-secondary">{formatTitle(product.title)}</span>
                </li>
            </ul>

            <div className="details-main-container">

                <div className="details-right-div">

                    <div className="details-image-share">

                        <img className="fit-image" src={BASE_URL + product.images[0].url} alt="product-img" width={350} height={350} />

                        <div className="share-icons-container">
                            <span>SHARE THIS PRODUCT</span>
                            <div className="d-flex gap-2">
                                <div className="details-share-icon">
                                    <FaFacebookF className="share-icon" />
                                </div>

                                <div className="details-share-icon">
                                    <FaTwitter className="share-icon" />
                                </div>
                            </div>
                        </div>

                    </div>

                    <div className={"rest-details " + (authedUser === null ? "justify-content-start gap-5" : 'justify-content-between')}>
                        <div className="details-title-love">
                            <div className="details-title-brand">
                                <span className="datails-product-title">{product.title}</span>
                                <span className="details-brand-name">{product.brandName}</span>
                            </div>
                            <FaRegHeart size="25px" className="mt-1" />
                        </div>
                        <div className="details-price">
                            <span className="details-price-amount">$ {(product.price).toFixed(2)}</span>
                            <span className="details-price-discount">$ 350.00</span>
                        </div>
                        <span className="details-product-desc">{
                            (product.description.length > 500) ? (
                                <span>{product.description.substring(0, 500).concat('... ')}
                                    <button className="btn-none text-primary">see more</button></span>
                            ) : product.description
                        }</span>

                        {(!inCart && authedUser !== null) && (
                            <button
                                onClick={handleAddToCart}
                                className="details-add-cart">ADD TO CART
                                <BsCart2 size={24} className="details-add-cart-icon" />
                            </button>
                        )}


                        {(inCart && authedUser !== null) && (
                            <button
                                onClick={handleRemoveFromCart}
                                className="details-add-cart">REMOVE FROM CART
                                <MdRemoveShoppingCart size={24} className="details-add-cart-icon" />
                            </button>
                        )}

                    </div>

                </div>

            </div>

        </div>
    )
}

const mapStateToProps = ({ authedUser, cart }) => {
    return {
        authedUser,
        cart
    }
}

export default connect(mapStateToProps)(ProductDetails);