'use client';
import { Navigation } from '@/layouts';
export default function AppGroupLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navigation />
      <main className="ml-[5vw]">{children}</main>
    </>
  );
}
