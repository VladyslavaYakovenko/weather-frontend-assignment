import { GeoName } from "../types";

interface Props {
  data: GeoName;
  onClick: (i: GeoName) => void;
  isSelected: boolean;
}

function CityCard(props: Props) {
  return (
    <div
      data-testid="city-card"
      className={`flex flex-col gap-1 bg-blue-300/20 rounded-md p-1.5 hover:cursor-pointer hover:bg-blue-300/10 ${
        props.isSelected ? "bg-blue-300/10" : ""
      }`}
      onClick={() => !props.isSelected && props.onClick(props.data)}
    >
      <h1 className="">{props.data.name}</h1>
      <div className="flex gap-2">
        {props.data.adminName1 && <p>{props.data.adminName1},</p>}
        <p>{props.data.countryName}</p>
      </div>

      <p className="capitalize text-xs">{props.data.fclName}</p>
    </div>
  );
}
export default CityCard;
