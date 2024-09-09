import React, { useMemo } from "react";
import { RootState } from "../../store";
import { useSelector, useDispatch } from "react-redux";
import {
  toggleAuthorFilter,
  toggleCategoryFilter,
  toggleSortOrderFilter,
} from "../../articlesSlice";

interface FilterBarProps {}

type FilterGroupProps = {
  title: string;
  options: { label: string; value: string }[];
  selected: string[];
  onChange: (value: string) => void;
};

const FilterBar: React.FC<FilterBarProps> = () => {
  const dispatch = useDispatch();

  const {
    selectedAuthors,
    selectedCategories,
    selectedSortOrders,
    authors,
    categories,
  } = useSelector((state: RootState) => state.articles);

  const handleAuthorChange = (author: string) => {
    console.log('Author',author)
    dispatch(toggleAuthorFilter(author));
  };

  const handleCategoryChange = (category: string) => {
    dispatch(toggleCategoryFilter(category));
  };

  const handleSortChange = (sortedBy: string) => {
    dispatch(toggleSortOrderFilter(sortedBy));
  };

  const filterGroups = useMemo(
    () => [
      {
        title: "Category",
        options: categories.map((category) => ({
          label: category,
          value: category,
        })),
        selected: selectedCategories,
        onChange: handleCategoryChange,
      },
      {
        title: "Author",
        options: authors.map((author) => ({
          label: author,
          value: author,
        })),
        selected: selectedAuthors,
        onChange: handleAuthorChange,
      },
      {
        title: "Sorted by",
        options: [
          { label: "Date", value: "date" },
          { label: "Title", value: "title" },
        ],
        selected: selectedSortOrders,
        onChange: handleSortChange,
      },
    ],
    [
      authors,
      categories,
      selectedAuthors,
      selectedCategories,
      selectedSortOrders,
      dispatch,
    ]
  );

  const FilterGroup: React.FC<FilterGroupProps> = ({
    title,
    options,
    selected,
    onChange,
  }) => (
    <div className="flex flex-col mb-4">
      <div className="bg-[#F8F9FA] w-auto p-3">
        <h3 className="text-base font-bold">{title}</h3>
      </div>
      <ul className="h-auto px-3 pb-3 overflow-y-auto text-sm text-gray-700 dark:text-gray-200">
        { options.length ? options.map((option) => (
          <li key={option.value}>
            <div className="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600"> 
              <input
                type="checkbox"
                checked={selected.includes(option.value.trim())}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded"
                onChange={() => onChange(option.value)}
              />
              <label className="w-full ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                {option.label}
              </label>
            </div>
          </li>
        )): <p>{title} not exists...</p>}
      </ul>
    </div>
  );

  return (
    <div className="lg:w-72 w-full p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      {filterGroups.map((filterGroup, index) => (
        <FilterGroup key={index} {...filterGroup} />
      ))}
    </div>
  );
};

export default React.memo(FilterBar);
