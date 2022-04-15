import { GetServerSideProps } from 'next';
import { parseCookies } from 'nookies';

export default function Home() {
      return (<></>)
}
export const getServerSideProps = async() => {
  return {
      redirect: {
          destination: '/dashboard',
          permanent: false
      }
  }

}