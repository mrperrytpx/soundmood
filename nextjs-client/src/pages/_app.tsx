import Head from "next/head";
import "../styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Serenity Hearth</title>
        <link rel="icon" type="image/svg+xml" href="hearthlogo.svg" />
        <meta
          name="description"
          content="Serenity Hearth - relax with the sound of a purring cat and a crackling fireplace."
        />
        <meta property="og:title" content="Serenity Hearth" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://serenity-hearth.vercel.app/" />
        <meta
          property="og:image"
          content="<%= require('../../public/background.webp') %>"
        />

        <meta
          property="og:description"
          content="Serenity Hearth - relax with the sound of a purring cat and a crackling fireplace."
        />
        <meta name="theme-color" content="#1fcfc1"></meta>
      </Head>
      <Component {...pageProps} />
    </>
  );
}
