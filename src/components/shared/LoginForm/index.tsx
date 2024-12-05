"use client";

import { Button, Card, CardBody, CardHeader, Input } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { GiPadlock } from "react-icons/gi";
import { useForm } from "react-hook-form";
import { loginSchema, TLoginSchema } from "@/lib/schemas/LoginSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import "./styles.css";
import { useTranslations } from "next-intl";
import { toast } from "react-toastify";
import signInWithCred from "@/actions/authActions/signInWithCred";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const t = useTranslations();
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const {
    register,
    handleSubmit,
    formState: { isValid, errors, isSubmitting },
  } = useForm<TLoginSchema>({
    resolver: zodResolver(loginSchema),
    mode: "onTouched",
  });

  const onSubmit = async (data: TLoginSchema) => {
    const response = await signInWithCred(data, t);

    if (response.status === "error") {
      toast.error(response.error);
    }

    if (response.status === "success") {
      router.push("/welcome");
    }
  };

  if (!isMounted) {
    return null;
  }

  return (
    <Card className="box-shadow-neon card">
      <CardHeader className="card-header">
        <div>
          <div>
            <GiPadlock size={30} />
            <h1>{t("navLinks.login")}</h1>
          </div>
          <p>{t("other.welcome_to_blog")}</p>
        </div>
      </CardHeader>

      <CardBody className="card-body">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <Input
              defaultValue=""
              label={t("form.email")}
              variant="bordered"
              {...register("email")}
              isInvalid={!!errors.email}
              errorMessage={errors.email?.message as string}
            />
            <Input
              defaultValue=""
              label={t("form.password")}
              variant="bordered"
              type="password"
              {...register("password")}
              isInvalid={!!errors.password}
              errorMessage={errors.password?.message as string}
            />
            <Button
              className="w-1/3"
              color="primary"
              type="submit"
              isDisabled={!isValid}
              isLoading={isSubmitting}
            >
              {t("navLinks.login")}
            </Button>
          </div>
        </form>
      </CardBody>
    </Card>
  );
}
