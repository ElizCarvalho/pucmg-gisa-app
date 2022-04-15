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