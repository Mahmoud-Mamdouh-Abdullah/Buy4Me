import React, { useState } from "react";
import { BsHeart, BsHeartFill } from 'react-icons/bs';
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/api";


const ProductItem = (props) => {

    const [isLiked, setLiked] = useState(0);
    const navigate = useNavigate();
    const { product, category } = props;


    const handleLoveClick = (e) => {
        isLiked ? setLiked(0) : setLiked(1);
    }

    const handleDetailsClick = () => {
        navigate(`/product/${product._id}`, { state: { product, path: category } });
    }


    return (
        <div className="product-container">
            <button
                onClick={handleDetailsClick}
                className="btn-none">
                <img src={BASE_URL + product.images[0].url} alt="productImage" width="200px" height="200px" />
            </button>
            <button
                onClick={handleDetailsClick}
                className="btn-none d-flex flex-column justify-content-center align-items-center">
                <span className="product-brand-name">{product.brandName}</span>
                <span className="product-item-name p-2">{
                    (product.title.length > 80) ? (product.title.substring(0, 80)).concat('...') : product.title
                }</span>
            </button>
            <button
                onClick={handleDetailsClick}
                className="btn-none">
                <div className="product-item-price-container">
                    <div className="product-item-price">
                        <span className="product-item-price-badge">$</span>
                        <span className="product-item-price-value">{(product.price).toFixed(2)}</span>
                    </div>
                </div>
            </button>
            <button
                className="product-love-icon"
                onClick={handleLoveClick}>
                {isLiked ? (<BsHeartFill color="red" size={24} />) : <BsHeart color="#141414" size={24} />}
            </button>
        </div>
    )
}

export default ProductItem;