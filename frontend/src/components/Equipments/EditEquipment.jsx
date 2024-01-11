import { Link, useNavigate, useParams } from "react-router-dom";

import Modal from "../UI/Modal.jsx";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  fetchEquipment,
  queryClient,
  updateEquipment,
} from "../../util/http.js";
import LoadingIndicator from "../UI/LoadingIndicator.jsx";
import ErrorBlock from "../UI/ErrorBlock.jsx";
import { EquipmentForm } from "./EquipmentForm";

export const EditEquipment = () => {
  return <Modal></Modal>;
};
