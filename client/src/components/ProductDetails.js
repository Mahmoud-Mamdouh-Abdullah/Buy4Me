import React, { useEffect, useState } from "react";
import { FaFacebookF, FaRegHeart, FaTwitter } from "react-icons/fa";
import { BsCart2 } from 'react-icons/bs';
import { BsTruck } from 'react-icons/bs';
import { GiCardPickup } from 'react-icons/gi';
import { RiArrowGoBackLine } from 'react-icons/ri';
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
                    <span className="text-secondary">{product.title}</span>
                </li>
            </ul>

            <div className="details-main-container">

                <div className="details-right-div">

                    <div className="details-image-share">

                        <img className="img-shadow" src={BASE_URL + product.images[0].url} alt="product-img" width={260} height={250} />

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
                            <div className="d-flex flex-column justify-content-center align-items-start">
                                <span className="datails-product-title">{product.title}</span>
                                <span className="details-brand-name">{product.brandName}</span>
                            </div>
                            <FaRegHeart size={24} className="mt-1" />
                        </div>
                        <div className="details-price">
                            <span className="details-price-amount">$ {(product.price).toFixed(2)}</span>
                            <span className="details-price-discount">$ 350.00</span>
                        </div>
                        <span className="details-product-desc">{product.description}</span>

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

                <div className="details-left-div">

                    <div className="details-info-container">
                        <BsTruck className="mt-2" size={24} />
                        <div className="details-info">
                            <span className="info-title">Door Delivery</span>
                            <span className="info-details">Shipping EGP 52
                                Ready for delivery between 14 December & 15 December when you order within next 18hrs 6mins</span>
                        </div>
                    </div>

                    <div className="details-info-container">
                        <GiCardPickup className="mt-2" size={24} />
                        <div className="details-info">
                            <span className="info-title">Pickup Station</span>
                            <span className="info-details">Shipping EGP 11
                                Ready for pickup between 13 December & 22 December when you order within next 14hrs 20mins</span>
                        </div>
                    </div>

                    <div className="details-info-container">
                        <RiArrowGoBackLine className="mt-2" size={24} />
                        <div className="details-info">
                            <span className="info-title">Return Policy</span>
                            <span className="info-details">14 days free return (except for underwear and personal items) up to 30 days for defective products with necessity for requesting a return within 24 hours from the delivery date.</span>
                        </div>
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