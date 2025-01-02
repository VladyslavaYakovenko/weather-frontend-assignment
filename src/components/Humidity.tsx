import Temperature from "./Temperature";

interface Props {
  humidity: number;
  dewpoint: number;
}

function HumidityCard(props: Props) {
  return (
    <div className="flex flex-col h-full justify-between">
      <p className="text-4xl">{props.humidity}%</p>
      <div className="text-lg">
        The dew point is <Temperature className="mr-2" value={props.dewpoint} />{" "}
        right now.
      </div>
    </div>
  );
}
export default HumidityCard;
