'use client';

import { ReactNode } from 'react';
import { CssBaseline } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme();

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
      <html lang="en">
      <body>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
      </body>
      </html>
  );
}
