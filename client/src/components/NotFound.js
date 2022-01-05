import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
    return (
        <div>

            <div
                className="d-flex flex-column justify-content-center"
                id="main"
                style={{
                    height:'calc(100vh - 60px)'
                }}>
                <span className="fw-bold text-danger" style={{ fontSize: "120px" }}>404</span>
                <span className="fw-bold" style={{ fontSize: "50px" }}>That page doesn't exist!</span>
                <span style={{ fontSize: "20px" }}>Sorry, the page you were looking for couldn't be found.</span>
                <Link to="/">Visit Home Page</Link>
            </div>
        </div>
    )
}

export default NotFound;