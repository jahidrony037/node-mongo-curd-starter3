import axios from 'axios';
import React, { useRef } from 'react';
import './AddProduct.css';

const AddProduct = () => {
    const nameRef = useRef();
    const emailRef = useRef();
    const priceRef = useRef();
    const handleAddProduct = (e) => {
        e.preventDefault();
        const name = nameRef.current.value;
        const email = emailRef.current.value;
        const price = priceRef.current.value;
        const newProduct = { name, email, price };
        // console.log(newUser);

        axios.post('http://localhost:7000/products', newProduct)
            .then((data) => {
                const product = data.data;
                if (product.insertedId) {
                    alert("product added successfully");
                    e.target.reset();
                }
            })


    }
    return (
        <div>
            <h2>This is Add Product</h2>
            <form onSubmit={handleAddProduct}>
                <input type="text" ref={nameRef} name="productName" placeholder='enter product name' />
                <input type="email" ref={emailRef} name="email" placeholder='enter your mail' />
                <input type="text" ref={priceRef} name="productPrice" placeholder='enter product price' />
                <input type="submit" value="Add" />
            </form>
        </div>
    );
};

export default AddProduct;