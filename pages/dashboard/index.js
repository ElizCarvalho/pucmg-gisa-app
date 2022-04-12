import Head from 'next/head';
import { Box, Container, Grid } from '@mui/material';
import { DashboardLayout } from '../../components/dashboard/dashboard-layout';
import { parseCookies } from 'nookies';
import { GetServerSideProps } from 'next';

const Dashboard = () => (
  <>
    <Head>
      <title>
        Boa Saúde - Meu Painel
      </title>
    </Head>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8
      }}
    >
      <Container maxWidth={false}>
        Meu Painel
        <Grid
          container
          spacing={3}
        >
          <Grid
            item
            lg={3}
            sm={6}
            xl={3}
            xs={12}
          >
            {/* Quadrado 1 para página inicial */}
          </Grid>
          <Grid
            item
            lg={3}
            sm={6}
            xl={3}
            xs={12}
          >
            {/* Quadrado 2 para a página inicial */}
          </Grid>
        </Grid>
      </Container>
    </Box>
  </>
);

Dashboard.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export const getServerSideProps = async(ctx) => {
  const { ['gisa-token']: token } = parseCookies(ctx);

  if(!token){
      return {
          redirect: {
              destination: '/account/login',
              permanent: false
          }
      }
  }

  return {
      props:{}
  }
}

export default Dashboard;