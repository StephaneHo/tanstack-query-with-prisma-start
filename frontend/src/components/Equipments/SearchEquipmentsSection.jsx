import LoadingIndicator from "../UI/LoadingIndicator.jsx";
import ErrorBlock from "../UI/ErrorBlock.jsx";
import EquipmentItem from "./EquipmentItem.jsx";
import { useQuery } from "@tanstack/react-query";
import { fetchEquipments } from "../../util/http.js";
import { useRef, useState } from "react";

export const SearchEquipementsSection = () => {
  return (
    <section className="m-2" id="new-events-section">
      <div className="flex my-10 justify-between">
        <h2 className="text-4xl font-bold">Nos materiels de location</h2>
      </div>
    </section>
  );
};
