import Head from 'next/head';
import { Alert, AlertTitle, Box, Button, Collapse, Container, FormControl, Grid, InputLabel, MenuItem, Paper, Select, TextField, Typography } from '@mui/material';
import { DashboardLayout } from '../../components/dashboard/dashboard-layout';
import { useForm } from 'react-hook-form';
import { LocalizationProvider, MobileDatePicker } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { useState } from 'react';
import { createRefund } from '../../services/refund';
import CpnjInput from '../../components/cpnj/cnpj-input';
import { useRouter } from 'next/router';
import { parseCookies } from 'nookies';
import TypeRefundEnum from '../../enums/typeRefundEnum';
import TypeNameRefundEnum from '../../enums/typeNameRefundEnum';

export default function Request () {

  const { register, handleSubmit } = useForm();
  const [value, setValue] = useState(Date.now());
  const [isValid, setIsValid] = useState(false);
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const handleChange = (newValue) => {
    setValue(newValue);
  };

  async function handleRequest(data){
    try{

      await createRefund(data);
      setIsValid(true);
      setOpen(true);
      await new Promise((resolve) => setTimeout(() => { resolve('result') },2000));
      router.push('/refund/my-requests')
    }catch(error){
      setIsValid(false);
      setOpen(true);  
      throw error 
    }
  } 

  return (
    <>
      <Head>
        <title>
          Solicitar Reembolso
        </title>
      </Head>

      <Collapse in={open}>
            {isValid
                  ? <Alert
                      severity='success'
                      action={
                        <Button color="inherit" size="small" onClick={() => {setOpen(false);}}> 
                          Fechar
                        </Button>
                      }
                    >
                      <AlertTitle>Deu tudo certo!</AlertTitle>
                        Solicitação de Reembolso realizada com sucesso!
                    </Alert>
                  : <Alert
                      severity='error'
                      action={
                        <Button color="inherit" size="small" onClick={() => {setOpen(false);}}> 
                          Fechar
                        </Button>
                      }
                    >
                      <AlertTitle>Erro</AlertTitle>
                        Ocorreu um problema ao solicitar reembolso. Tente novamente.
                    </Alert>
            }
           
      </Collapse>

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
            Solicitar Reembolso
          </Typography>
        </Box>

          <Box component="form"  onSubmit={handleSubmit(handleRequest)} noValidate sx={{ mt: 5 }}>

            <Paper
              elevation={24}
              sx={{
                p: 5
              }}
            >

                <Grid
                  container
                  spacing={3}
                >
                <Grid 
                  item
                  lg={4}
                  sm={6}
                  xl={3}
                  xs={12}
                >
                  
                  <InputLabel id="tipo-despesa-label">Tipo de Despesa: </InputLabel>
                    <Select
                      {...register('type')}
                      labelId="tipo-despesa-label"
                      id="type"
                      label="type"
                      required
                      fullWidth
                    >
                      <MenuItem value={TypeRefundEnum.CONSULTA}>{TypeNameRefundEnum.CONSULTA}</MenuItem>
                      <MenuItem value={TypeRefundEnum.EXAME_PROCEDIMENTO_TERAPIA}>{TypeNameRefundEnum.EXAME_PROCEDIMENTO_TERAPIA}</MenuItem>
                      <MenuItem value={TypeRefundEnum.INTERNACAO}>{TypeNameRefundEnum.INTERNACAO}</MenuItem>
                    </Select>
                </Grid>
                <Grid
                  item
                  lg={4}
                  sm={6}
                  xl={3}
                  xs={12}
                >
                  <InputLabel id="despesa">Valor da despesa: </InputLabel>
                  
                    <TextField
                          {...register('price')}
                          fullWidth
                          id="price"
                          type="text"
                          autoFocus

                        />

                </Grid>

                <Grid 
                  item
                  lg={4}
                  sm={6}
                  xl={3}
                  xs={12}
                >
                  <LocalizationProvider dateAdapter={AdapterMoment}>

                  <InputLabel id="data-procedimento">Data do Procedimento: </InputLabel>
                  <MobileDatePicker
                      {...register('date')}
                      labelId="data-procedimento"
                      id="date"
                      inputFormat="DD/MM/yyyy"
                      onChange={handleChange}
                      value={value}
                      fullWidth
                      renderInput={(params) => <TextField {...params} />}
                    />

                    </LocalizationProvider>
                </Grid>  
                <Grid
                  item
                  lg={4}
                  sm={6}
                  xl={3}
                  xs={12}
                >
                  <InputLabel id="nota-fiscal">Número da Nota Fiscal: </InputLabel>
                    <TextField
                          {...register('nFeNumber')}
                          fullWidth
                          id="nFeNumber"
                          type="number"
                          autoFocus
                        />
                </Grid>
                <Grid
                  item
                  lg={4}
                  sm={6}
                  xl={3}
                  xs={12}
                >
                  <InputLabel id="link-nota-fiscal">Link da Nota Fiscal Eletrônica: </InputLabel>
                    <TextField
                          {...register('nFeLink')}
                          fullWidth
                          id="nFeLink"
                          type="text"
                          autoFocus
                        />
                </Grid>
                <Grid
                  item
                  lg={4}
                  sm={6}
                  xl={3}
                  xs={12}
                >
                 <CpnjInput register={register}/>
                </Grid>
                <Grid
                  item
                  lg={12}
                  sm={6}
                  xl={3}
                  xs={12}
                >
                  <InputLabel id="descricao">Descrição: </InputLabel>
                    <TextField
                          {...register('description')}
                          fullWidth
                          id="description"  
                          multiline
                          maxRows={6}
                          type="text"
                          autoFocus
                        />
                </Grid>
                <Grid
                   item
                   lg={3}
                   sm={6}
                   xl={3}
                   xs={12}
                />
                <Grid
                   item
                   lg={3}
                   sm={6}
                   xl={3}
                   xs={12}
                >
                  <Button
                    type="button"
                    fullWidth
                    variant="contained"
                    onClick={() => router.back()}
                    sx={{ mt: 3, mb: 2 }}            
                  >
                    Voltar
                </Button>
                </Grid>
                <Grid
                   item
                   lg={3}
                   sm={6}
                   xl={3}
                   xs={12}
                >
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}            
                  >
                    Cadastrar
                </Button>
                </Grid>
                <Grid
                   item
                   lg={3}
                   sm={6}
                   xl={3}
                   xs={12}
                />
                </Grid>
            </Paper> 
          </Box>
        </Container>
      </Box>
    </>
  );
}
Request.getLayout = (page) => (
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