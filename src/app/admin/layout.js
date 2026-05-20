import "./admin.css";

export const metadata = {
  title: "Admin Dashboard | KidzStar",
  description: "KidzStar admission enquiry management dashboard",
  robots: "noindex, nofollow",
};

export default function AdminLayout({ children }) {
  return (
    <>
      {/* Hide root navbar & main padding for admin pages */}
      <style>{`
        nav, header:not(.dashboard-header) { display: none !important; }
        main { padding: 0 !important; margin: 0 !important; }
      `}</style>
      {children}
    </>
  );
}
