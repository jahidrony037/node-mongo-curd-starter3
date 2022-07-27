import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Products = () => {
    const [products, setProducts] = useState([]);
    useEffect(() => {
        axios.get('http://localhost:7000/products')
            .then(data => setProducts(data.data))
    }, [])

    const handleRemoveProduct = (id) => {
        const proceed = window.confirm("Are you want to delete?");
        if (proceed) {
            axios.delete(`http://localhost:7000/products/${id}`)
                .then(res => {
                    const data = res.data;
                    if (data.deletedCount > 0) {
                        alert("product delete successfully");
                        const remainProducts = products.filter(product => product._id !== id);
                        setProducts(remainProducts);
                    }
                });
        }

    }

    return (
        <div>
            <h2> Products : {products.length}</h2>
            <ul>
                {
                    products.map(product => <li key={product._id}>{product.name} : : {product.email} : : {product.price} ::
                        <Link to={`/products/add/${product._id}`}><button>update</button></Link>  <button onClick={() => { handleRemoveProduct(product._id) }}>X</button>
                    </li>)
                }
            </ul>
        </div>
    );
};

export default Products;