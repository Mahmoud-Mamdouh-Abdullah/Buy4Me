import React from "react";
import CartItem from "./CartItem";
import { Link } from 'react-router-dom';
import { connect } from "react-redux";

const CartForm = (props) => {

    const { cart } = props;
    const productsList = cart.productList || [];

    return (
        <div className="cart-section" id="cart">
            <div className="cart-header">
                <div className="cart-left-header">
                    <span>Your Cart</span>
                    <div className="items-count">{cart.itemsCount} items</div>
                </div>

                <div className="cart-right-header">
                    <div className="items-count">total</div>
                    <div className="totalcost-container">
                        <div className="dollar-badge">$</div>
                        <span>{cart.total}</span>
                    </div>
                </div>
            </div>

            <div className="items-container">
                {productsList.map(product => (
                    <CartItem product={product} />
                ))}

                {productsList.length === 0 && ('Cart Is Empty')}

            </div>

            <div className="cart-footer">
                <Link to="/">
                    <span>Continue shopping</span>
                </Link>

                <button>Proceed to checkout</button>
            </div>
        </div>
    )
}


const mapStateToProps = ({ authedUser, cart }) => {
    return {
        cart
    }
}

export default connect(mapStateToProps)(CartForm);