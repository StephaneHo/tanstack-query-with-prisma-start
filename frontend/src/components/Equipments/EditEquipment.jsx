import { Link, useNavigate, useParams } from "react-router-dom";

import Modal from "../UI/Modal.jsx";
import EventForm from "./EquipmentForm.jsx";
import { useMutation, useQuery } from "@tanstack/react-query";
import { fetchEquipment } from "../../util/http.js";

export default function EditEquipment() {
  const navigate = useNavigate();
  const params = useParams();

  useQuery({
    queryKey: ["events", params.id],
    queryFn: ({ signal }) => fetchEquipment({ signal, id: params.id }),
  });
  useMutation({});

  function handleSubmit(formData) {}

  function handleClose() {
    navigate("../");
  }

  return (
    <Modal onClose={handleClose}>
      <EventForm inputData={null} onSubmit={handleSubmit}>
        <Link to="../" className="button-text">
          Cancel
        </Link>
        <button type="submit" className="button">
          Update
        </button>
      </EventForm>
    </Modal>
  );
}
