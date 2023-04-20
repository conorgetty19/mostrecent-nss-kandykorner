import { LocationList } from "../locations/LocationList"
import { ProductList } from "../products/ProductsList"
import { ProductForm } from "../products/ProductForm"
import { Route, Routes, Outlet } from "react-router-dom"
import { EmployeeList } from "../employees/EmployeeList"
import { EmployeeForm } from "../employees/EmployeeForm"
import { CustomerList } from "../customers/CustomersList"
import { CustomerDetails } from "../customers/CustomerDetails"
import { CustomerLoyaltyForm } from "../customers/CustomerLoyaltyForm"

export const EmployeeViews = () => {
    return (
        <Routes>
            <Route path="/" element={
                <>
                    <h1>Kandy Korner</h1>
                    <div>BUY CANDY.</div>

                    <Outlet />
                </>
            }>
                <Route path="locations" element={<LocationList />} />
                <Route path="products" element={<ProductList />} />
                <Route path="product/create" element={<ProductForm />} />
                <Route path="employees" element={<EmployeeList />} />               
                <Route path="employee/create" element={<EmployeeForm />} />               
                <Route path="customers" element={<CustomerList />} />
                <Route path="customers/:customerId" element={<CustomerDetails />} />               
                <Route path="customers/:customerId/edit" element={<CustomerLoyaltyForm />} />               
            </Route>
        </Routes>
    )
}

//<Route path="employee/create" element={<EmployeeForm />} />