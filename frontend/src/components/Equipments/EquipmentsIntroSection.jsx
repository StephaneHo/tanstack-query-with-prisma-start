import { Link } from "react-router-dom";

import BANNIERE from "../../assets/BANNIERE-WEEK-END-COUPLE-mention2.png";

export const EquipmentsCreateIntroSection = () => {
  return (
    <div className="">
      <img className="mx-auto object-contain h-80" src={BANNIERE} />
      <div>
        <Link to="/equipments/new" className="button">
          <button
            className="my-10 inline-flex w-full justify-center
            rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white
            shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto "
          >
            Creer un equipement
          </button>
        </Link>
      </div>
    </div>
  );
};
