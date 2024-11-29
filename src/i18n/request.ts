import { getLocaleCookie } from "@/services/locale";
import { getRequestConfig } from "next-intl/server";

export default getRequestConfig(async () => {
  const locale = await getLocaleCookie();

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});
