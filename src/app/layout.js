import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "../components/Navbar";
import { AdmissionModalProvider } from "../context/AdmissionModalContext";
import AdmissionModal from "../components/AdmissionModal";

const sansFont = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata = {
  title: "KidzStar Preschool | Where Little Stars Shine Brighter",
  description: "Welcome to KidzStar Preschool. Explore our programs, exceptional teaching staff, playful learning spaces, and step-by-step admission process.",
  keywords: ["preschool", "kindergarten", "early childhood education", "daycare", "child development"],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={sansFont.variable}>
      <body>
        <AdmissionModalProvider>
          <Navbar />
          <AdmissionModal />
          <main>
            {children}
          </main>
        </AdmissionModalProvider>
      </body>
    </html>
  );
}
