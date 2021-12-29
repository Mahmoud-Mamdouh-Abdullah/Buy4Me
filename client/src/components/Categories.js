import React, { useEffect, useState } from "react";
import CategoryItem from "./CategoryItem";
import { getCategories } from "../utils/api";
import { showLoading, hideLoading } from "react-redux-loading";
import { connect } from "react-redux";




const Categories = (props) => {

    const [categories, setCategories] = useState([]);
    const { dispatch } = props;

    useEffect(() => {
        dispatch(showLoading());
        getCategories().then(data => {
            setCategories(data);
            dispatch(hideLoading());
        })
    }, [dispatch])

    return (
        <div id="Categories" className="categories-section">
            <span className="category-title">SEE ALL OUR COLLECTIONS NOW</span>
            <div className="items-container">
                {categories.map((item, index) => (
                    <CategoryItem categoryItem={item} />
                ))}
            </div>
        </div>
    )
}

export default connect()(Categories);