import { connect } from "react-redux";
import React, { useEffect, useState } from "react";
import { getUserOrders } from "../utils/api";
import OrdersListItem from "./OrdersListItem";
import { hideLoading, showLoading } from "react-redux-loading";


const OrdersList = (props) => {

    const { authedUser, dispatch } = props;
    const [orders, setOrders] = useState({
        orders: [],
        count: 0
    });


    useEffect(() => {
        const id = authedUser.data.user._id;
        const token = authedUser.data.token;

        dispatch(showLoading());
        getUserOrders(token, id).then((orders) => {
            setOrders(orders);
            dispatch(hideLoading());
        }).catch(e => {
            alert(e.message);
        })


    }, [authedUser.data.token, authedUser.data.user._id, dispatch])

    return (
        <div className='orders-section'>
            <div className="orders-title-container">
                <span className="orders-title">Your Orders</span>
                <span className="orders-count">{orders.count} order(s)</span>
            </div>
            {orders.orders.sort((a, b) => {
                return (a.created_at < b.created_at) ? 1 : ((a.created_at > b.created_at) ? -1 : 0);
            }).map(order => (
                <OrdersListItem order={order} />
            ))}

            {orders.count > 3 && (
                <nav aria-label="Page navigation example">
                    <ul class="pagination justify-content-center mt-4">
                        <li class="page-item"><a class="page-link" href="/">Previous</a></li>
                        <li class="page-item"><a class="page-link" href="/">1</a></li>
                        <li class="page-item"><a class="page-link" href="/">2</a></li>
                        <li class="page-item"><a class="page-link" href="/">3</a></li>
                        <li class="page-item"><a class="page-link" href="/">Next</a></li>
                    </ul>
                </nav>
            )}
        </div>
    )
}

const mapStateToProps = ({ authedUser }) => {
    return {
        authedUser
    }
}

export default connect(mapStateToProps)(OrdersList);