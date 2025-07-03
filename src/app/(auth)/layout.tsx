import LanguageDropdown from "@/components/dropdown/language-dropdown";
import { ChildrenNodeProps } from "@/types/children";
import { ShoppingBag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const Layout = ({ children }: ChildrenNodeProps) => {
  return (
    <div className="relative min-h-screen grid grid-cols-2">
      <div className="flex flex-col items-center justify-center relative">
        <div className="absolute top-8 left-8">
          <Link href="/" className="flex items-center gap-2">
            <ShoppingBag className="size-5" />
            <label className="font-semibold text-lg">Acus&apos;s Shop</label>
          </Link>
        </div>
        <div className="absolute top-8 right-8">
          <LanguageDropdown />
        </div>
        {children}
      </div>
      <div className="grow relative">
        <Image src="/images/auth-hero.png" priority={true} alt="Auth hero image" className="object-cover" fill />
      </div>
    </div>
  );
};

export default Layout;
