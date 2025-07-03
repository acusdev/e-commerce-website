import { ChildrenNodeProps } from "@/types/children";
import { Metadata } from "next";
import { getMessages } from "next-intl/server";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const messages = await getMessages({ locale });
  return {
    title: `${messages.signInPage.meta.title} | Acus's Shop`,
    description: messages.signInPage.meta.description,
  };
}

const Layout = ({ children }: ChildrenNodeProps) => {
  return children;
};

export default Layout;
