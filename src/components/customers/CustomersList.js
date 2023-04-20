import { useEffect, useState } from "react"
import { Customer } from "./Customer"

export const CustomerList = () => {
    const [customers, setCustomers] = useState([])

    const localKandyUser = localStorage.getItem("kandy_user")
    const kandyUserObject = JSON.parse(localKandyUser)

    useEffect(
        () => {
            fetch(`http://localhost:8088/users?isStaff=false`)
                .then(res => res.json())
                .then((customersArray) => {
                    setCustomers(customersArray)
                })
        },
        []
    )

    return <>{
        kandyUserObject.staff
            ? <>
                <h2>Customers</h2>
                <article className="customers">
                    {
                        customers.map(customer => <Customer
                            key={`customer--${customer.id}`}
                            id={customer.id}
                            fullName={customer.fullName}
                            email={customer.email} />)
                    }
                </article>
            </>
            : ""
    }</>
}