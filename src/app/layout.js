import "./globals.css";

export const metadata = {
  title: "Bookify",
  description: "Task #5: Itransition Internship",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
         <head>
         <link rel="preconnect" href="https://fonts.googleapis.com"/>
         <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true"></link>
         <link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&family=Raleway:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet"/>
       </head>
      <body suppressHydrationWarning className="montserrat-body">
        {children}
      </body>
    </html>
  );
}