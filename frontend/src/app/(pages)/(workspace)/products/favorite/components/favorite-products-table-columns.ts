type Item = {
  headingClassName?: string;
  title?: string;
};

export const FAVORITE_PRODUCTS_TABLE_COLUMNS: Item[] = [
  { headingClassName: "w-1/4", title: "Name" },
  { title: "Description" },
  { headingClassName: "w-1/7", title: "Supplier" },
  { headingClassName: "w-1/7", title: "Category" },
  { headingClassName: "w-1/8 pr-10 text-end", title: "Cost" },
  { headingClassName: "w-10" },
];
