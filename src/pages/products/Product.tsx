import React from "react"
import { Link } from "react-router-dom"
import ProductInterface from "../../interfaces/Product"

export interface ProductProps {
  product: ProductInterface
}

const Product: React.FC<ProductProps> = ({ product }: ProductProps) => {
  return (
    <div className="max-w-md py-4 px-8 bg-white shadow-lg rounded-lg my-20">
      <div className="flex justify-center md:justify-end -mt-16">
        <img
          className="w-20 h-20 object-cover rounded-full border-2 border-indigo-500"
          alt={product.title}
          src={product.image}
        />
      </div>
      <div>
        <h2 className="text-gray-800 text-3xl font-semibold">{product.title}</h2>
        <p className="mt-2 text-gray-600">{product.description}</p>
      </div>
      <div className="flex justify-end mt-4">
        <Link to={`/products/${product.id}`} className="text-xl font-medium text-indigo-500">
          {product.price}
        </Link>
      </div>
    </div>
  )
}

export default Product
