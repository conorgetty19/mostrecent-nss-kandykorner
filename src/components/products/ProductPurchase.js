

export const ProductPurchase = ({ productId, customerLoyaltyNumber }) => {


    const localKandyUser = localStorage.getItem("kandy_user")
    const kandyUserObject = JSON.parse(localKandyUser)


    //clickEvent
    //event.preventDefault()
    //perform a post with the current customer loyalty number, selected product Id, and a default date object
    const handleClickEvent = (event) => {
        event.preventDefault()

        //perform post
        const purchaseToSendToAPI = {
            productId: productId,
            loyaltyNumber: customerLoyaltyNumber,
            date: new Date().toString()
        }

        return fetch(`http://localhost:8088/purchases`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(purchaseToSendToAPI)
        })
            .then(res => res.json())

    }

    return (
        kandyUserObject.staff ? ""
            : <button onClick={(clickEvent) => handleClickEvent(clickEvent)}>Purchase</button>
    )
}