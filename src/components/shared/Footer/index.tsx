"use client";

import LanguageSwitcher from "../LanguageSwitcher";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="flex flex-col gap-[100px] pt-[100px]">
      <LanguageSwitcher />
      <div className="text-center py-4 text-sm text-gray-300">
        © {currentYear} Shant Hakobyan. All rights reserved.
      </div>
    </footer>
  );
}
