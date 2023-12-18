import { Link } from "react-router-dom";

export default function EquipmentItem({ equipment }) {
  return (
    <div className="p-6 bg-white border border-black rounded-lg shadow hover:border-red-600 hover:border-4">
      <div className="container max-w-screen-lg mx-auto pb-10">
        <img
          className="mx-auto"
          src={`http://localhost:3000/${equipment.image}`}
          alt={equipment.name}
        />
      </div>

      <div className="">
        <div>
          <h2 className="font-bold text-xl">{equipment.name}</h2>
          <p className="text-xs">Ref. {equipment.ref}</p>
          <p className="text-3xl font-bold">{equipment.price} €</p>
        </div>
        {
          <p className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-red-600 rounded-lg hover:bg-red-600 focus:ring-4 focus:outline-none hover:ring-blue-300">
            <Link to={`/equipment/${equipment.id}`} className="button">
              En savoir plus
            </Link>
          </p>
        }
      </div>
    </div>
  );
}
