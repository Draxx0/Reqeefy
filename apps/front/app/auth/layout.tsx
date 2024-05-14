import Image from 'next/image';

export default function AppGroupLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex min-h-screen max-h-screen">
      <div className="w-2/5 left-0 fixed h-screen bg-[url('/assets/images/auth/auth-bg.jpg')]  bg-no-repeat bg-cover">
        <div className="relative flex flex-col justify-between h-full p-12">
          <div className="absolute bg-black/30 inset-0 w-full h-full"></div>
          <div className="py-2 px-3 rounded-lg w-fit z-10 flex items-center gap-1 backdrop-blur-2xl bg-gradient-main shadow-sm">
            <div className="relative w-12 h-12">
              <Image
                src={'/assets/icons/reqeefy-logo.svg'}
                fill
                alt="Logo Reqeefy"
              />
            </div>
            <p className="uppercase text-xl text-white font-bold font-montserrat">
              Reqeefy
            </p>
          </div>
          <p className="text-white font-light z-10">
            Réduisez la complexité des échanges avec vos clients : Notre
            plateforme, simplifie la gestion des requêtes pour une orientation
            précise en interne.
          </p>
        </div>
      </div>
      <div className="w-3/5 p-12 ml-[40%]">{children}</div>
    </main>
  );
}
