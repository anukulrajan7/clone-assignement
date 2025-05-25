export default function SearchComponent({ value, setValue, handleSearch }) {
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="flex md:max-w-[40vw]">
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyPress}
        placeholder="Search"
        className="flex-1 px-4 py-2 rounded-l-sm dark:text-white text-black  text-[.8rem]  border border-gray border-[.5px] border-r-0"
      />
      <button
        onClick={handleSearch}
        className="px-3 py-2 rounded-r-sm border border-gray border-[.5px] "
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="m21 21-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </button>
    </div>
  );
}
