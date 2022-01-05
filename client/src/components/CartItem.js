import React, { useEffect, useState } from "react";
import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai';
import { connect } from "react-redux";
import { BASE_URL, getProductById } from "../utils/api";
import { handleUpdateCartAction } from '../redux/actions/cart';

const CartItem = (props) => {

    const productProp = props.product;
    const { authedUser, cart, dispatch } = props;
    const [productData, setProductData] = useState({});
    const [qty, setQty] = useState(1);


    useEffect(() => {
        setQty(productProp.qty);
        getProductById(productProp._id).then(product => {
            setProductData(product);
        });
    }, [productProp._id, productProp.qty])

    const handleClick = () => {
        const id = authedUser.data.user._id;
        const token = authedUser.data.token;
        let newCart = cart.productList.filter((item) => (
            item._id !== productProp._id
        ));
        dispatch(handleUpdateCartAction(id, { products_list: newCart }, token));
    }

    const handleIncreaseQty = () => {
        const id = authedUser.data.user._id;
        const token = authedUser.data.token;
        setQty(qty + 1);
        let newCart = cart.productList.map((item) => (
            (item._id === productProp._id) ? { ...item, qty: qty + 1 } : item
        ));
        dispatch(handleUpdateCartAction(id, { products_list: newCart }, token));
    }

    const handleDecreaseQty = () => {
        if (qty > 1) {
            const id = authedUser.data.user._id;
            const token = authedUser.data.token;
            setQty(qty - 1);
            let newCart = cart.productList.map((item) => (
                (item._id === productProp._id) ? { ...item, qty: qty - 1 } : item
            ));
            dispatch(handleUpdateCartAction(id, { products_list: newCart }, token));
        }
    }

    return (
        <div className="cart-item">
            <img className="fit-image" src={(productData.images !== undefined) && BASE_URL + productData.images[0].url} alt="product img" width="150" height="150" />
            <div className="parent-up-bottom-cart">
                <div className="up-cart-div">
                    <div className="name-brand-cart">
                        <div className="name-cart">{productData.title}</div>
                        <div className="brand-cart">{productData.brandName}</div>
                    </div>

                    <div className="quantity-div">
                        <span>Quantity</span>
                        <div className="inc-dec-qty">
                            <button
                                onClick={handleIncreaseQty}
                                className="d-flex justify-content-center align-items-center">
                                <AiOutlinePlus size={16} />
                            </button>
                            <div className="item-qty">{qty}</div>
                            <button
                                onClick={handleDecreaseQty}
                                className="d-flex justify-content-center align-items-center">
                                <AiOutlineMinus size={16} />
                            </button>
                        </div>
                    </div>

                    <div className="product-cost">
                        <div className="product-const-container">
                            <div className="cost-dollar-badge">$</div>
                            <span>{productData.price.toFixed(2)}</span>
                        </div>
                    </div>
                </div>

                <div className="bottom-cart-div">
                    <span>{productData.description}</span>
                    <button
                        onClick={handleClick}
                        className="btn-none text-danger">X</button>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = ({ authedUser, cart }) => {
    return {
        authedUser,
        cart,
    }
}

export default connect(mapStateToProps)(CartItem);