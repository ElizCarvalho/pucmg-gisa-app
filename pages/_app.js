import { ThemeProvider } from '@mui/material';
import { AuthProvider } from '../contexts/AuthContext'
import '../styles/globals.css'
import { theme } from '../theme';

function MyApp({ Component, pageProps }) {

  const getLayout = Component.getLayout ?? ((page) => page);
  
  return (
      <AuthProvider>
        <ThemeProvider theme={ theme }>
            {getLayout(<Component {...pageProps} />)}
        </ThemeProvider>
      </AuthProvider>
    )
}

export default MyApp
