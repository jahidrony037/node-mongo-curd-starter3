import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
const UpdateProduct = () => {
    const [product, setProduct] = useState({});
    const { id } = useParams();
    useEffect(() => {
        axios.get(`http://localhost:7000/products/${id}`)
            .then(res => {
                const data = res.data;
                //console.log(data);
                setProduct(data);
            });

    }, [id])

    const handleNameChange = (e) => {
        const updateName = e.target.value;
        const updateProduct = { name: updateName, email: product.email, price: product.price };
        setProduct(updateProduct);
    }


    const handleEmailChange = (e) => {
        const updateEmail = e.target.value;
        const updateProduct = { name: product.name, email: updateEmail, price: product.price };
        setProduct(updateProduct);
    }

    const handlePriceChange = (e) => {
        const updatePrice = e.target.value;
        const updateProduct = { name: product.name, email: product.email, price: updatePrice };
        setProduct(updateProduct);
    }


    const handleUpdateProduct = (e) => {
        e.preventDefault();
        const url = `http://localhost:7000/products/${id}`;
        axios.put(url, product)
            .then(res => {
                const data = res.data;
                if (data.modifiedCount > 0) {
                    alert("Successfully Data updated");
                    setProduct({});
                }

            })
        // fetch(url, {
        //     method: "PUT",
        //     headers: {
        //         'content-type': 'application/json'
        //     },
        //     body: JSON.stringify(product)
        // })
        //     .then(res => res.json())
        //     .then(data => {
        //         if (data.modifiedCount > 0) {
        //             alert("Successfully Updated Product");
        //             setProduct({});
        //         }
        //     })

    }

    return (
        <div>
            <h2>Update Product : {product.name}</h2>
            <p><small>id of the product:  {product._id}</small></p>

            <form onSubmit={handleUpdateProduct}>
                <input type="text" onChange={handleNameChange} value={product.name || " "} />
                <input type="email" onChange={handleEmailChange} value={product.email || " "} />
                <input type="text" onChange={handlePriceChange} value={product.price || " "} />
                <input type="submit" value="update" />
            </form>
        </div>
    );
};

export default UpdateProduct;