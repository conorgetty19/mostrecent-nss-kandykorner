import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import "./Products.css"
import { ProductPurchase } from "./ProductPurchase"

export const ProductList = () => {
    const [products, setProducts] = useState([])
    const [filteredProducts, setFiltered] = useState([])
    const [expensive, setExpensive] = useState(false)
    const navigate = useNavigate()
    const [customerUser, setCustomerUser] = useState({})


    useEffect(
        () => {
            fetch(`http://localhost:8088/customers?_expand=user&userId=${kandyUserObject.id}`)
            .then(res => res.json())
            .then((data) => {
                const currentCustomerAndUser = data[0]
                setCustomerUser(currentCustomerAndUser)
            })
        },
        []
    )

    const localKandyUser = localStorage.getItem("kandy_user")
    const kandyUserObject = JSON.parse(localKandyUser)


    useEffect(
        () => {

            fetch(`http://localhost:8088/products?_sort=name&_expand=productTypes`)
                .then(res => res.json())
                .then((productArray) => {
                    setProducts(productArray)
                    setFiltered(productArray)
                }
                )
        },
        []
    )

    useEffect(
        () => {
            if (expensive) {
                const expensiveProducts = products.filter(product => product.pricePerUnit > 2)
                setFiltered(expensiveProducts)

            }
            else {
                setFiltered(products)
            }
        },
        [expensive]
    )


    return <>
        {
            kandyUserObject.staff
                ? <>
                    <button onClick={() => { setExpensive(true) }}>Top Priced</button>
                    <button onClick={() => { setExpensive(false) }}>View All</button>
                    <button onClick={() => navigate("/product/create")}>Create Product</button>
                </>
                : ""
        }

        <h2>List of Products</h2>
        <article className="products">
            {
                filteredProducts.map(
                    (product) => {
                        return <section key={product.id} className="product">
                            <header>{product.name}</header>
                            <div>Type: {product.productTypes.description}</div>
                            <footer>${product.pricePerUnit}</footer>
                            {
                               <ProductPurchase
                               productId = {product.id}
                               customerLoyaltyNumber = {parseInt(customerUser?.loyaltyNumber)}
                               />
                            }
                        </section>
                    }
                )
            }
        </article>
    </>
}