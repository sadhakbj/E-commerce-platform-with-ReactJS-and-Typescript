import { StarIcon } from "@heroicons/react/outline"
import React from "react"
import { Link } from "react-router-dom"
import IProduct from "../../../interfaces/IProduct"

interface Props {
  product: IProduct
}

const SingleProduct = ({ product }: Props) => {
  return (
    <>
      <div key={product.id} className="group relative">
        <div className="w-full min-h-80 bg-gray-200 aspect-w-2 aspect-h-2 rounded-md overflow-hidden group-hover:opacity-50 lg:h-80 lg:aspect-none">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-full object-center object-cover lg:w-full lg:h-full"
          />
        </div>
        <div className="mt-4 flex justify-between">
          <div>
            <h3 className="text-sm text-gray-700">
              <Link to={`/products/${product.id}`}>
                <span aria-hidden="true" className="absolute inset-0" />
                {product.title}
              </Link>
            </h3>
            {/*product color next line*/}

            <div className="group inline-flex">
              <p className="mt-1 text-sm text-gray-500">
                <StarIcon className="inline-block h-4 w-4 text-yellow-500" />
                {product.rating.rate} ({product.rating.count})
              </p>
              <p className="mt-1 text-sm text-gray-500 bg-green-300 text-white text-sm p-2">
                <span className="inline-block h-4 w-4" />
                {product.category}
              </p>
            </div>
          </div>
          <p className="text-sm font-medium text-gray-900">${product.price}</p>
        </div>
      </div>
    </>
  )
}

export default SingleProduct
