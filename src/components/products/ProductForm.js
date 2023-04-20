import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"


export const ProductForm = () => {
    //create place to store and setter for list of productTypes
    const [productTypes, setProductTypes] = useState([])
    //useEffect to populate productTypes
    useEffect(
        () => {
            fetch(`http://localhost:8088/productTypes`)
                .then(res => res.json())
                .then((productTypesArray) => {
                    setProductTypes(productTypesArray)
                })
        },
        [] // When this array is empty, you are observing initial component state
    )

    //set default values for state object
    const [product, update] = useState({
        name: "",
        productTypesId: 0,
        pricePerUnit: 0.00
    })

    //navigation hook to redirect user
    const navigate = useNavigate()

    //click event
    /* 
    create object to be saved to API
    perform fetch() to POST object to API
    */
    const handleSaveButtonClick = (event) => {
        event.preventDefault()
        console.log("You clicked!")

        //create object
        const productToSendToAPI = {
            name: product.name,
            productTypesId: product.productTypesId,
            pricePerUnit: product.pricePerUnit
        }

        //fetch to POST object
        return fetch(`http://localhost:8088/products`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(productToSendToAPI)
        })
            .then(res => res.json())
            .then(() => {
                navigate("/products")
            })
    }

    //return statement
    //form with h2, fields, and button
    return (
        <form className="productForm">
            <h2 className="productForm_title">New Product Submission</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Product Name:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="Product Name"
                        value={product.name}
                        onChange={
                            (event) => {
                                const copy = { ...product }
                                copy.name = event.target.value
                                update(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="type">Product Type:</label>
                    <select
                        className="form-control"
                        onChange={(event) => {
                            const copy = { ...product }
                            copy.productTypesId = event.target.value
                            update(copy)
                        }}>
                        <option value="0">Select a Product Type</option>
                        {productTypes.map(
                            (productType) => {
                                return <option key={productType.id} value={productType.id}>{productType.description}</option>
                            }
                        )}
                        

                    </select>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="price">Product Price:</label>
                    <input
                    type="number"
                    className="form-control"
                        value={product.pricePerUnit}
                        onChange={
                            (event) => {
                                const copy = { ...product }
                                copy.pricePerUnit = event.target.value
                                update(copy)
                            }
                        } />
                </div>
            </fieldset>
            <button
                onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
                className="btn btn-primary">
                Submit New Product
            </button>
        </form>
    )
}