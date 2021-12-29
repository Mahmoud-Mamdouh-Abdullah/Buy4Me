import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getProductsByCategory } from "../utils/api";
import ProductItem from './ProductItem';
import { connect } from 'react-redux';
import { hideLoading, showLoading } from "react-redux-loading";

const ProductsList = (props) => {

    const [products, setProducts] = useState([]);
    const params = useParams();
    const { dispatch } = props;

    useEffect(() => {
        dispatch(showLoading());
        getProductsByCategory(params.category_name).then(data => {
            setProducts(data.products);
            dispatch(hideLoading());
        });
        window.scrollTo(0, 0);
    }, [dispatch, params.category_name]);

    return (
        <div className="prdoucts-list-main">
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>/</li>
                <li>
                    <span className="text-secondary">{params.category_name}</span>
                </li>
            </ul>
            <div className="products-list">
                {products.map(product => (
                    <ProductItem category={params.category_name} product={product} />
                ))}
            </div>

            <nav aria-label="Page navigation example">
                <ul class="pagination justify-content-center">
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


const mapStateToProps = ({ authedUser }) => {
    return {
        authedUser
    }
}

export default connect(mapStateToProps)(ProductsList);