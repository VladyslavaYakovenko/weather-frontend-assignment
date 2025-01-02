import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "./reset.css";
import App from "./App.tsx";

import isToday from "dayjs/plugin/isToday";
import dayjs from "dayjs";
import weekDay from "dayjs/plugin/weekday";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
dayjs.extend(weekDay);
dayjs.extend(isToday);
dayjs.extend(utc);
dayjs.extend(timezone);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
