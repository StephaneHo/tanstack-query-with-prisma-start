import { Link, useNavigate } from "react-router-dom";

import Modal from "../UI/Modal.jsx";
import EventForm from "./EquipmentForm.jsx";
import { useMutation } from "@tanstack/react-query";
import { createNewEquipment } from "../../util/http.js";

export default function NewEquipment() {
  const navigate = useNavigate();

  const { mutate } = useMutation({
    mutationFn: createNewEquipment,
  });

  function handleSubmit(formData) {
    mutate({
      equipment: formData,
    });
  }

  return (
    <Modal onClose={() => navigate("../")}>
      <EventForm onSubmit={handleSubmit}>
        <>
          <Link to="../" className="button-text">
            Cancel
          </Link>
          <button type="submit" className="button">
            Create
          </button>
        </>
      </EventForm>
    </Modal>
  );
}
