import {useState} from "react"
import { ProductSearchList } from "./ProductSearchList"
import { ProductSearch } from "./ProductSearch"

export const ProductContainer = () => {
    const [searchTerms, setSearchTerms] = useState("")

    return <>
    <ProductSearch setterFunction={setSearchTerms} />
    <ProductSearchList searchTermState= {searchTerms} />
    </>
}