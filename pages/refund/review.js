import Head from 'next/head';
import { Box, Container } from '@mui/material';
import { DashboardLayout } from '../../components/dashboard/dashboard-layout';

const Review = () => (
  <>
    <Head>
      <title>
        Analisar Reembolso
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
            Analisar Reembolso
        </Box>
      </Container>
    </Box>
  </>
);
Review.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Review;