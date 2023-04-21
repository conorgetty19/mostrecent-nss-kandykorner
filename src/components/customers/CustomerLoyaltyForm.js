//imports

import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

export const CustomerLoyaltyForm = () => {
    const { customerId } = useParams()


    //initial state = default values for customer object
    const [profile, updateProfile] = useState({
        loyaltyNumber: 0
    })

    //get actual customer object and update state
    useEffect(() => {
        fetch(`http://localhost:8088/customers?userId=${customerId}`)
            .then(res => res.json())
            .then((data) => {
                const customerObject = data[0]
                updateProfile(customerObject)
            })
    },
        []
    )

    //clickEvent
    //event.preventDefault()
    //put request
    const handleSaveButtonClick = (event) => {
        event.preventDefault()

        //PUT fetch
        return fetch(`http://localhost:8088/customers/${profile.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(profile)
        })
        .then(res => res.json())
    }


    //form
    return (
        <>
            <form className="customerLoyaltyApp">
                <h2 className="profile__title">Change Customer Loyalty Number</h2>
                <fieldset>
                    <div className="form-group">
                        <label htmlFor="loyaltyNumber">Loyalty Number:</label>
                        <input
                            required autoFocus
                            type="text"
                            className="form-control"
                            value={profile.loyaltyNumber}
                            onChange={
                                (event) => {
                                    const copy = { ...profile }
                                    copy.loyaltyNumber = event.target.value
                                    updateProfile(copy)
                                }
                            } />
                    </div>
                </fieldset>
                <button
                    onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
                    className=" btn btn-primary">
                    Save Customer Profile
                </button>
            </form>
        </>
    )
}