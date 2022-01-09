import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getProductsByCategory } from "../utils/api";
import ProductItem from './ProductItem';
import { connect } from 'react-redux';
import { hideLoading, showLoading } from "react-redux-loading";

const ProductsList = (props) => {

    const [products, setProducts] = useState({
        docs: []
    });
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


    const handlePrevPageClick = () => {
        getProductsByCategory(params.category_name, products.prevPage).then(data => {
            setProducts(data.products);
            dispatch(hideLoading());
        });
        window.scrollTo(0, 0);
    }

    const handleNextPageClick = () => {
        getProductsByCategory(params.category_name, products.nextPage).then(data => {
            setProducts(data.products);
            dispatch(hideLoading());
        });
        window.scrollTo(0, 0);
    }

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
                {products.docs.map(product => (
                    <ProductItem category={params.category_name} product={product} />
                ))}
            </div>

            {(products.hasPrevPage !== false || products.hasNextPage !== false) ? (
                <nav aria-label="Page navigation example">
                    <ul class="pagination justify-content-center">
                        <li className={"page-item " + (products.hasPrevPage ? '' : 'disabled')}>
                            <button onClick={handlePrevPageClick} class="btn-none page-link">Previous</button>
                        </li>
                        <li className={"page-item " + (products.hasNextPage ? '' : 'disabled')}>
                            <button onClick={handleNextPageClick} class="btn-none page-link" href="/">Next</button>
                        </li>
                    </ul>
                </nav>
            ) : ''}
        </div>
    )
}


const mapStateToProps = ({ authedUser }) => {
    return {
        authedUser
    }
}

export default connect(mapStateToProps)(ProductsList);