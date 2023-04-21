import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

export const CustomerDetails = () => {
    const { customerId } = useParams()
    const [customer, updateCustomer] = useState({})

    useEffect(
        () => {

            fetch(`http://localhost:8088/customers?_expand=user&userId=${customerId}`)
                .then(res => res.json())
                .then((data) => {
                    const singleCustomer = data[0]
                    updateCustomer(singleCustomer)
                })
        },
        [customerId]
    )

    return <section className="customer">
        <header className="customer__header">{customer?.user?.fullName}</header>
        <section>Email: {customer?.user?.email}</section>
        <Link to={`/customers/${customerId}/edit`}>Loyalty Number: {customer.loyaltyNumber}</Link>
    </section>
}