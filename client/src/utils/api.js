export const BASE_URL = 'http://localhost:5000/';


export const login = async (email, password) => {
    try {
        const res = await fetch(BASE_URL + 'users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email,
                password
            })
        });

        return await res.json();
    } catch (e) {
        return e.message;
    }
}

export const register = async (userObject) => {
    try {
        const res = await fetch(BASE_URL + 'users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userObject)
        });

        return (await res.json());
    } catch (e) {
        return e.message
    }
}

export const uploadImage = async (id, imageFile) => {
    let formData = new FormData();
    formData.append('imgUrl', imageFile);
    console.log(imageFile);
    try {
        const res = await fetch(BASE_URL + `users/uploadImg/${id}`, {
            method: 'PUT',
            body: formData
        })

        return await res.json();
    } catch (e) {
        return e.message;
    }
}

export const updataUserData = async (id, data) => {
    try {
        const res = await fetch(BASE_URL + `users/update/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        return (await res.json());
    } catch (e) {
        return e.message;
    }
}

export const getCategories = async () => {
    try {
        const res = await fetch(BASE_URL + 'categories', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        });

        return await res.json();
    } catch (e) {
        return e.message
    }
}

export const getProductsByCategory = async (category) => {
    try {
        const res = await fetch(BASE_URL + `products/category/${category}`);
        const productsDate = await res.json();
        return productsDate;
    } catch (e) {
        return e.message;
    }
}

export const getProductById = async (productId) => {
    try {
        const res = await fetch(BASE_URL + `products/id/${productId}`);
        return (await res.json());
    } catch (e) {
        return e.message;
    }
}

export const getCart = async (userId, token) => {
    try {
        const res = await fetch(BASE_URL + 'cart/id/' + userId, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                token
            }
        });

        return await res.json();

    } catch (e) {
        return e.message;
    }
}

export const updateCart = async (userId, products, token) => {
    try {
        const res = await fetch(BASE_URL + 'cart/id/' + userId, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                token
            },
            body: JSON.stringify(products)
        });

        return await res.json();

    } catch (e) {
        return e.message;
    }
}


export const updateWishList = async (userId, products, token) => {
    console.log(products);
    try {
        const res = await fetch(BASE_URL + `wishlist/id/${userId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                token
            },
            body: JSON.stringify(products)
        });

        return await res.json();
    } catch (e) {
        return e.message;
    }
}

export const getWishList = async (userId, token) => {
    try {
        const res = await fetch(BASE_URL + `wishlist/id/${userId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                token
            },
        });

        return await res.json();
    } catch (e) {
        return e.message;
    }
}

export const makeOrder = async (token, requestBody) => {
    try {
        const res = await fetch(BASE_URL + 'orders', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                token
            },
            body: JSON.stringify(requestBody)
        });

        return await res.json();
    } catch (e) {
        return e.message;
    }
}

export const getUserOrders = async (token, userId) => {
    try {
        const res = await fetch(BASE_URL + `orders/user/id/${userId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                token
            }
        });
        return (await res.json());
    } catch (e) {
        return e.message;
    }
} 