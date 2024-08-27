import { Inter } from "next/font/google";
import "./globals.css";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import UniversalLayout from "./components/UniversalLayout";
import { ContextProvider } from "@/context/context";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AntdRegistry>
          <ContextProvider>
        <UniversalLayout>
        {children}
        </UniversalLayout>
          </ContextProvider>
        </AntdRegistry>
        </body>
    </html>
  );
}
