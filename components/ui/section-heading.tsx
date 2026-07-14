import type { ReactNode } from "react";

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description?: ReactNode;
  align?: "left" | "center";
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
}: SectionHeadingProps) {
  return (
    <div className={`section-heading section-heading--${align}`}>
      <span className="section-kicker">
        <span aria-hidden="true" />
        {eyebrow}
      </span>
      <h2>{title}</h2>
      {description ? <p>{description}</p> : null}
    </div>
  );
}
