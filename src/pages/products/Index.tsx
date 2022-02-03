import axios from "axios"
import React, { useEffect, useState } from "react"
import ProductInterface from "../../interfaces/Product"
import SingleProduct from "./Product"

const Products: React.FC = () => {
  const [products, setProducts] = useState<ProductInterface[]>([])
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    async function fetchData() {
      setLoading(true)
      const response = await axios.get("https://fakestoreapi.com/products/")
      setProducts(response.data)
      setLoading(false)
    }
    fetchData()
  }, [])

  return (
    <div className="container mx-auto px-6 py-3 bg-green-200">
      <h1>Products list:</h1>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <div className="">
          {products.map((product) => (
            <SingleProduct product={product} key={product.id} />
          ))}
        </div>
      )}
    </div>
  )
}

export default Products
