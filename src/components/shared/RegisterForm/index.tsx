"use client";

import { TRegisterSchema, registerSchema } from "@/lib/schemas/RegisterSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardHeader, CardBody, Button, Input } from "@nextui-org/react";
import { useTranslations } from "next-intl";
import React from "react";
import { useForm } from "react-hook-form";
import { GiPadlock } from "react-icons/gi";
import "./styles.css";

export default function RegisterForm() {
  const t = useTranslations();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm<TRegisterSchema>({
    resolver: zodResolver(registerSchema),
    mode: "onTouched",
  });

  const onSubmit = (data: TRegisterSchema) => {
    console.log(data);
  };

  return (
    <Card className="box-shadow-neon card">
      <CardHeader className="card-header">
        <div>
          <div>
            <GiPadlock size={30} />
            <h1>{t("navLinks.register")}</h1>
          </div>
          <p>{t("other.welcome_to_blog")}</p>
        </div>
      </CardHeader>
      <CardBody className="card-body">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4">
            <Input
              defaultValue=""
              label={t("form.name")}
              variant="bordered"
              {...register("name")}
              isInvalid={!!errors.name}
              errorMessage={errors.name?.message}
            />
            <Input
              defaultValue=""
              label={t("form.email")}
              variant="bordered"
              {...register("email")}
              isInvalid={!!errors.email}
              errorMessage={errors.email?.message}
            />
            <Input
              defaultValue=""
              label={t("form.password")}
              variant="bordered"
              type="password"
              {...register("password")}
              isInvalid={!!errors.password}
              errorMessage={errors.password?.message}
            />
            <Button
              isLoading={isSubmitting}
              isDisabled={!isValid}
              fullWidth
              color="default"
              type="submit"
            >
              {t("navLinks.register")}
            </Button>
          </div>
        </form>
      </CardBody>
    </Card>
  );
}
