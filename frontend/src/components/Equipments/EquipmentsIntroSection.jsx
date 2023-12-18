import { Link } from "react-router-dom";

import BANNIERE from "../../assets/BANNIERE-WEEK-END-COUPLE-mention2.png";

export default function EventsIntroSection() {
  return (
    <section
      className="content-section"
      id="overview-section"
      style={{ backgroundImage: `url(${BANNIERE})` }}
    >
      <h2>
        Connect with amazing people <br />
        or <strong>find a new passion</strong>
      </h2>
      <p>Anyone can organize and join events on React Event!</p>
      <p>
        <Link to="/equipments/new" className="button">
          Create your first equipment
        </Link>
      </p>
    </section>
  );
}
