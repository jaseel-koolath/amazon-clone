import { unstable_getServerSession } from 'next-auth';
import Head from 'next/head';
import Banner from '../components/Banner';
import Header from '../components/Header';
import ProuductsFeed from '../components/ProuductsFeed';
import { authOptions } from './api/auth/[...nextauth]';

export default function Home({ products, electronics, jewelery }) {
  return (
    <div>
      <Head>
        <title>Amazon 2.0</title>
      </Head>
      <Header />
      <main className='max-w-screen-2xl mx-auto'>
        {/* Banner  */}
        <Banner />
        {/* Product */}
        <ProuductsFeed
          products={products}
          electronics={electronics}
          jewelery={jewelery}
        />
      </main>
    </div>
  );
}

export async function getServerSideProps(context) {
  const [products, electronics, jewelery, session] = await Promise.all([
    fetch('https://fakestoreapi.com/products/').then((res) => res.json()),
    fetch('https://fakestoreapi.com/products/category/electronics').then(
      (res) => res.json()
    ),
    fetch('https://fakestoreapi.com/products/category/jewelery').then((res) =>
      res.json()
    ),
    unstable_getServerSession(context.req, context.res, authOptions),
  ]);

  return {
    props: { products, electronics, jewelery }, // will be passed to the page component as props
  };
}
