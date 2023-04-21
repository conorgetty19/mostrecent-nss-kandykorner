import { useEffect, useState } from "react"
import { Purchase } from "./Purchase"

export const PurchaseHistory = () => {


    const localKandyUser = localStorage.getItem("kandy_user")
    const kandyUserObject = JSON.parse(localKandyUser)

    const [customerUser, setCustomerUser] = useState({})
    const [filteredPurchases, setPurchases] = useState([])

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

    useEffect(
        () => {
            fetch(`http://localhost:8088/purchases?loyaltyNumber=${customerUser.loyaltyNumber}`)
                .then(res => res.json())
                .then((data) => {
                    setPurchases(data)
                })
        },
        [customerUser]
    )

    return (
        <>
            <h2>My Order History</h2>
            <article>
                {filteredPurchases.map( (purchase) =>
                    <Purchase key={purchase.id} purchase={purchase} />
                )}
            </article>
        </>
    )

}