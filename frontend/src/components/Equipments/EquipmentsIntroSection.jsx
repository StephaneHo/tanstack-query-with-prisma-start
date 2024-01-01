import { Link } from "react-router-dom";

import BANNIERE from "../../assets/BANNIERE-WEEK-END-COUPLE-mention2.png";

export const EquipmentsIntroSection = () => {
  return (
    <div className="">
      <img className="mx-auto object-contain h-80" src={BANNIERE} />
      <p>
        <Link to="/equipments/new" className="button">
          Create your first equipment
        </Link>
      </p>
    </div>
  );
};
