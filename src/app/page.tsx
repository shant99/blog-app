"use client";
import { useTranslations } from "next-intl";

export default function HomePage() {
  const t = useTranslations();

  return (
    <div className="min-h-screen flex items-center justify-center  w-full">
      <div className="p-8 max-w-md bg-white shadow-lg rounded-md text-center">
        <h1 className="text-3xl font-bold mb-4 text-blue-600">
          {t("HomePage.title")}
        </h1>
      </div>
    </div>
  );
}
