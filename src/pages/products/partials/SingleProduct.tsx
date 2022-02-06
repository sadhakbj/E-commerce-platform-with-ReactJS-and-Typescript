import { HeartIcon, StarIcon } from "@heroicons/react/outline"
import { HeartIcon as HeartIconSolid, StarIcon as StarIconSolid } from "@heroicons/react/solid"

import React from "react"
import { Link } from "react-router-dom"
import IProduct from "../../../interfaces/IProduct"

interface Props {
  product: IProduct
}

function classNames(...classes) {
  return classes.filter(Boolean).join(" ")
}

const SingleProduct = ({ product }: Props) => {
  return (
    <>
      <div key={product.id} className="relative p-5 shadow hover:shadow-xl rounded-md">
        <button className="absolute z-10 top-0 right-0">
          {/*{product.isFavorite ? (*/}
          {/*  <HeartIconSolid className="h-6 w-6 text-red-500" />*/}
          {/*) : (*/}
          {/*  <HeartIcon className="h-6 w-6 text-gray-500" />*/}
          {/*)}*/}
          <HeartIcon className="m-3 h-7 w-7 text-pink-400 hover:text-pink-600" />
          {/*<HeartIconSolid className="m-3 h-7 w-7 text-pink-400 hover:text-pink-600" />*/}
        </button>
        <div className="w-full min-h-60 bg-gray-200 aspect-w-3 aspect-h-4 rounded-md overflow-hidden lg:h-60">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-full object-center object-fill lg:w-full lg:h-full"
          />
        </div>
        <div className="mt-4 flex flex-col justify-between">
          <h3 className="text-sm text-gray-700 text-ellipsis truncate" title={product.title}>
            <Link to={`/products/${product.id}`}>
              <span aria-hidden="true" className="absolute inset-0" />
              {product.title}
            </Link>
          </h3>

          <p className="mt-1 flex gap-1 items-center text-sm text-gray-500">
            {[0, 1, 2, 3, 4].map((rating) => (
              <>
                {Math.floor(product?.rating.rate) > rating ? (
                  <StarIconSolid key={rating} className="h-5 w-5 flex-shrink-0 text-yellow-300" aria-hidden="true" />
                ) : (
                  <StarIcon key={rating} className="h-4 w-4 flex-shrink-0 text-yellow-300" aria-hidden="true" />
                )}
              </>
            ))}

            {product.rating.count}
          </p>
          <p className="text-sm mt-[5px] font-medium text-gray-900">${product.price}</p>
          <p className="mt-1 text-sm text-green-600">{product.category.toUpperCase()}</p>
        </div>
      </div>
    </>
  )
}

export default SingleProduct
