import {Card, Grid, CardMedia } from "@mui/material";
import Image from "next/image";


export default function DashboardMenu() {

    return (
    <>
        <Grid   
            item
            lg={3}
            sm={6}
            xl={3}
            xs={6}
        >
            <Card sx={{minWidth: 100}}>
            <CardMedia
              component="img"
              height="150"
              image="/painel-menu-1.svg"
              alt="Telemedicina"
            >

            </CardMedia>
            </Card>
        </Grid>

        <Grid 
            item
            lg={3}
            sm={6}
            xl={3}
            xs={6}
        >
        <Card sx={{ minWidth: 100 }}>
        <CardMedia
              component="img"
              height="150"
              image="/painel-menu-2.svg"
              alt="Agendamento"
            >

            </CardMedia>
            </Card>
        </Grid>

        <Grid 
            item
            lg={3}
            sm={6}
            xl={3}
            xs={6}
        >
        <Card sx={{ minWidth: 100 }}>
        <CardMedia
              component="img"
              height="150"
              image="/painel-menu-3.svg"
              alt="Rede Credenciada"
            >

            </CardMedia>
            </Card>
        </Grid>
        <Grid 
            item
            lg={3}
            sm={6}
            xl={3}
            xs={6}
        >
        <Card sx={{ minWidth: 100 }}>
        <CardMedia
              component="img"
              height="150"
              image="/painel-menu-4.svg"
              alt="Informe de Rendimentos"
            >
            </CardMedia>
            </Card>
        </Grid>

    </>
    
    )
}