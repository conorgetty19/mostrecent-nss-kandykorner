
export const ProductSearch = ({setterFunction}) => {
    return (
        <div>
        <label htmlFor="search">What candy are you looking for?</label>
        <input
        onChange={
            (changeEvent) => {
                setterFunction(changeEvent.target.value)
            }
        }
        type="text" placeholder="Enter Search Terms" />
        </div>
    )
}