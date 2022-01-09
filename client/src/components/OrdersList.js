import { connect } from "react-redux";
import React, { useEffect, useState } from "react";
import { getUserOrders } from "../utils/api";
import OrdersListItem from "./OrdersListItem";
import { hideLoading, showLoading } from "react-redux-loading";


const OrdersList = (props) => {

    const { authedUser, dispatch } = props;
    const [orders, setOrders] = useState({
        docs: [],
        hasPrevPage: false,
        hasNextPage: false
    });


    useEffect(() => {
        const id = authedUser.data.user._id;
        const token = authedUser.data.token;

        dispatch(showLoading());
        getUserOrders(token, id).then((data) => {
            console.log(data.orders);
            setOrders(data.orders);
            dispatch(hideLoading());
        }).catch(e => {
            alert(e.message);
        })


    }, [authedUser.data.token, authedUser.data.user._id, dispatch]);


    const handlePrevPageClick = () => {
        const id = authedUser.data.user._id;
        const token = authedUser.data.token;

        dispatch(showLoading());
        getUserOrders(token, id, orders.prevPage).then((data) => {
            setOrders(data.orders);
            dispatch(hideLoading());
        }).catch(e => {
            alert(e.message);
        });
    }

    const handleNextPageClick = () => {
        const id = authedUser.data.user._id;
        const token = authedUser.data.token;

        dispatch(showLoading());
        getUserOrders(token, id, orders.nextPage).then((data) => {
            setOrders(data.orders);
            dispatch(hideLoading());
        }).catch(e => {
            alert(e.message);
        });
    }

    return (
        <div className='orders-section'>
            <div className="orders-title-container">
                <span className="orders-title">Your Orders</span>
                <span className="orders-count">{orders.docs.length} order(s)</span>
            </div>
            {orders.docs.map(order => (
                <OrdersListItem order={order} />
            ))}


            {(orders.hasNextPage === false && orders.hasPrevPage === false) ? '' :
                (<nav aria-label="Page navigation example">
                    <ul class="gap-2 pagination justify-content-center mt-4">
                        <li className={"page-item " + (orders.hasPrevPage ? '' : 'disabled')}>
                            <button onClick={handlePrevPageClick} class="btn-none page-link">Previous</button>
                        </li>
                        <li className={"page-item " + (orders.hasNextPage ? '' : 'disabled')}>
                            <button onClick={handleNextPageClick} class="btn-none page-link" href="/">Next</button>
                        </li>
                    </ul>
                </nav>)}
        </div>
    )
}

const mapStateToProps = ({ authedUser }) => {
    return {
        authedUser
    }
}

export default connect(mapStateToProps)(OrdersList);