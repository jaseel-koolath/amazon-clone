import Head from 'next/head';
import Banner from '../components/Banner';
import Header from '../components/Header';
import ProuductsFeed from '../components/ProuductsFeed';

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
  const products = await fetch('https://fakestoreapi.com/products/').then(
    (res) => res.json()
  );
  const electronics = await fetch(
    'https://fakestoreapi.com/products/category/electronics'
  ).then((res) => res.json());
  const jewelery = await fetch(
    'https://fakestoreapi.com/products/category/jewelery'
  ).then((res) => res.json());

  return {
    props: { products, electronics, jewelery }, // will be passed to the page component as props
  };
}
