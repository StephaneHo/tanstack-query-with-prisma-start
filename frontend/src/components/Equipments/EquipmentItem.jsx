import { Link } from "react-router-dom";

export default function EventItem({ equipment }) {
  return (
    <article className="event-item">
      <img
        src={`http://localhost:3000/${equipment.image}`}
        alt={equipment.name}
      />
      <div className="event-item-content">
        <div>
          <h2>{equipment.name}</h2>
          {/* <p className="event-item-date">{formattedDate}</p>
          <p className="event-item-location">{event.location}</p> */}
        </div>
        {/* <p>
          <Link to={`/events/${event.id}`} className="button">
            View Details
          </Link>
        </p> */}
      </div>
    </article>
  );
}
