import Head from "next/head";
import Image from "next/image";
import Header from "../components/Header";
import Nav from "../components/Nav";
import Results from "../components/Results";
import requests from "../utils/requests";

export default function Home({ results }) {
  console.log(results);
  return (
    <div className="">
      <Head>
        <title>Hulu 2.0</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* Header */}
      <Header />
      {/* Navbar */}
      <Nav />
      {/* Movie Cards aka Body */}
      <Results results={results} />
    </div>
  );
}

export const getServerSideProps = async (context) => {
  const genre = context.query.genre;
  const res = await fetch(
    `https://api.themoviedb.org/3${
      requests[genre]?.url || requests.fetchTrending.url
    }`
  );
  const data = await res.json();

  return {
    props: { results: data.results },
  };
};
