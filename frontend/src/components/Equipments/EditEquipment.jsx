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
  const navigate = useNavigate();
  const params = useParams();

  const { data, isPending, isError, error } = useQuery({
    queryKey: ["events", params.id],
    queryFn: ({ signal }) => fetchEquipment({ signal, id: params.id }),
  });

  const { mutate } = useMutation({
    mutationFn: updateEquipment,
    // sera appele avant meme d avoir une reponse
    onMutate: async (data) => {
      // permet de manipuler les donnes sans attendre une reponse
      // 2 args: la cle et les donnees
      const newEquipment = data.equipment;
      await queryClient.cancelQueries({ queryKey: ["equipment", params.id] });
      const previousEquipment = queryClient.getQueryData([
        "equipment",
        params.id,
      ]);
      queryClient.setQueryData(["equipment", params.id], newEquipment);
      // need to return an object that will be used as the context
      return { previousEquipment };
    },
    onError: (error, data, context) => {
      queryClient.setQueryData(
        ["equipment", params.id],
        context.previousEquipment
      );
    },
  });

  function handleSubmit(formData) {
    mutate({ id: params.id, equipment: formData });
    navigate("../");
  }

  function handleClose() {
    navigate("../");
  }

  let content;
  if (isPending) {
    content = (
      <div>
        <LoadingIndicator />
      </div>
    );
  }

  if (isError) {
    content = (
      <>
        <ErrorBlock
          title="Failed to load equipment"
          message={error.info?.message}
        />
        <div>
          <Link to="../">Okay</Link>
        </div>
      </>
    );
  }

  if (data) {
    content = (
      <EquipmentForm inputData={data} onSubmit={handleSubmit}>
        <p className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-red-600 rounded-lg hover:bg-red-600 focus:ring-4 focus:outline-none hover:ring-blue-300">
          <Link to="../" className="button-text">
            Annuler
          </Link>
        </p>
        <button
          type="submit"
          className="mx-5 inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-red-600 rounded-lg hover:bg-red-600 focus:ring-4 focus:outline-none hover:ring-blue-300"
        >
          Mettre a jour
        </button>
      </EquipmentForm>
    );
  }

  return <Modal onClose={handleClose}>{content}</Modal>;
};
