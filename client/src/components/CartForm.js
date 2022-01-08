import React, { useState } from "react";
import CartItem from "./CartItem";
import { Link, useNavigate } from 'react-router-dom';
import { connect } from "react-redux";
import { makeOrder } from "../utils/api";
import { handleUpdateCartAction } from "../redux/actions/cart";

const CartForm = (props) => {

    const { cart, authedUser, dispatch } = props;
    const productsList = cart.productList || [];
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();

    const handleProceedCheckout = () => {
        let token = authedUser.data.token;
        let id = authedUser.data.user._id;
        let requestBody = {
            products_list: cart.productList,
            amount: cart.total,
            location: authedUser.data.user.address,
            user_id: id
        }
        makeOrder(token, requestBody).then(res => {
            setSuccess(true);
            setTimeout(() => {
                dispatch(handleUpdateCartAction(id, {}, token));
                navigate('/');
            }, 3000);
        }).catch(error => {
            console.log(error);
        })
    }

    return (
        <div className="cart-section" id="cart">

            {success && <div class="p-2 alert alert-success" role="alert">
                Order Confirmation Sucess
            </div>}

            <div className="cart-header">
                <div className="cart-left-header">
                    <span>Your Cart</span>
                    <div className="items-count">{cart.itemsCount} items</div>
                </div>

                <div className="cart-right-header">
                    <div className="items-count">total</div>
                    <div className="totalcost-container">
                        <div className="dollar-badge">$</div>
                        <span>{cart.total.toFixed(2)}</span>
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

                <button className="proceed" data-bs-toggle="modal" data-bs-target="#exampleModal">Proceed to checkout</button>
            </div>

            <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Confirm Order</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            Are you sure you want to confirm your order ?
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Close</button>
                            <button
                                onClick={handleProceedCheckout}
                                type="button"
                                class="btn btn-dark"
                                data-bs-dismiss="modal"
                            >Proceed</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}


const mapStateToProps = ({ authedUser, cart }) => {
    return {
        cart,
        authedUser
    }
}

export default connect(mapStateToProps)(CartForm);