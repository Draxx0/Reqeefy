export default function AppGroupLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex min-h-screen max-h-screen">
      <div className="w-1/3 left-0 fixed h-screen bg-[url('/assets/images/auth/auth-bg.jpg')]  bg-no-repeat bg-cover">
        <div className="relative flex flex-col justify-between h-full p-12">
          <div className="absolute bg-black/30 inset-0 w-full h-full"></div>
          <div className="p-3 rounded-md w-fit z-10">
            <p className="uppercase text-white font-belanosima tracking-wide font-bold spac text-2xl">
              Reqeefy
            </p>
          </div>
          <p className="text-white font-bold z-10">
            Réduisez la complexité des échanges avec vos clients : Notre
            plateforme, simplifie la gestion des requêtes pour une orientation
            précise en interne.
          </p>
        </div>
      </div>
      <div className="w-2/3 p-12 ml-[33.333333%]">{children}</div>
    </main>
  );
}
