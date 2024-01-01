import { useQuery } from "@tanstack/react-query";
import { useRef, useState } from "react";
import { fetchEquipments } from "../../util/http";
import LoadingIndicator from "../UI/LoadingIndicator";
import ErrorBlock from "../UI/ErrorBlock";
import EquipmentItem from "./EquipmentItem";

export const FindEquipmentSection = () => {
  const searchElement = useRef();

  const [searchTerm, setSearchTerm] = useState();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["equipments", { search: searchTerm }],
    queryFn: ({ signal }) => fetchEquipments({ signal, searchTerm }),
    enabled: searchTerm !== undefined,
  });

  function handleSubmit(event) {
    event.preventDefault();
    setSearchTerm(searchElement.current.value);
  }

  let content;

  if (isLoading) {
    content = <LoadingIndicator />;
  }

  if (isError) {
    content = (
      <ErrorBlock title="An error occured" message={error.info?.message} />
    );
  }

  if (data) {
    content = (
      <ul>
        {data.map((equipment) => (
          <li key={equipment.id}>
            <EquipmentItem equipment={equipment} />
          </li>
        ))}
      </ul>
    );
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="relative w-full">
          <input
            type="search"
            id="default-search"
            className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-lg border-s-gray-50 border-s-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-s-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
            placeholder="Une nacelle, une perceuse ..."
            required
            ref={searchElement}
          />
          <button
            type="submit"
            className="absolute top-0 end-0 p-2.5 text-sm font-medium h-full text-white bg-blue-700 rounded-e-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600"
          >
            <svg
              className="w-4 h-4"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </button>
        </div>
      </form>
      {content}
    </div>
  );
};
