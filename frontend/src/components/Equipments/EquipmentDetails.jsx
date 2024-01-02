import { Link, Outlet, useNavigate, useParams } from "react-router-dom";

import Header from "../Header.jsx";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  deleteEquipment,
  fetchEquipment,
  queryClient,
} from "../../util/http.js";
import LoadingIndicator from "../UI/LoadingIndicator.jsx";
import ErrorBlock from "../UI/ErrorBlock.jsx";
import { useState } from "react";
import Modal from "../UI/Modal.jsx";

export const EquipmentDetails = () => {
  const [isDeleting, setIsDeleting] = useState(false);

  const params = useParams();
  const navigate = useNavigate();

  const { data, isPending, isError, error } = useQuery({
    queryKey: ["equipment", params.id],
    queryFn: ({ signal }) => fetchEquipment({ signal, id: params.id }),
  });

  const {
    mutate,
    isPending: isPendingDeletion,
    isError: isErrorDeleting,
    error: deleteError,
  } = useMutation({
    mutationFn: deleteEquipment,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["equipments"],
      });
      navigate("/equipments");
    },
  });

  const handleStartDelete = () => {
    setIsDeleting(true);
  };

  const handleStopDelete = () => {
    setIsDeleting(false);
  };

  const handleDelete = () => {
    mutate({ id: params.id });
  };

  let content;
  if (isPending) {
    content = <LoadingIndicator />;
  }
  if (isError) {
    content = (
      <ErrorBlock
        title="Failed to load equipment"
        message={error.info?.message}
      />
    );
  }
  if (data) {
    content = (
      <div className="my-10">
        <header>
          <nav>
            <button
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mx-4"
              onClick={handleStartDelete}
            >
              Supprimer
            </button>
            <Link
              to="edit"
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            >
              Modifier
            </Link>
          </nav>
        </header>
        <div id="event-details-content" className="flex">
          <img
            className=""
            src={`http://localhost:3000/${data.image}`}
            alt={data.name}
          />
          <div id="event-details-info" className="mx-40">
            <h1 className="text-6xl  my-10 font-bold">{data.name}</h1>
            {data.isReservedPro && (
              <p className="bg-black text-white uppercase my-8 p-2 inline-flex">
                Reserve aux professionels
              </p>
            )}
            <p id="event-details-description  my-8">{data.description}</p>
            <div className="my-8">
              <p className="text-sm font-bold">A PARTIR DE:</p>
              <h2 className="text-6xl font-bold">{data.price}</h2>
            </div>

            <ul className="mx-20">
              <li className="even:bg-white odd:bg-rose-100 flex justify-between">
                <p className="px-10">Reference</p>
                <p className="px-10">{data.ref}</p>
              </li>
              <li className="even:bg-white odd:bg-rose-100 flex justify-between">
                <p className="px-10">Hauteur</p>
                <p className="px-10">{data.height} m</p>
              </li>
              <li className="even:bg-white odd:bg-rose-100 flex justify-between">
                <p className="px-10">Poids</p>
                <p className="px-10"> {data.weight} kg</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-40">
      {isDeleting && (
        <Modal onClose={handleStopDelete}>
          <h2>Are you sure ?</h2>
          <p>Do you really want to delete this event ?</p>
          <div>
            {isPendingDeletion && <p>Deleting, please wait...</p>}
            {!isPendingDeletion && (
              <>
                <button
                  onClick={handleStopDelete}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                >
                  Delete
                </button>
              </>
            )}
          </div>
          {isErrorDeleting && (
            <ErrorBlock
              title="Failed to delete event"
              message={deleteError.info?.message}
            />
          )}
        </Modal>
      )}
      <Outlet />
      <Header className="my-10">
        <Link
          to="/equipments"
          className="font-medium text-black hover:underline"
        >
          Retour a la page d accueil
        </Link>
      </Header>
      <article id="event-details">{content}</article>
    </div>
  );
};
