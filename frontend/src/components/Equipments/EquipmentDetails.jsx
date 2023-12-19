import { Link, Outlet, useParams } from "react-router-dom";

import Header from "../Header.jsx";
import { useQuery } from "@tanstack/react-query";
import { fetchEquipment } from "../../util/http.js";
import LoadingIndicator from "../UI/LoadingIndicator.jsx";
import ErrorBlock from "../UI/ErrorBlock.jsx";

export default function EquipmentDetails() {
  const params = useParams();

  const { data, isPending, isError, error } = useQuery({
    queryKey: ["equipment", params.id],
    queryFn: ({ signal }) => fetchEquipment({ signal, id: params.id }),
  });

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
      <>
        <header>
          <h1>{data.name}</h1>
          <nav>
            <button>Delete</button>
            <Link to="edit">Edit</Link>
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
      </>
    );
  }

  return (
    <div className="mx-40">
      <Outlet />
      <Header>
        <Link to="/equipments" className="nav-item">
          View all Events
        </Link>
      </Header>
      <article id="event-details">{content}</article>
    </div>
  );
}
