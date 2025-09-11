import Navbar from "@/components/Navbar";
import { AppProvider } from "../context/AppContext";
import AdminSideBar from "./AdminSideBar";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AppProvider>
          <Navbar />
          <div className="min-h-screen flex">
            <AdminSideBar />
            {/* Content wrapper */}
            <main className="flex-1 p-6 bg-gray-50 lg:ml-[230px]">
              {children}
            </main>
          </div>
        </AppProvider>
      </body>
    </html>
  );
}
