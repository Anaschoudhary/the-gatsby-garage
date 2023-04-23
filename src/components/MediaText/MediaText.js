import React from "react";
import { GatsbyImage } from "gatsby-plugin-image";
export const MediaText = ({
  verticalAlignment,
  style,
  className,
  mediaPosition,
  gatsbyImage,
  children,
}) => {
  console.log("Media Position", mediaPosition);
  const content = (
    <div
      className={`flex p-4 ${
        verticalAlignment === "center" ? "items-center" : ""
      }`}
    >
      <div>{children}</div>
    </div>
  );
  return (
    <div style={style} className={className}>
      {mediaPosition === "right" && content}
      <div>
        <GatsbyImage alt="" image={gatsbyImage} />
      </div>
      {mediaPosition !== "right" && content}
    </div>
  );
};
