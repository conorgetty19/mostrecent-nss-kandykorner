import { useEffect, useState } from "react"
import "./Products.css"

export const ProductSearchList = ({ searchTermState }) => {
    const [searchedProducts, setSearched] = useState([])
    const [products, setProducts] = useState([])

    //useEffect for search
    useEffect(
        () => {
            const searchedProductsArray = products.filter(product => product.name.toLowerCase().startsWith(searchTermState.toLowerCase()))
            setSearched(searchedProductsArray)
        },
        [searchTermState]
    )

    //fetch full product list
    useEffect(
        () => {

            fetch(`http://localhost:8088/products?_sort=name`)
                .then(res => res.json())
                .then((productArray) => {
                    setProducts(productArray)
                    setSearched(productArray)
                }
                )
        },
        []
    )

    return <>
        <h2>List of Products</h2>
        <article className="products">
            {
                searchedProducts.map(
                    (product) => {
                        return <section key={product.id} className="product">
                            <header>{product.name}</header>
                            <footer>${product.pricePerUnit}</footer>
                        </section>
                    }
                )
            }
        </article>
    </>
}