import { Dialog, Disclosure, Menu, Transition } from "@headlessui/react"
import { SearchIcon, XIcon } from "@heroicons/react/outline"
import { ChevronDownIcon, FilterIcon, MinusSmIcon, PlusSmIcon } from "@heroicons/react/solid"
import React, { Fragment, useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import Details from "./Details"
import { getProducts, filterProducts } from "../../store/products/actions"
import SingleProduct from "./partials/SingleProduct"
import Loader from "../../common/components/Loader"
import IProduct from "../../interfaces/IProduct"
import { RootState } from "../../store/reducers"
import { debounce } from "lodash"

interface IFilterParams {
  q: string
  category: string[]
  sortBy: string
}

const Products: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn)
  const products: IProduct[] = useSelector((state: RootState) => state.products.filteredProducts)
  const allProducts: IProduct[] = useSelector((state: RootState) => state.products.products)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    if (isLoggedIn) {
      setLoading(true)
      dispatch(
        getProducts(() => {
          setLoading(false)
        })
      )
    }
  }, [dispatch, isLoggedIn, navigate])

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
    }, 750)
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

  /**
   * Check if the category is already selected
   * @param category
   */
  const isChecked = (category: string) => {
    return filterParams.category.includes(category)
  }

  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)

  const filters = [
    {
      id: "category",
      name: "Category",
      options: [
        { value: "men's clothing", label: "Men's clothing" },
        { value: "jewelery", label: "Jewelery" },
        { value: "electronics", label: "Electronics" },
        { value: "women's clothing", label: "Women's clothing" },
      ],
    },
  ]

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ")
  }

  const sortOptions = [
    { label: "Best Rating", name: "rating", current: false },
    { label: "Price: Low to High", name: "price_low_high", current: false },
    { label: "Price: High to Low", name: "price_high_low", current: false },
  ]
  return (
    <div className="bg-white">
      {loading ? (
        <>
          <Loader />
        </>
      ) : null}

      <div>
        {/* Mobile filter dialog */}
        <Transition.Root show={mobileFiltersOpen} as={Fragment}>
          <Dialog as="div" className="fixed inset-0 flex z-40 lg:hidden" onClose={setMobileFiltersOpen}>
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-25" />
            </Transition.Child>

            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="translate-x-full"
            >
              <div className="ml-auto relative max-w-xs w-full h-full bg-white shadow-xl py-4 pb-12 flex flex-col overflow-y-auto">
                <div className="px-4 flex items-center justify-between">
                  <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                  <button
                    type="button"
                    className="-mr-2 w-10 h-10 bg-white p-2 rounded-md flex items-center justify-center text-gray-400"
                    onClick={() => setMobileFiltersOpen(false)}
                  >
                    <span className="sr-only">Close menu</span>
                    <XIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>

                {/* Filters */}
                <form className="mt-4 border-t border-gray-200">
                  <h3 className="sr-only">Categories</h3>
                  <div className="text-sm font-medium text-gray-900 space-y-4 pb-6 border-b border-gray-200">
                    <label htmlFor="search" className="sr-only">
                      Search
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <SearchIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                      </div>
                      <input
                        id="search"
                        name="search"
                        className="block w-full bg-white border border-gray-300 rounded-md py-2 pl-10 pr-3 text-sm placeholder-gray-500 focus:outline-none focus:text-gray-900 focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        placeholder="Search"
                        type="search"
                        onChange={(e) => handleSearch(e.target.value)}
                      />
                    </div>
                  </div>

                  {filters.map((section) => (
                    <Disclosure as="div" key={section.id} className="border-t border-gray-200 px-4 py-6">
                      {({ open }) => (
                        <>
                          <h3 className="-mx-2 -my-3 flow-root">
                            <Disclosure.Button className="px-2 py-3 bg-white w-full flex items-center justify-between text-gray-400 hover:text-gray-500">
                              <span className="font-medium text-gray-900">{section.name}</span>
                              <span className="ml-6 flex items-center">
                                {open ? (
                                  <MinusSmIcon className="h-5 w-5" aria-hidden="true" />
                                ) : (
                                  <PlusSmIcon className="h-5 w-5" aria-hidden="true" />
                                )}
                              </span>
                            </Disclosure.Button>
                          </h3>
                          <Disclosure.Panel className="pt-6">
                            <div className="space-y-6">
                              {section.options.map((option, optionIdx) => (
                                <div key={option.value} className="flex items-center">
                                  <input
                                    id={`filter-mobile-${section.id}-${optionIdx}`}
                                    name={`${section.id}[]`}
                                    defaultValue={option.value}
                                    type="checkbox"
                                    checked={isChecked(option.value)}
                                    onChange={() => handleCategoryChange(option.value)}
                                    className="h-4 w-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500"
                                  />
                                  <label
                                    htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                                    className="ml-3 min-w-0 flex-1 text-gray-500"
                                  >
                                    {option.label}
                                  </label>
                                </div>
                              ))}
                            </div>
                          </Disclosure.Panel>
                        </>
                      )}
                    </Disclosure>
                  ))}
                </form>
              </div>
            </Transition.Child>
          </Dialog>
        </Transition.Root>

        <main className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 shadow-2xl mt-4 rounded-xl">
          <div className="relative z-10 flex items-baseline justify-between pt-10 pb-6 border-b border-gray-200">
            <h1 className="text-4xl font-extrabold tracking-tight text-gray-900">New Arrivals ({products.length})</h1>
            <div className="flex items-center">
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <Menu.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                    Sort
                    <ChevronDownIcon
                      className="flex-shrink-0 -mr-1 ml-1 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                      aria-hidden="true"
                    />
                  </Menu.Button>
                </div>

                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="origin-top-right absolute right-0 mt-2 w-40 rounded-md shadow-2xl bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                      {sortOptions.map((option) => (
                        <Menu.Item key={option.name}>
                          {({ active }) => (
                            <button
                              onClick={() => handleSort(option.name)}
                              className={classNames(
                                option.current ? "font-medium text-gray-900" : "text-gray-500",
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm w-full text-left"
                              )}
                            >
                              {option.label}
                            </button>
                          )}
                        </Menu.Item>
                      ))}
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>

              <button
                type="button"
                className="p-2 -m-2 ml-4 sm:ml-6 text-gray-400 hover:text-gray-500 lg:hidden"
                onClick={() => setMobileFiltersOpen(true)}
              >
                <span className="sr-only">Filters</span>
                <FilterIcon className="w-5 h-5" aria-hidden="true" />
              </button>
            </div>
          </div>

          <section aria-labelledby="products-heading" className="pt-6 pb-24">
            <h2 id="products-heading" className="sr-only">
              Products
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-x-8 gap-y-10">
              {/* Filters */}
              <form className="hidden lg:block">
                <h3 className="sr-only">Categories</h3>
                <div className="text-sm font-medium text-gray-900 space-y-4 pb-6 border-b border-gray-200">
                  <label htmlFor="search" className="sr-only">
                    Search
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <SearchIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                    </div>
                    <input
                      id="search"
                      name="search"
                      className="block w-full bg-white border border-gray-300 rounded-md py-2 pl-10 pr-3 text-sm placeholder-gray-500 focus:outline-none focus:text-gray-900 focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      placeholder="Search Products"
                      type="search"
                      onChange={(e) => handleSearch(e.target.value)}
                    />
                  </div>
                </div>

                {filters.map((section) => (
                  <Disclosure as="div" key={section.id} className="border-b border-gray-200 py-6">
                    {({ open }) => (
                      <>
                        <h3 className="-my-3 flow-root">
                          <Disclosure.Button className="py-3 bg-white w-full flex items-center justify-between text-sm text-gray-400 hover:text-gray-500">
                            <span className="font-medium text-gray-900">{section.name}</span>
                            <span className="ml-6 flex items-center">
                              {open ? (
                                <MinusSmIcon className="h-5 w-5" aria-hidden="true" />
                              ) : (
                                <PlusSmIcon className="h-5 w-5" aria-hidden="true" />
                              )}
                            </span>
                          </Disclosure.Button>
                        </h3>
                        <Disclosure.Panel className="pt-6">
                          <div className="space-y-4">
                            {section.options.map((option, optionIdx) => (
                              <div key={option.value} className="flex items-center">
                                <input
                                  id={`filter-${section.id}-${optionIdx}`}
                                  name={`${section.id}[]`}
                                  defaultValue={option.value}
                                  type="checkbox"
                                  checked={isChecked(option.value)}
                                  onChange={() => handleCategoryChange(option.value)}
                                  className="h-4 w-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500"
                                />
                                <label
                                  htmlFor={`filter-${section.id}-${optionIdx}`}
                                  className="ml-3 text-sm text-gray-600"
                                >
                                  {option.label}
                                </label>
                              </div>
                            ))}
                          </div>
                        </Disclosure.Panel>
                      </>
                    )}
                  </Disclosure>
                ))}
                <div className="flex justify-end mt-2">
                  <button onClick={handleReset} className="bg-green-300 p-2 text-white">
                    Reset
                  </button>
                </div>
              </form>

              {/* IProduct grid */}
              <div className="lg:col-span-3">
                <div className="bg-white">
                  <div>
                    <div className="mt-2 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
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
