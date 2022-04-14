import Head from 'next/head';
import { Box, Container, Grid, Typography } from '@mui/material';
import { DashboardLayout } from '../../components/dashboard/dashboard-layout';
import { parseCookies } from 'nookies';
import { GetServerSideProps } from 'next';
import { Image } from '@mui/icons-material';

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
        <Box sx={{ mt: 3 }}>
          <Typography variant="h3">
            Meu Painel
          </Typography>
        </Box>
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
            <img 
                src="/painel-1.svg" 
                width={500} 
                height={500}/>
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