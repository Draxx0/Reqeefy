import { Navigation } from '@/layouts';
export default function AppGroupLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navigation />
      <main className="my-[50px] mx-auto max-w-8/10">{children}</main>
    </>
  );
}
