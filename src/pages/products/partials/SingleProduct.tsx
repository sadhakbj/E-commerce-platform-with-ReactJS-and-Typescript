import React from "react"
import IProduct from "../../../interfaces/IProduct"

interface Props {
  product: IProduct
}

const SingleProduct = ({ product }: Props) => {
  return (
    <div key={product.id} className="group relative">
      <div className="w-full min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:h-80 lg:aspect-none">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-center object-cover lg:w-full lg:h-full"
        />
      </div>
      <div className="mt-4 flex justify-between">
        <div>
          <h3 className="text-sm text-gray-700">
            <a href={product.image}>
              <span aria-hidden="true" className="absolute inset-0" />
              {product.title}
            </a>
          </h3>
          {/*product color next line*/}
          <p className="mt-1 text-sm text-gray-500">{product.id}</p>
        </div>
        <p className="text-sm font-medium text-gray-900">{product.price}</p>
      </div>
    </div>
  )
}

export default SingleProduct
