import React from "react";

const IconWrapper24 = ({
  children,
  width = 24,
  height = 24,
  onClick = () => {},
  className = "",
}) => {
  return (
    <svg
      onClick={onClick}
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      style={{
        minWidth: `${width}px`,
        minHeight: `${height}px`,
        display: "block",
      }}
      viewBox={`0 0 ${width} ${height}`}
      role="presentation"
    >
      <g fill={"currentColor"}>{children}</g>
    </svg>
  );
};

export default IconWrapper24;
