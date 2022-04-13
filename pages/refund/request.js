import Head from 'next/head';
import { Box, Container, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import { DashboardLayout } from '../../components/dashboard/dashboard-layout';
import { useForm } from 'react-hook-form';
import { LocalizationProvider, MobileDatePicker } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { useState } from 'react';

export default function Request () {

  const { register, handleSubmit } = useForm();
  
  const [value, setValue] = useState(Date.now());
  const handleChange = (newValue) => {
    setValue(newValue);
  };

  return (
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
          <Typography variant="h3">
              Solicitar Reembolso
          </Typography>
          </Box>
          <Box component="form"  noValidate sx={{ mt: 5 }}>
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
                  {...register('tipo-despesa')}
                  labelId="tipo-despesa-label"
                  id="tipo-despesa"
                  label="tipoDespesa"
                  fullWidth
                >
                  <MenuItem value={10}>Consulta</MenuItem>
                  <MenuItem value={20}>Exame/Procedimento/Terapia</MenuItem>
                  <MenuItem value={30}>Internação</MenuItem>
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
                      {...register('despesa')}
                      required
                      fullWidth
                      id="despesa"
                      name="despesa"
                      type="number"
                      autoFocus
                    />
            </Grid>

            <Grid 
              item
              lg={3}
              sm={6}
              xl={3}
              xs={12}
            >
              <LocalizationProvider dateAdapter={AdapterMoment}>

              <InputLabel id="data-procedimento">Data do Procedimento: </InputLabel>
              <MobileDatePicker
                  {...register('data-procedimento')}
                  id="data-procedimento"
                  inputFormat="dd/MM/yyyy"
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
                      {...register('nota-fiscal')}
                      required
                      fullWidth
                      id="nota-fiscal"
                      name="nota-fiscal"
                      type="number"
                      autoFocus
                    />
            </Grid>
            </Grid>
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

