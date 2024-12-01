"use client";
import { locales } from "@/constants/locales";
import { getLocaleCookie, setLocaleCookie } from "@/services/locale";
import { Select, SelectItem } from "@nextui-org/react";
import clsx from "clsx";
import { useTranslations } from "next-intl";
import { useEffect, useState, useTransition } from "react";

export default function LanguageSwitcher() {
  const t = useTranslations();
  const [value, setValue] = useState<string>("en");
  const [isMounted, setIsMounted] = useState(false);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    (async () => {
      try {
        const locale = await getLocaleCookie();
        setIsMounted(true);
        setValue(locale);
      } catch (error) {
        console.error("Error fetching locale cookie: ", error);
      }
    })();
  }, []);

  const handleLocaleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const lang = event.target.value;
    setValue(lang);
    startTransition(() => {
      setLocaleCookie(lang);
    });
  };

  if (!isMounted) {
    return null;
  }

  return (
    <Select
      name="language"
      label={t("form.select_lang")}
      labelPlacement="inside"
      onChange={handleLocaleChange}
      value={value}
      defaultSelectedKeys={[value]}
      className={clsx(
        "max-w-36",
        isPending && "pointer-events-none opacity-60"
      )}
      size="sm"
    >
      {locales.map((item) => (
        <SelectItem key={item.key} value={item.key}>
          {item.label}
        </SelectItem>
      ))}
    </Select>
  );
}
