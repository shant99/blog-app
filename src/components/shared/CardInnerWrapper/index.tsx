import {
  CardHeader,
  Divider,
  CardBody,
  CardFooter,
  Card,
} from "@nextui-org/react";
import React, { ReactNode } from "react";

type Props = {
  header: ReactNode | string;
  body: ReactNode;
  footer?: ReactNode;
};

export default function CardInnerWrapper({ header, body, footer }: Props) {
  return (
    <Card>
      <CardHeader>
        {typeof header === "string" ? (
          <div className="text-2xl font-semibold text-default">{header}</div>
        ) : (
          <>{header}</>
        )}
      </CardHeader>
      <Divider />
      <CardBody
        style={{
          maxHeight: "500px",
        }}
      >
        {body}
      </CardBody>
      {footer && <CardFooter>{footer}</CardFooter>}
    </Card>
  );
}
