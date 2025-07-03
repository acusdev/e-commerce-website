import { ChildrenNodeProps } from "@/types/children";
import { Metadata } from "next";
import { getMessages } from "next-intl/server";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const messages = await getMessages({ locale });
  return {
    title: `${messages.signUpPage.meta.title} | Acus's Shop`,
    description: messages.signUpPage.meta.description,
  };
}

const Layout = ({ children }: ChildrenNodeProps) => {
  return children;
};

export default Layout;
