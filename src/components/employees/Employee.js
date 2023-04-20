import { useState, useEffect } from "react"
//need to temporarily store userId corresponding to said employee
//allows both delete requests

export const Employee = ({ employee, getAllEmployees }) => {

    const [userId, setUserId] = useState(0)

    useEffect(
        () => {
            fetch(`http://localhost:8088/employees/${employee.id}`)
                .then(res => res.json())
                .then((employee) => {
                    setUserId(employee.usersId)
                })
        },
        []
    )

    const deleteEmployeeClickEvent = () => {

        //delete both user and employee account? Just employee and PUT isStaff to false?
        return fetch(`http://localhost:8088/users/${userId}`, {
            method: "DELETE"
        })
            .then(() => {
                return fetch(`http://localhost:8088/employees/${employee.id}`, {
                    method: "DELETE"
                })
            }
            )
            .then(() => {
                getAllEmployees()
            })
    }

    return (<><section className="employee">
        <header>{employee?.users?.fullName}</header>
        <ul>
            <li>Location: {employee?.locations?.address}</li>
            <li>Hourly Rate: {employee?.payRate}</li>
            <li>Start Date: {employee?.startDate}</li>
        </ul>
        <button onClick={(clickEvent) => deleteEmployeeClickEvent(clickEvent)}>🔥{employee?.users?.fullName}</button>
    </section></>)
}