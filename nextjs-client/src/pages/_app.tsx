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
      </Head>
      <Component {...pageProps} />
    </>
  );
}
