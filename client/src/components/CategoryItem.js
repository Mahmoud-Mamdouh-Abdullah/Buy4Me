import React from "react";
import { Link } from "react-router-dom";
import { BASE_URL } from "../utils/api";


const CategoryItem = (props) => {

    const { name, imgUrl } = props.categoryItem;

    return (
        <Link to={`products/${name}`}>
            <div className="cat-item">
                <img src={BASE_URL + imgUrl} alt="cat-item" width="250" height="200" />
                <div className="cat-name-container">
                    <span className="cat-name">{name}</span>
                </div>
            </div>
        </Link>
    )
}

export default CategoryItem;