import "./global.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="flex min-h-screen items-center justify-center bg-gray-100">
        <div className="shadow-lg p-6 m-6 bg-white rounded-lg">{children}</div>
      </body>
    </html>
  );
}
