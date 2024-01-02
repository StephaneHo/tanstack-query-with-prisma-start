import LoadingIndicator from "../UI/LoadingIndicator.jsx";
import ErrorBlock from "../UI/ErrorBlock.jsx";
import EquipmentItem from "./EquipmentItem.jsx";
import { useQuery } from "@tanstack/react-query";
import { fetchEquipments } from "../../util/http.js";
import { useRef, useState } from "react";

export const SearchEquipementsSection = () => {
  const searchElement = useRef();
  const [searchTerm, setSearchTerm] = useState();
  function handleSubmit(event) {
    event.preventDefault();
    setSearchTerm(searchElement.current.value);
  }

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["equipments", { search: searchTerm }],
    queryFn: ({ signal }) => fetchEquipments({ signal, searchTerm }),
  });

  let content;

  if (isLoading) {
    content = <LoadingIndicator />;
  }

  if (isError) {
    content = (
      <ErrorBlock
        title="An error occurred"
        message={error.message || "Failed to fetch equipments"}
      />
    );
  }

  if (data) {
    content = (
      <ul className="grid grid-cols-6 gap-4">
        {data.map((equipment) => (
          <li key={equipment.id}>
            <EquipmentItem equipment={equipment} />
          </li>
        ))}
      </ul>
    );
  }

  return (
    <section className="m-2" id="new-events-section">
      <div className="flex my-10 justify-between">
        <h2 className="text-4xl font-bold">Nos materiels de location</h2>
        <form onSubmit={handleSubmit}>
          <div className="relative w-full">
            <input
              type="search"
              id="default-search"
              className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-lg border-black border-s-2 border"
              placeholder="Une nacelle,  ..."
              ref={searchElement}
            />
            <button
              type="submit"
              className="absolute top-0 end-0 p-2.5 text-sm font-medium h-full text-white bg-red-500 rounded-e-lg border border-red-700 hover:bg-red-800 "
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
      </div>

      {content}
    </section>
  );
};
