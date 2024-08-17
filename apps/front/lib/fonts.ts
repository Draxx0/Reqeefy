import { Montserrat, Nunito_Sans } from 'next/font/google';

const montserrat = Montserrat({
  weight: ['400', '700'],
  style: ['normal'],
  display: 'swap',
  subsets: ['latin'],
  variable: '--font-montserrat',
});

const nunito_Sans = Nunito_Sans({
  weight: ['400', '700'],
  style: ['normal'],
  display: 'auto',
  subsets: ['latin'],
  variable: '--font-nunito',
});

const fonts = {
  montserrat,
  nunito_Sans,
};

export const fontsVariables = Object.values(fonts)
  .map((font) => font.variable)
  .join(' ');
