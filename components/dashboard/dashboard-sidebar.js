import DashboardIcon from '@mui/icons-material/Dashboard';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import { Box, Divider, Drawer, Typography, useMediaQuery } from '@mui/material';
import { useRouter } from 'next/router';
import { useContext, useEffect } from 'react';
import NextLink from 'next/link';
import { PropTypes } from 'prop-types';
import { NavItem } from '../nav-item';
import { AuthContext } from '../../contexts/AuthContext';
import Image from 'next/image';

const items = [
    {
        href:  '/dashboard',
        icon: (<DashboardIcon fontSize="small" />),
        title: 'Meu Painel'
    },
    {
        href: '#',
        icon: (<AttachMoneyIcon fontSize="small"/>),
        title: 'Reembolso'
    },
    {
        href: '/refund/request',
        icon: (<></>),
        title: 'Solicitar Reembolso',
        subMenu: true
    },
    {
        href: '/refund/review',
        icon: (<></>),
        title: 'Analisar Reembolsos',
        subMenu: true
    },
    {
        href: '/refund/my-requests',
        icon: (<></>),
        title: 'Minhas Solicitações de Reembolsos',
        subMenu: true
    }
]

export const DashboardSidebar = (props) => {
    const { open, onClose } = props;
    const router = useRouter();
    const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'), {
        defaultMatches: true,
        noSsr: false 
    });

    useEffect(
        () => {
            if(!router.isReady) {
                return;
            }

            if(open){
                onClose?.();
            }
        },

        [router.asPath]
    );

    const { user } = useContext(AuthContext);
    

    const content = (
        <>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%'
                }}
            >
                <div>
                    <Box sx={{ width: 150, height: 150, p: 2, mx: 7}} >
                        <NextLink
                            href="/dashboard"
                            passHref
                        >
                            <a>
                               <Image src="/logo.svg" width={250} height={250} />
                            </a>
                        </NextLink>
                    </Box>
                </div>
                <Divider
                    sx={{
                        borderColor: '#2D3748',
                        my: 3
                    }}
                    />
                    <Box sx={{ flexGrow: 1 }}>
                    {items.map((item) => (
                        <NavItem
                        key={item.title}
                        icon={item.icon}
                        href={item.href}
                        title={item.title}
                        sx={item.subMenu ? { px: 3, py: 0 } : {px: 2}}/>
                    ))}
                    </Box>
                <Divider sx={{ borderColor: '#2D3748' }} />
            </Box>
        </>
    );

    if(lgUp){
        return (
            <Drawer
                anchor="left"
                open
                PaperProps={{
                    sx: {
                        backgroundColor: 'neutral.900',
                        color: '#FFFFFF',
                        width: 280
                    }
                }}
                variant="permanent"
            >
                {content}
            </Drawer>
        );
    }

    return (
        <Drawer
            anchor="left"
            onClose={onClose}
            open={open}
            PaperProps={{
                sx: {
                    backgroundColor: 'neutral.900',
                    color: '#FFFFFF',
                    width: 280
                }
            }}
            sx={{ zIndex: (theme) => theme.zIndex.appBar + 100 }}
            variant="temporary"
        >
            {content}
      </Drawer> 
    );
};

DashboardSidebar.propTypes = {
    onClose: PropTypes.func,
    open: PropTypes.bool
}