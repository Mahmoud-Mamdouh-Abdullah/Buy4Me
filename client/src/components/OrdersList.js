import React from "react";
import OrdersListItem from "./OrdersListItem";


const OrdersList = (props) => {
    const test = [1, 2, 3];
    return (
        <div className='orders-section'>
            <div className="orders-title-container">
                <span className="orders-title">Your Orders</span>
                <span className="orders-count">3 order(s)</span>
            </div>

            {test.map(n => (
                <OrdersListItem />
            ))}

            <nav aria-label="Page navigation example">
                <ul class="pagination justify-content-center mt-4">
                    <li class="page-item"><a class="page-link" href="/">Previous</a></li>
                    <li class="page-item"><a class="page-link" href="/">1</a></li>
                    <li class="page-item"><a class="page-link" href="/">2</a></li>
                    <li class="page-item"><a class="page-link" href="/">3</a></li>
                    <li class="page-item"><a class="page-link" href="/">Next</a></li>
                </ul>
            </nav>
        </div>
    )
}


export default OrdersList;