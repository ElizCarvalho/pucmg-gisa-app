import Head from 'next/head';
import { Box, Container, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { DashboardLayout } from '../../components/dashboard/dashboard-layout';
import { useEffect, useState } from 'react';
import { getRefunds } from '../../services/refund';
import moment from 'moment';
import StatusRefund from './status-refund';


export default function MyRequests(){
  const [myRequests, setMyRequests] = useState();

  useEffect( async () => {
    try{
      const requests = await getRefunds();
      setMyRequests(requests);
    }catch(error){
      throw error
    }
  }, [])
  

  return (
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
        py: 4
      }}
    >
      <Container maxWidth={false}>
        <Box sx={{ mb: 8,}}>
          <Typography variant="h5">
            Minhas Solicitações de Reembolso
          </Typography>
        </Box>
      </Container>

      <Paper
              elevation={24}
              sx={{
                p: 5
              }}
            >
      <Grid
        item
          lg={12}
          sm={12}
          xl={12}
          xs={12}
      >
           <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell align="center">Data</TableCell>
                    <TableCell align="center">Descrição</TableCell>
                    <TableCell align="center">Valor</TableCell>
                    <TableCell align="center">Status</TableCell>
                    <TableCell align="center">Atualizado em</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {myRequests?.map((myRequest) => (
                    <TableRow>
                      <TableCell align="center">{moment(myRequest.date).format('DD/MM/yyyy')}</TableCell>
                      <TableCell align="center">{myRequest.description}</TableCell>
                      <TableCell align="center">R$ {myRequest.price}</TableCell>
                      <TableCell align="center">{<StatusRefund statusRefund={myRequest.status}></StatusRefund>}</TableCell>
                      <TableCell align="center">{(myRequest.updatedAt ? moment(myRequest.updatedAt).format('DD/MM/yyyy HH:MM') : '-')}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
      </Grid>
      </Paper>
    </Box>
  </>
  )
}

MyRequests.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);
 