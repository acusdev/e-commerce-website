/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Locale } from "@/i18n/config";
import { setUserLocale } from "@/services/locale";
import { Check, ChevronDown } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import React, { useMemo, useTransition } from "react";

const lanuages = [
  {
    value: "en",
    label: "English",
    flag: "/flag-icons/us.svg",
  },
  {
    value: "vi",
    label: "Tiếng Việt",
    flag: "/flag-icons/vn.svg",
  },
];

interface LanguageDropdownProps {
  type?: "button" | "navbar";
}

const LanguageDropdown = ({ type = "button" }: LanguageDropdownProps) => {
  const t = useTranslations("components.languageDropdown");
  const locale = useLocale();
  const [_, startTransition] = useTransition();

  function onChangeLanuage(value: string) {
    const locale = value as Locale;
    startTransition(() => {
      setUserLocale(locale);
    });
  }

  const currentLocale = useMemo(() => lanuages.find((lang) => lang.value === locale) || lanuages[0], [locale]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={type === "navbar" ? "ghost" : "outline"} size={type === "navbar" ? "icon" : "default"}>
          {type === "navbar" ? (
            <Image src={currentLocale.flag} alt={`${currentLocale.label}`} width={16} height={16} />
          ) : (
            <>
              <Image src={currentLocale.flag} alt={`${currentLocale.label}`} width={16} height={16} />
              <span className="text-sm font-normal">{currentLocale.label}</span>
              <ChevronDown className="size-4" />
            </>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[160px]">
        <DropdownMenuLabel>{t("ctaText")}</DropdownMenuLabel>
        <DropdownMenuGroup>
          {lanuages.map((lang) => (
            <DropdownMenuItem
              key={lang.value}
              onSelect={() => onChangeLanuage(lang.value)}
              className="grid grid-cols-[1fr_auto] items-center gap-2"
            >
              <div className="flex items-center gap-2">
                <Image src={lang.flag} alt={`${lang.label} Flag`} width={16} height={16} />
                <span>{lang.label}</span>
              </div>
              {lang.value === locale && <Check className="size-4" />}
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageDropdown;
