import { useRouter } from 'next/router';

export default function PDP() {
  const router = useRouter();
  console.log(router.query)
  return <h1>PDP with id: {router.query.id}</h1>;
}
PDP.getInitialProps = async () => {
  return {};
};
