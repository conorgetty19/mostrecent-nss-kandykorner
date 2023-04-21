//imports
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

export const EmployeeForm = () => {
    //navigation hook to redirect user
    const navigate = useNavigate()

    //place to store and setter for locations
    const [locations, setLocations] = useState([])

    //useEffect to populate locations
    useEffect(
        () => {
            fetch(`http://localhost:8088/locations`)
                .then(res => res.json())
                .then((locationsArray) => {
                    setLocations(locationsArray)
                })
        },
        [] //runs on initial state
    )

    //set default values for employee state object (empty spots for each form value. cannot be undefined)
    //(startDate, payRate, locationId, and appropriate userId) and (fullName, email, isStaff=true)
    const [employee, update] = useState({
        fullName: "",
        locationId: 0,
        email: "",
        startDate: "",
        payRate: 0
    })

    //click event
    /* 
    create object to be saved to API
    perform fetch() to POST object to API
    redirect user using navigation
    */
    const handleSaveButtonClick = (event) => {
        event.preventDefault()
        console.log("You clicked!")

        //create user object
        const userToSendToAPI = {
            fullName: employee.fullName,
            email: employee.email,
            isStaff: true
        }
        //create employee object
        const employeeToSendToAPI = {
            startDate: employee.startDate,
            payRate: parseFloat(employee.payRate, 2),
            locationId: parseInt(employee.locationId)
        }

        //POST user object
        //then POST employee object using response
        //then navigate user back to list of employees
        return fetch(`http://localhost:8088/users`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userToSendToAPI)
        })
            .then(res => res.json())
            .then(
                (response) => {
                    employeeToSendToAPI.userId = response.id
                    fetch(`http://localhost:8088/employees`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(employeeToSendToAPI)
                    })
                })
            .then(navigate("/employees"))
    }


    //return statement
    //form with h2, fields, and button
    return (
        <form className="employeeForm">
            <h2 className="employeeForm_title">New Employee Submission</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="location">Location:</label>
                    <select className="form-control"
                        onChange={
                            (event) => {
                                const copy = { ...employee }
                                copy.locationId = event.target.value
                                update(copy)
                            }}>
                        <option value="0">Select A Location</option>
                        {locations.map((location) => {
                            return <option key={location.id} value={location.id}>{location.address}</option>
                        })}

                    </select>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="fullName">First and Last Name:</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="John Smith"
                        value={employee.name}
                        onChange={
                            (event) => {
                                const copy = { ...employee }
                                copy.fullName = event.target.value
                                update(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="email">Email Address</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="user@email.com"
                        value={employee.email}
                        onChange={
                            (event) => {
                                const copy = { ...employee }
                                copy.email = event.target.value
                                update(copy)
                            }
                        }
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="startDate">Start Date:</label>
                    <input
                        type="date"
                        className="form-control"
                        value={employee.startDate}
                        onChange={
                            (event) => {
                                const copy = { ...employee }
                                copy.startDate = event.target.value
                                update(copy)
                            }
                        }
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="payRate">Hourly Pay Rate:</label>
                    <input
                        type="number"
                        className="form-control"
                        value={employee.payRate}
                        onChange={
                            (event) => {
                                const copy = { ...employee }
                                copy.payRate = event.target.value
                                update(copy)
                            }
                        }
                    />
                </div>
            </fieldset>
            <button
                onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
                className="btn btn-primary">Submit New Employee</button>
        </form>)
}