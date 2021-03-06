import Head from 'next/head';
import { Box, Container, Grid, IconButton, Modal, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip, Typography } from '@mui/material';
import { DashboardLayout } from '../../components/dashboard/dashboard-layout';
import { useEffect, useState } from 'react';
import { getRefunds } from '../../services/refund';
import moment from 'moment';
import StatusRefund from './status-refund';
import EditIcon from '@mui/icons-material/Edit';
import { parseCookies } from 'nookies';
import NextLink from 'next/link';


export default function Review() {
  const [myRequests, setMyRequests] = useState();

  useEffect( async () => {
    try{
      const requests = await getRefunds();
      setMyRequests(requests);
    }catch(error){
      throw error
    }
  }, [])
    
  return(
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
          py: 4
        }}
      >
        <Container maxWidth={false}>
          <Box sx={{ mt: 3 }}>
            <Typography variant="h5">
                Analisar Reembolsos
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
                    <TableCell align="center">Solicitante</TableCell>
                    <TableCell align="center">Data</TableCell>
                    <TableCell align="center">Descrição</TableCell>
                    <TableCell align="center">Valor</TableCell>
                    <TableCell align="center">Status</TableCell>
                    <TableCell align="center">Ações</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {myRequests?.map((myRequest) => (
                    <TableRow
                      key={myRequest.id}
                    >
                      <TableCell align="center">{myRequest.userName}</TableCell>
                      <TableCell align="center">{moment(myRequest.date).format('DD/MM/yyyy')}</TableCell>
                      <TableCell align="center">{myRequest.description}</TableCell>
                      <TableCell align="center">R$ {myRequest.price}</TableCell>
                      <TableCell align="center">{<StatusRefund statusRefund={myRequest.status}></StatusRefund>}</TableCell>
                      <TableCell align="center">
                        <NextLink
                          href={`/refund/edit/${myRequest.id}`}
                        >
                          <IconButton>
                            <Tooltip title="Editar">
                              <EditIcon fontSize="small" />
                            </Tooltip>
                          </IconButton>
                        </NextLink>
                      </TableCell>
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

Review.getLayout = (page) => (
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