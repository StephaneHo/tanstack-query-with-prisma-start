import { Link, useNavigate } from "react-router-dom";

import Modal from "../UI/Modal.jsx";

import { useMutation } from "@tanstack/react-query";
import { createNewEquipment, queryClient } from "../../util/http.js";
import ErrorBlock from "../UI/ErrorBlock.jsx";
import { EquipmentForm } from "./EquipmentForm";

export const NewEquipment = () => {
  return <Modal></Modal>;
};
