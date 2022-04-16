import { Alert, AlertTitle, Box, Button, Collapse, Container, Grid, IconButton, InputLabel, List, ListItem, ListItemText, MenuItem, Paper, Select, Typography, Tooltip, Divider } from '@mui/material';
import { DashboardLayout } from '../../../components/dashboard/dashboard-layout';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { getRefundById, updateRefundById } from '../../../services/refund';
import { useRouter } from 'next/router';
import { parseCookies } from 'nookies';
import StatusRefundEnum from '../../../enums/statusRefundEnum';
import StatusNameRefundEnum from '../../../enums/statusNameRefundEnum';
import moment from 'moment';
import { ArrowBack } from '@mui/icons-material';
import NextLink from 'next/link';
import TypeNameRefundEnum from '../../../enums/typeNameRefundEnum';
import TypeRefundEnum from '../../../enums/typeRefundEnum';
import Head from 'next/head';


export default function EditRefund(){
    const [open, setOpen] = useState(false);
    const [isValid, setIsValid] = useState(false);
    const { register, handleSubmit } = useForm();
    const [editRefund, setEditRefund] = useState();
    const router = useRouter();
    const { id } = router.query
    
    useEffect( async () => {
        try{
          const refund = await getRefundById(id);
          setEditRefund(refund);
        }catch(error){
          throw error
        }
      }, [])

      async function handleRequest(data){
        try{
    
          await updateRefundById(id, data);
          setIsValid(true);
          setOpen(true);
          await new Promise((resolve) => setTimeout(() => { resolve('result') },2000));
          router.push('/refund/review')
    
        }catch(error){
          setIsValid(false);
          setOpen(true);  
          throw error 
        }
      } 

      function getTypeName(type){
          switch (type) {
            case TypeRefundEnum.CONSULTA:
                return TypeNameRefundEnum.CONSULTA
            case TypeRefundEnum.EXAME_PROCEDIMENTO_TERAPIA:
                return TypeNameRefundEnum.EXAME_PROCEDIMENTO_TERAPIA
            case TypeRefundEnum.INTERNACAO:
                return TypeNameRefundEnum.INTERNACAO
          }
      }
    return(
       <>
        <Head>
            <title>
                Atualizar Reembolso
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
                            Edição de Reembolso realizada com sucesso!
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
                            Ocorreu um problema ao editar reembolso. Tente novamente.
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

            <NextLink href={`/refund/review`}>
                    <IconButton>
                    <Tooltip title="Voltar">
                        <ArrowBack fontSize="small" />
                    </Tooltip>
                    </IconButton>
            </NextLink>

            <Paper
                elevation={24}
                sx={{
                    p: 5
                }}
                >
            <Box sx={{ mb: 8 }}>
                <Typography variant="h5">
                    Atualizar Reembolso
                </Typography>
            </Box>            
                    <Typography variant="h6">
                        Resumo
                    </Typography>

                    <Grid
                          item
                          lg={12}
                          sm={12}
                          xl={12}
                          xs={12}
                    >
                        <List
                            sx={{
                                textAlign: 'center'
                            }}
                        >
                            <ListItem  sx={{ py: 1, px: 0}}>
                                <ListItemText primary="Tipo de Despesa" secondary={getTypeName(editRefund?.type)}/>
                                <ListItemText primary="Valor da Despesa" secondary={`R$ ${editRefund?.price}`} />
                            </ListItem>
                            <ListItem  sx={{ py: 1, px: 0 }}>
                                <ListItemText primary="Data do Procedimento" secondary={moment(editRefund?.date).format('DD/MM/yyyy')} />
                                <ListItemText primary="Número da Nota Fiscal" secondary={editRefund?.nFeNumber}/>
                            </ListItem>
                            <ListItem  sx={{ py: 1, px: 0 }}>
                                <ListItemText primary="Link da Nota Fiscal Eletrônica" secondary={editRefund?.nFeLink} />
                            </ListItem>
                            <ListItem  sx={{ py: 1, px: 0 }}>
                                <ListItemText primary="CNPJ do Estabelecimento" secondary={editRefund?.cnpjProvider} />
                            </ListItem>
                            <ListItem  sx={{ py: 1, px: 0 }}>
                                <ListItemText primary="Descrição" secondary={editRefund?.description} />
                            </ListItem>
                    </List>
                </Grid>
                <Divider/>

                <Box component="form" onSubmit={handleSubmit(handleRequest)}  noValidate sx={{ mt: 5 }}>  
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
                            
                            <InputLabel id="tipo-despesa-label">Novo Status: </InputLabel>
                                <Select
                                {...register('status')}
                                labelId="tipo-despesa-label"
                                id="type"
                                label="type"
                                size="small"
                                fullWidth
                                >
                                <MenuItem value={StatusRefundEnum.EM_ANALISE}>{StatusNameRefundEnum.EM_ANALISE}</MenuItem>
                                <MenuItem value={StatusRefundEnum.AGUARDANDO_PAGAMENTO}>{StatusNameRefundEnum.AGUARDANDO_PAGAMENTO}</MenuItem>
                                <MenuItem value={StatusRefundEnum.INDEFERIDO}>{StatusNameRefundEnum.INDEFERIDO}</MenuItem>
                                </Select>
                            </Grid>
                            <Grid
                            item
                            lg={6}
                            sm={6}
                            xl={6}
                            xs={6}
                            />
                            
                            <Grid
                            item
                            lg={2}
                            sm={2}
                            xl={2}
                            xs={12}
                            >
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}            
                            >
                                Atualizar
                            </Button>
                            </Grid>
                            <Grid
                            item
                            lg={3}
                            sm={3}
                            xl={3}
                            xs={12}
                            />
                            </Grid>
                    </Box>  
        </Paper> 
    </Container>
</Box>
</>
    )
}

EditRefund.getLayout = (page) => (
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