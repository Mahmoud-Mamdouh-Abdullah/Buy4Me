import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { hideLoading, showLoading } from 'react-redux-loading';
import { BASE_URL, getProductById } from '../utils/api';


const OrderProductItem = (props) => {


    const { dispatch } = props;
    const { _id, qty } = props.product;
    const [productData, setProductData] = useState({
        description: '',
        price: 0
    });


    console.log(productData);


    useEffect(() => {
        dispatch(showLoading());
        getProductById(_id).then(product => {
            setProductData(product);
            dispatch(hideLoading());
        });
    }, [_id, dispatch])

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
                        <span>Quantity :</span>
                        <div className='app-font fw-bold'>{qty}</div>
                    </div>

                    <div className="product-cost">
                        <div className="product-const-container">
                            <div className="cost-dollar-badge">$</div>
                            <span>{productData.price.toFixed(2)}</span>
                        </div>
                    </div>
                </div>

                <div className="bottom-cart-div">
                    <span>{productData.description.substring(0, 70).concat('...')}</span>
                </div>
            </div>
        </div>
    )
}

export default connect()(OrderProductItem);