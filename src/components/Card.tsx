import type { PropsWithChildren, ReactNode } from "react";

interface Props {
  label?: string;
  icon?: ReactNode;
  className?: string;
}

function Card(props: PropsWithChildren<Props>) {
  return (
    <div
      className={`flex flex-col backdrop-blur-sm rounded-md p-1.5 bg-blue-300/20  ${props.className}`}
    >
      <div className="flex items-center gap-2">
        {props.icon}
        <p className="text-xs uppercase">{props.label}</p>
      </div>
      {props.children}
    </div>
  );
}

export default Card;
