import DashboardIcon from '@mui/icons-material/Dashboard';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import LogoutIcon from '@mui/icons-material/Logout';
import { Box, Drawer, useMediaQuery } from '@mui/material';
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
        title: 'Meu Painel',
        rolePermission: [
            1,
            2,
            3
        ]
        
    },
    {
        href: '#',
        icon: (<AttachMoneyIcon fontSize="small"/>),
        title: 'Reembolso',
        rolePermission: [
            1,
            2,
            3
        ]
    },
    {
        href: '/refund/request',
        icon: (<></>),
        title: 'Solicitar Reembolso',
        subMenu: true,
        rolePermission: [2]
    },
    {
        href: '/refund/review',
        icon: (<></>),
        title: 'Analisar Reembolsos',
        subMenu: true,
        rolePermission: [3]
    },
    {
        href: '/refund/my-requests',
        icon: (<></>),
        title: 'Minhas Solicitações de Reembolsos',
        subMenu: true,
        rolePermission: [2]
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
                    <Box sx={{ width: 350, height: 150, p: 0, mx: 2}} >
                        <NextLink
                            href="/dashboard"
                            passHref
                        >
                            <a>
                               <Image src="/logo3.svg" width={200} height={100} />
                            </a>
                        </NextLink>
                    </Box>
                </div>
                    <Box sx={{ flexGrow: 1 }}>
                    {items.map((item) => (
                    (item.rolePermission.includes(user?.role)) &&
                        <NavItem
                        key={item.title}
                        icon={item.icon}
                        href={item.href}
                        title={item.title}
                        sx={item.subMenu ? { px: 3, py: 0 } : {px: 2}}/>
                    ))}
                    </Box>

                    <Box sx={{ flexGrow: 1}}>
                        <NavItem 
                            key="Sair da Conta"
                            icon={<LogoutIcon fontSize="small" />}
                            href="/account/logout"
                            title="Sair da Conta"
                            sx={{ px: 2}}
                        />
                    </Box>
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