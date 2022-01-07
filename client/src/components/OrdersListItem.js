import React from "react";
import { Link } from 'react-router-dom';

const OrdersListItem = (props) => {
    return (
        <Link to='/' className="order-item text-black">
            <div className="order-item-top">

                <div className="order-id-div">
                    <span className="order-detail-title">Order ID</span>
                    <span>61d602d521b9069c2c47cd94</span>
                </div>

                <div className="order-date-div">
                    <span className="order-detail-title">Order Date</span>
                    <span>Mon, 07-02-2022</span>
                </div>

            </div>

            <div className="order-item-bottom">
                <div>
                    <span className="order-detail-title">Location : </span>
                    <span>Shubra El-Khiema Awal, Cairo</span>
                </div>

                <div className="order-bottom-status">
                    <span className="order-detail-title">Status : </span>
                    <span>Pending</span>
                </div>
            </div>
        </Link>
    )
}


export default OrdersListItem;