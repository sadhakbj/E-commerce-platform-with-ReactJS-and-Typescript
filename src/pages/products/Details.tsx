import axios from "axios"
import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import IProduct from "../../interfaces/IProduct"

const Details: React.FC = () => {
  const params = useParams()
  const [loading, setLoading] = useState(true)
  const [product, setProduct] = useState<IProduct>()

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(`https://fakestoreapi.com/products/${params.id}`)
      setProduct(response.data)
      setLoading(false)
    }
    fetchData()
  }, [params.id])

  return (
    <div className="container mx-auto px-6 py-3 bg-green-200">
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <div className="">
          <h1>Product detail</h1>
          <p>{product?.title}</p>
          <div>
            <img src={product?.image} alt={product?.title} className="w-24 h-24 rounded-full mx-auto" />
          </div>
        </div>
      )}
    </div>
  )
}

export default Details
