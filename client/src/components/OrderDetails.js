import React from "react";
import { connect } from "react-redux";
import { useLocation } from "react-router-dom";
import { formatDate } from "../utils/helpers";
import OrderProductItem from "./OrderProductItem";


const OrderDetails = (props) => {

    const location = useLocation();
    const { order } = location.state;

    console.log(order);

    return (
        <div className="cart-section" id="cart">
            <div className="cart-header">
                <div className="cart-left-header">
                    <span>Your Order</span>
                    <div className="items-count">{order.products_list.length} item(s)</div>
                </div>

                <div className="cart-right-header">
                    <div className="items-count">total</div>
                    <div className="totalcost-container">
                        <div className="dollar-badge">$</div>
                        <span>{order.amount.toFixed(2)}</span>
                    </div>
                </div>
            </div>

            <div className="items-container">
                {order.products_list.map((item) => (
                    <OrderProductItem product={item} />
                ))}
            </div>

            <div className="app-font fs-5 d-flex flex-row justify-content-between flex-wrap mt-4">
                <div>
                    <span className="fw-bold">Location :</span>
                    <span>&nbsp;{order.location.substring(0, 50)}</span>
                </div>

                <div>
                    <span className="fw-bold">Order Date :</span>
                    <span>&nbsp;{formatDate(order.updated_at)}</span>
                </div>
            </div>
        </div>
    )
}


export default connect()(OrderDetails);