import { Disclosure } from "@headlessui/react"
import { SearchIcon } from "@heroicons/react/outline"
import { MinusSmIcon, PlusSmIcon } from "@heroicons/react/solid"
import React from "react"
import { IFilterParams } from "../../../interfaces/Product"
import { filters } from "../config"

interface Props {
  filterParams: IFilterParams
  mobileFiltersOpen: boolean
  handleReset: Function
  handleSearch: Function
  handleCategoryChange: Function
}

const Filters = (props: Props) => {
  return (
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
            onChange={(e) => props.handleSearch(e.target.value)}
          />
        </div>
      </div>

      {filters.map((section) => (
        <Disclosure as="div" defaultOpen={true} key={section.id} className="border-b border-gray-200 py-6">
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
                        checked={props.filterParams.category.includes(option.value)}
                        onChange={() => props.handleCategoryChange(option.value)}
                        className="h-4 w-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500"
                      />
                      <label htmlFor={`filter-${section.id}-${optionIdx}`} className="ml-3 text-sm text-gray-600">
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
      <div className="flex mt-2">
        <button
          onClick={(e) => props.handleReset}
          className="bg-white py-2 px-4 text-sm text-gray-600 border rounded hover:bg-gray-50"
        >
          Reset
        </button>
      </div>
    </form>
  )
}

export default Filters
