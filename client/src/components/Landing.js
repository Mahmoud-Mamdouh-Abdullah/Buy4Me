import React from "react";

const Landing = (porps) => {

    return (
        <div className="banner">
            <div className="shadow">
                <div className="main text-center">
                    <span className="home-title">
                        Buy4Me - Keep Shopping Simple
                    </span>
                    <span className="home-msg">
                        If you’re looking for something new, you’re in the right place.
                        We strive to be industrious and innovative, offering our customers something they want,
                        putting their desires at the top of our priority list.
                    </span>
                    <div className="mt-5 gap-3 btn-container">
                        <button className="btn-home-one">Categories</button>
                        <button className="btn-home-two">Contact us</button>
                        <button className="btn-home-one">About</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Landing;