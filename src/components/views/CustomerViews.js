import { LocationList } from "../locations/LocationList"
import { ProductList } from "../products/ProductsList"
import { Route, Routes, Outlet } from "react-router-dom"
import { ProductContainer } from "../products/ProductContainer"
import { PurchaseHistory } from "../purchases/PurchaseHistory"

export const CustomerViews = () => {
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
                <Route path="search" element={<ProductContainer />} />
                <Route path="orderHistory" element={<PurchaseHistory/> } />
            </Route>
        </Routes>
    )
}