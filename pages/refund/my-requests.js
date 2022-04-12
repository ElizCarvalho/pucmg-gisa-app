import Head from 'next/head';
import { Box, Container } from '@mui/material';
import { DashboardLayout } from '../../components/dashboard/dashboard-layout';

const MyRequests = () => (
  <>
    <Head>
      <title>
        Minhas Solicitações de Reembolso
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
        {/* <CustomerListToolbar /> */}
        <Box sx={{ mt: 3 }}>
            Minhas Solicitações de Reembolso
          {/* <CustomerListResults customers={customers} /> */}
        </Box>
      </Container>
    </Box>
  </>
);
MyRequests.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default MyRequests;  