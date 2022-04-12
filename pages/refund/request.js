import Head from 'next/head';
import { Box, Container } from '@mui/material';
import { DashboardLayout } from '../../components/dashboard/dashboard-layout';

const Request = () => (
  <>
    <Head>
      <title>
        Solicitar Reembolso
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
            Solicitar Reembolso
        </Box>
      </Container>
    </Box>
  </>
);
Request.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Request;