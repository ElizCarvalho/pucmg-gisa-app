import Head from 'next/head';
import { Box, Container, Grid, Paper, Typography } from '@mui/material';
import { DashboardLayout } from '../../components/dashboard/dashboard-layout';
import { parseCookies } from 'nookies';
import { GetServerSideProps } from 'next';
import DashboardMenu from '../../components/dashboard/deshboard-menu';

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
        py: 4
      }}
    >

      <Container maxWidth={false}>
      <Box sx={{ mb: 8,}}>
          <Typography variant="h5">
            Meu Painel
          </Typography>
        </Box>

     
         <Paper
            sx={{
              position: 'relative',
              color: '#fff',
              mb: 4,
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',
              backgroundImage: `url('painel.jpg')`,
              height: 350
            }}
      >
      <Grid container sx={{ flexDirection: 'column '}}>
        <Grid item md={12}>
          <Box
            sx={{
              position: 'relative',
              p: { xs: 3, md: 1 },
              mt: 15,
              pr: { md: 0 },
            }}
          >
            <Typography component="h1" variant="h3" color="inherit" textAlign="center" gutterBottom >
              Alterações da Rede Credenciada 
            </Typography>
            <Typography variant="h5" color="inherit" textAlign="center" paragraph>
              <a href="#">Clique Aqui</a> e confira!
            </Typography>
      
          </Box>
        </Grid>
      </Grid>
          
          {<img style={{ display: 'none'}} src="/painel.jpg" />} 
         </Paper> 
         <Grid
          container
          spacing={3}
        >
             <DashboardMenu />
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