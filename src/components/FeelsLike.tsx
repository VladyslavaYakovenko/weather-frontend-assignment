import Temperature from "./Temperature";

interface Props {
  feelsLikeTemp: number;
  actualTemp: number;
}

function FeelsLike(props: Props) {
  let description = "Similar to the actual temperature.";

  if (props.feelsLikeTemp < props.actualTemp) {
    description = "Wind is making it feel colder.";
  } else if (props.feelsLikeTemp > props.actualTemp) {
    description = "Humidity is making it feel warmer.";
  }

  return (
    <div className="flex flex-col justify-between h-full">
      <Temperature
        value={props.feelsLikeTemp}
        className="text-4xl self-start"
      />
      <p className="text-lg">{description}</p>
    </div>
  );
}

export default FeelsLike;
