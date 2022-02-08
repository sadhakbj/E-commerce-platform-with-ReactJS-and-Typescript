import { debounce } from "lodash"
import React, { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import Loader from "../../common/components/Loader"
import { IFilterParams, IProduct } from "../../interfaces/Product"
import { filterProducts, getProducts } from "../../store/products/actions"
import { RootState } from "../../store/reducers"
import Filters from "./partials/Filters"
import MobileFiltersDialog from "./partials/MobileFiltersDialog"
import SingleProduct from "./partials/SingleProduct"
import SortOptions from "./partials/SortOptions"

const Products: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState<boolean>(false)
  const products: IProduct[] = useSelector((state: RootState) => state.products.filteredProducts)
  const allProducts: IProduct[] = useSelector((state: RootState) => state.products.products)
  const dispatch = useDispatch()

  useEffect(() => {
    setLoading(true)
    dispatch(
      getProducts(() => {
        setLoading(false)
      })
    )
  }, [dispatch])

  const initialFilterParams: IFilterParams = {
    q: "",
    category: [],
    sortBy: "",
  }

  const [filterParams, setFilterParams] = useState<IFilterParams>(initialFilterParams)

  useEffect(() => {
    if (allProducts.length > 0) {
      setLoading(true)
      dispatch(
        filterProducts(filterParams, () => {
          setLoading(false)
        })
      )
    }
  }, [dispatch, filterParams, allProducts.length])

  /**
   *  Debounce function to prevent excessive requests
   */
  const handleSearch = useRef(
    debounce((query) => {
      setFilterParams({
        ...filterParams,
        q: query,
      })
    }, 300)
  ).current

  /**
   * Reset the filter to initial value.
   */
  const handleReset = () => {
    setFilterParams(initialFilterParams)
  }

  /**
   * Handle sorting
   * @param sort
   */
  const handleSort = (sort: string) => {
    setFilterParams({
      ...filterParams,
      sortBy: sort,
    })
  }

  /**
   * Handle category change: add or remove category from filterParams
   * @param category
   */
  const handleCategoryChange = (category) => {
    if (filterParams.category.includes(category)) {
      setFilterParams({
        ...filterParams,
        category: filterParams.category.filter((c) => c !== category),
      })
    } else {
      setFilterParams({
        ...filterParams,
        category: [...filterParams.category, category],
      })
    }
  }

  return (
    <div>
      {loading ? (
        <>
          <Loader />
        </>
      ) : null}

      <div>
        <MobileFiltersDialog
          mobileFiltersOpen={mobileFiltersOpen}
          setMobileFiltersOpen={(type) => setMobileFiltersOpen(type)}
          handleSearch={(q) => handleSearch(q)}
          handleCategoryChange={(category) => handleCategoryChange(category)}
          filterParams={filterParams}
        />

        <main className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-white">
          <div className="relative z-20 flex items-baseline justify-between pt-10 pb-6 border-b border-gray-200">
            <h1 className="text-4xl font-extrabold tracking-tight text-gray-900">New Arrivals ({products.length})</h1>
            <SortOptions
              handleSort={(sort) => handleSort(sort)}
              setMobileFiltersOpen={(type) => setMobileFiltersOpen(type)}
            />
          </div>

          <section aria-labelledby="products-heading" className="pt-6 pb-24">
            <h2 id="products-heading" className="sr-only">
              Products
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-x-8 gap-y-10">
              {/* Filters */}
              <Filters
                filterParams={filterParams}
                mobileFiltersOpen={mobileFiltersOpen}
                handleReset={(e) => handleReset()}
                handleSearch={(q) => handleSearch(q)}
                handleCategoryChange={(category) => handleCategoryChange(category)}
              />

              {/* IProduct grid */}
              <div className="lg:col-span-3">
                <div className="bg-white">
                  <div>
                    {products.length === 0 ? (
                      <h3 className="flex justify-center text-xl items-center h-[250px]">No items found</h3>
                    ) : (
                      ""
                    )}
                    <div className="mt-2 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
                      {products.map((product) => (
                        <SingleProduct product={product} key={product.id} />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  )
}

export default Products
