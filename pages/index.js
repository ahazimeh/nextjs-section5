import fs from "fs/promises";
import path from "path";

import Link from "next/link";
function HomePage(props) {
  const { products } = props;
  return (
    <ul>
      {products.map(product => <li key={product.id}><Link href={`/products/${product.id}`}>{product.title}</Link></li>)}
    </ul>
  );
}

export async function getStaticProps(context) {
  console.log("Regenerating")
  const filePath = path.join(process.cwd(), 'data', 'dummy-backend.json')
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData)
  if (!data) {
    return {
      redirect: {
        destination: '/no-data'
      }
    }
  }
  if (!data.products.length)
    return { notFound: true }
  return {
    props: {
      // products: [{ id: 'p1', title: 'Title1' }]
      products: data.products
    },
    revalidate: 10,
  }
}

export default HomePage;
