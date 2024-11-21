import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { svSE } from '@mui/x-date-pickers/locales';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import 'dayjs/locale/sv';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <LocalizationProvider  localeText={svSE.components.MuiLocalizationProvider.defaultProps.localeText } dateAdapter={AdapterDayjs} adapterLocale='sv'>
        <App />
    </LocalizationProvider>
  </React.StrictMode>
);