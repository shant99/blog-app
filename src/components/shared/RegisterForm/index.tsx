"use client";

import { TRegisterSchema, registerSchema } from "@/lib/schemas/RegisterSchema";
import { Card, CardHeader, CardBody, Button, Input } from "@nextui-org/react";
import AnimatedComponent from "@/components/animations/AnimatedComponent";
import registerWithCred from "@/actions/authActions/registerWithCred";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { GiPadlock } from "react-icons/gi";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import "./styles.css";

function RegisterForm() {
  const t = useTranslations();
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm<TRegisterSchema>({
    resolver: zodResolver(registerSchema),
    mode: "onTouched",
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });
  console.log(isValid, "isValid");
  const onSubmit = async (data: TRegisterSchema) => {
    const response = await registerWithCred(data, t);

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
            <h1>{t("navLinks.register")}</h1>
          </div>
          <p>{t("other.welcome_to_blog")}</p>
        </div>
      </CardHeader>
      <CardBody className="card-body">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4">
            <Input
              label={t("form.name")}
              variant="bordered"
              {...register("name")}
              isInvalid={!!errors.name}
              errorMessage={errors.name?.message}
            />
            <Input
              label={t("form.email")}
              variant="bordered"
              {...register("email")}
              isInvalid={!!errors.email}
              errorMessage={errors.email?.message}
            />
            <Input
              label={t("form.password")}
              variant="bordered"
              type="password"
              {...register("password")}
              isInvalid={!!errors.password}
              errorMessage={errors.password?.message}
            />
            <Button
              isLoading={isSubmitting}
              className="w-1/3"
              color="primary"
              type="submit"
              isDisabled={!isValid}
            >
              {t("navLinks.register")}
            </Button>
          </div>
        </form>
      </CardBody>
    </Card>
  );
}

export default RegisterForm;
