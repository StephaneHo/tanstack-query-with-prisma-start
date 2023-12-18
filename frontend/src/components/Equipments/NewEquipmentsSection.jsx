import LoadingIndicator from "../UI/LoadingIndicator.jsx";
import ErrorBlock from "../UI/ErrorBlock.jsx";
import EquipmentItem from "./EquipmentItem.jsx";
import { useQuery } from "@tanstack/react-query";
import { fetchEquipments } from "../../util/http.js";

export default function NewEventsSection() {
  const { data, isPending, isError, error } = useQuery({
    queryKey: ["equipments"],
    queryFn: fetchEquipments,
  });

  let content;

  if (isPending) {
    content = <LoadingIndicator />;
  }

  if (isError) {
    content = (
      <ErrorBlock
        title="An error occurred"
        message={error.message || "Failed to fetch events"}
      />
    );
  }

  if (data) {
    content = (
      <ul className="grid grid-cols-4 gap-4">
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
      <header>
        <h2>Recently added events</h2>
      </header>
      {content}
    </section>
  );
}
