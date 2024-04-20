import { Belanosima, Nunito_Sans } from 'next/font/google';

const belanosima = Belanosima({
  weight: ['400', '700'],
  style: ['normal'],
  display: 'swap',
  subsets: ['latin'],
  variable: '--font-belanosima',
});

const nunito_Sans = Nunito_Sans({
  weight: ['400', '700'],
  style: ['normal'],
  display: 'swap',
  subsets: ['latin'],
  variable: '--font-nunito-sans',
});

const fonts = {
  belanosima,
  nunito_Sans,
};

export const fontsVariables = Object.values(fonts)
  .map((font) => font.variable)
  .join(' ');
