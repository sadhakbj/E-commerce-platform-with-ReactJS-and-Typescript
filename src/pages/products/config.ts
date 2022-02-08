export const filters = [
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

export const sortOptions = [
  { label: "Best Rating", name: "rating", current: false },
  { label: "Price: Low to High", name: "price_low_high", current: false },
  { label: "Price: High to Low", name: "price_high_low", current: false },
]
