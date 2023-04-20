import { useEffect, useState } from "react"
import "./Locations.css"

export const LocationList = () => {
    const [locations, setLocations] = useState([])

    useEffect(
        () => {
            fetch(`http://localhost:8088/locations`)
                .then(res => res.json())
                .then((locationsArray) => {
                    setLocations(locationsArray)
                }

                )
        },
        []

    )

    return <>
        <h2>List of Locations</h2>
        <article className="locations">
            {
                locations.map(
                    (location) => {
                        return <section key={location.id} className="location">
                            <header>Located at {location.address}</header>
                            <footer>Square Footage: {location.squareFootage}</footer>
                        </section>
                    }
                )
            }
        </article>
    </>
}