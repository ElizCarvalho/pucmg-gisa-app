import { PropTypes } from 'prop-types';
import styled from '@emotion/styled';
import { AppBar, Avatar, Box, IconButton, Toolbar, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import RolesEnum from '../../enums/rolesEnum';

const DashboardNavbarRoot = styled(AppBar)(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[3]
}));

const getRoleName = (status) => {
    switch(status){
        case RolesEnum.ADMIN:
            return 'Admin'
        case RolesEnum.ASSOCIADO:
            return 'Associado'
        case RolesEnum.PRESTADOR:
            return 'Prestador'
    }   
}

export const DashboardNavbar = (props) => {
    const { onSidebarOpen, ...other } = props;

    const { user } = useContext(AuthContext);
    const userRole = getRoleName(user?.role);

    return (
        <>
            <DashboardNavbarRoot
                sx={{
                    left: {
                        lg: 280
                    },
                    width: {
                        lg: 'calc(100% - 280px)'
                    }
                }}
            {...other}>

            <Toolbar
                disableGutters
                sx={{
                    minHeight: 64, 
                    left: 0,
                    px: 2
                }}
            >
                <IconButton
                    onClick={onSidebarOpen}
                    sx={{
                        display: {
                            xs: 'inline-flex',
                            lg: 'none'
                        }
                    }}
                >
                    <MenuIcon fontSize="small" />
                </IconButton>
                <Box sx={{ flexGrow: 1 }} />
                <Box sx={{ px: 2 }}>
                        <Box
                            sx={{
                                alignItems: 'center',
                                backgroundColor: 'rgba(255, 255, 255, 0.04)',
                                cursor: 'pointer',
                                display: 'flex',
                                justifyContent: 'space-between',
                                px: 3,
                                py: '11px',
                                borderRadius: 1
                            }}
                        >
                            <div>
                                <Typography
                                    color="neutral.900"
                                    variant="subtitle1"
                                    >
                                    { user?.username }
                                    </Typography>
                                    <Typography
                                    color="neutral.900"
                                    variant="body2"
                                    >
                                    { userRole  }
                                    
                                </Typography>  
                            </div>
                        </Box>                
                    </Box>
                {/* <Avatar
                    sx={{
                        height: 40, 
                        width: 40,
                        ml: 1
                    }}
                    src=""
                >
                </Avatar> */}
            </Toolbar>
            </DashboardNavbarRoot>
        </>
    );
};

DashboardNavbar.propTypes = {
    onSidebarOpen: PropTypes.func
}
