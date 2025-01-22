import { useState } from 'react';

interface FilterProps {
  onFilterChange: (filters: any) => void;
}

const FilterComponent: React.FC<FilterProps> = ({ onFilterChange }) => {
  const [filters, setFilters] = useState({
    type: [],
    seatingCapacity: [],
    fuelCapacity: [],
    price: [0, 100], // Price range with min and max
  });

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked } = e.target;
    const updatedFilters: any = { ...filters };

    if (checked) {
      updatedFilters[name] = [...updatedFilters[name], value];
    } else {
      updatedFilters[name] = updatedFilters[name].filter((item: string) => item !== value);
    }

    setFilters(updatedFilters);
    onFilterChange(updatedFilters);
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const updatedFilters: any = { ...filters };
    const priceIndex = name === "minPrice" ? 0 : 1;

    updatedFilters.price[priceIndex] = Number(value);

    setFilters(updatedFilters);
    onFilterChange(updatedFilters);
  };

  return (
    <div className="w-full height-[1600px] bg-white p-6">
      <div className="mb-8">
        <h3 className="text-2xl font-semibold text-[#3563e9]">Filter by</h3>
      </div>

      <div className="space-y-8">
        {/* Type Filter */}
        <div className="filter-section">
          <h4 className="font-semibold mb-4 text-gray-700">Type</h4>
          <div className="space-y-3">
            {['SUV', 'Sedan', 'Sport'].map((type) => (
              <label key={type} className="flex items-center gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  name="type"
                  value={type}
                  onChange={handleFilterChange}
                  className="w-4 h-4 rounded border-gray-300 text-[#3563e9] focus:ring-[#3563e9]
                           checked:bg-[#3563e9] checked:border-transparent transition-colors"
                />
                <span className="text-sm text-gray-600 group-hover:text-gray-900">{type}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Capacity Filter */}
        <div className="filter-section">
          <h4 className="font-semibold mb-4 text-gray-700">Capacity</h4>
          <div className="space-y-3">
            {['2 People', '4 People', '5 People'].map((capacity) => (
              <label key={capacity} className="flex items-center gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  name="seatingCapacity"
                  value={capacity}
                  onChange={handleFilterChange}
                  className="w-4 h-4 rounded border-gray-300 text-[#3563e9] focus:ring-[#3563e9]
                           checked:bg-[#3563e9] checked:border-transparent transition-colors"
                />
                <span className="text-sm text-gray-600 group-hover:text-gray-900">{capacity}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Fuel Capacity Filter */}
        <div className="filter-section border-b pb-6">
          <h4 className="font-semibold mb-4 text-gray-700">Fuel Capacity</h4>
          <div className="space-y-3">
            {['50L', '70L', '90L'].map((fuel) => (
              <label key={fuel} className="flex items-center gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  name="fuelCapacity"
                  value={fuel}
                  onChange={handleFilterChange}
                  className="w-4 h-4 rounded border-gray-300 text-[#3563e9] focus:ring-[#3563e9]
                           checked:bg-[#3563e9] checked:border-transparent transition-colors"
                />
                <span className="text-sm text-gray-600 group-hover:text-gray-900">{fuel}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Price Filter */}
        <div className="filter-section border-b pb-6">
          <h4 className="font-semibold mb-4 text-gray-700">Price Range</h4>
          <div className="flex items-center gap-4">
            <div>
              <label htmlFor="minPrice" className="block text-sm text-gray-600 mb-1">
                Min
              </label>
              <input
                type="number"
                id="minPrice"
                name="minPrice"
                value={filters.price[0]}
                onChange={handlePriceChange}
                className="w-20 p-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#3563e9]"
              />
            </div>
            <span className="text-gray-600">-</span>
            <div>
              <label htmlFor="maxPrice" className="block text-sm text-gray-600 mb-1">
                Max
              </label>
              <input
                type="number"
                id="maxPrice"
                name="maxPrice"
                value={filters.price[1]}
                onChange={handlePriceChange}
                className="w-20 p-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#3563e9]"
              />
            </div>
          </div>
        </div>

        {/* Selected Filters Summary */}
        <div className="pt-4 space-y-2">
          {Object.entries(filters).map(([key, values]) => (
            values.length > 0 && key !== "price" ? (
              <div key={key} className="text-xs text-gray-500">
                Selected {key}: {values.length}
              </div>
            ) : key === "price" ? (
              <div key={key} className="text-xs text-gray-500">
                Selected price range: {values[0]} - {values[1]}
              </div>
            ) : null
          ))}
        </div>
      </div>
    </div>
  );
};

export default FilterComponent;
