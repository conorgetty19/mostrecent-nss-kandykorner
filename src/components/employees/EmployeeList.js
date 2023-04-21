import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Employee } from "./Employee"


export const EmployeeList = () => {
    const [employees, setEmployees] = useState([])

    const navigate = useNavigate()

    const localKandyUser = localStorage.getItem("kandy_user")
    const kandyUserObject = JSON.parse(localKandyUser)

    const getAllEmployees = () => {
        fetch(`http://localhost:8088/employees?_expand=user&_expand=location`)
            .then(res => res.json())
            .then((employeesArray) => {
                setEmployees(employeesArray)
            }
            )
    }

    useEffect(
        () => {
            getAllEmployees()
        },
        []
    )

    return <>
        {
            kandyUserObject.staff ?
                <>
                    <button onClick={() => navigate("/employee/create")}>Add New Employee</button>
                    <h2>Current Staff</h2>
                    <article className="employees">
                        {
                            employees.map(
                                (employee) => {
                                    return <Employee key={employee.id} employee={employee} getAllEmployees={getAllEmployees} />
                                }
                            )
                        }
                    </article>
                </>
                : ""
        }
    </>
}