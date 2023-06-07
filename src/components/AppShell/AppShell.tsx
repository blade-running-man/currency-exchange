import { ReactNode } from 'react';
import { HashRouter } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { ExchangeHistoryProvider } from '@/context/ExchangeHistoryContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { teal } from '@mui/material/colors';

export interface AppShellProps {
  children: ReactNode;
}

const queryClient = new QueryClient();

const theme = createTheme({
  palette: {
    primary: {
      main: teal[500],
    },
    success: {
      main: '#94C720',
    },
    error: {
      main: '#C70D38',
    },
    background: {
      default: '#f2f2f2',
    },
    text: {
      primary: '#404040',
    },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          color: '#404040',
          backgroundColor: '#ffffff',
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        head: {
          color: '#8D8D8D',
          fontSize: '1.1rem',
        },
        body: {
          fontSize: '16px',
        },
      },
    },
  },
});

function AppShell({ children }: AppShellProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <HashRouter>
        <ExchangeHistoryProvider>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            {children}
          </ThemeProvider>
        </ExchangeHistoryProvider>
      </HashRouter>
    </QueryClientProvider>
  );
}

export default AppShell;
