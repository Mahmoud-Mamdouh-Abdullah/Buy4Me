import React from "react";
import { useNavigate } from 'react-router-dom';
import { formatDate } from "../utils/helpers";

const OrdersListItem = (props) => {

    const { order } = props;
    const navigate = useNavigate();


    const handleShowOrderDetails = () => {
        navigate(`/orders/id/${order._id}`, { state: { order } });
    }

    return (
        <div className="order-item text-black">
            <div className="order-item-top">

                <div className="order-id-div">
                    <span className="order-detail-title">Order ID</span>
                    <span>{order._id}</span>
                </div>

                <div className="order-date-div">
                    <span className="order-detail-title">Order Date</span>
                    <span>{formatDate(order.created_at)}</span>
                </div>

            </div>

            <div className="order-item-bottom">
                <div>
                    <span className="order-detail-title">Location : </span>
                    <span>{order.location}</span>
                </div>

                <div className="order-bottom-status">
                    <button
                        onClick={handleShowOrderDetails}
                        className="show-more">Show Details</button>
                </div>
            </div>
        </div>
    )
}


export default OrdersListItem;