import { useState, useEffect } from "react"

export const Purchase = ({purchase}) => {
const [product, updateProduct] = useState({})

useEffect(
    () => {

        fetch(`http://localhost:8088/purchases?_expand=product&id=${purchase.id}`)
        .then(res => res.json())
        .then((data) => {
            const purchaseProduct = data[0]
            updateProduct(purchaseProduct?.product)
        })
    }, 
    []
    
)

    return(
        <><header>{product.name}</header>
        <footer>Price:{product.pricePerUnit}</footer></>
        )
}