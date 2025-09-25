import './globals.css';

export const metadata = {
  title: 'Solve Ease — Workers',
  description: 'Workers directory built with Next.js 14'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased bg-gray-50 text-gray-900">
        {children}
      </body>
    </html>
  );
}
