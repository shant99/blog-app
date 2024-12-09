import { RUBIC_CUBIC_SPLINE_LINK } from "@/constants/externalLinks";
import { Skeleton } from "@nextui-org/react";
import React, { Suspense } from "react";
import "./styles.css";

const Spline = React.lazy(() => import("@splinetool/react-spline"));

export default function SplineRubic() {
  return (
    <Suspense
      fallback={<Skeleton className="rounded-lg rubic-cubic__skeleton" />}
    >
      <Spline
        scene={RUBIC_CUBIC_SPLINE_LINK}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "550px",
          height: "550px",
        }}
      />
    </Suspense>
  );
}
