import { HourForecastItem } from "../types";
import Temperature from "./Temperature";

interface Props {
  data: HourForecastItem;
}

function HourlyForecast(props: Props) {
  const hour = new Date(props.data.time).getHours();
  const icon = props.data.condition.icon;
  const temperature = props.data.temp_c;

  return (
    <div
      data-testid="hourly-forecast"
      className="flex flex-col items-center min-w-12 snap-start"
    >
      <div data-testid="hour">{hour}</div>
      <div>
        <img src={icon} alt="" />
      </div>

      <Temperature value={temperature} />
    </div>
  );
}

export default HourlyForecast;
