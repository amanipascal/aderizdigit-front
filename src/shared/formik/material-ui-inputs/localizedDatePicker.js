import * as React from 'react';
import frLocale from 'date-fns/locale/fr';
import enLocale from 'date-fns/locale/en-US';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/material/AdapterDateFns';
import DatePicker from '@mui/material/DatePicker';
import LocalizationProvider from '@mui/material/LocalizationProvider';
import {useField} from 'formik'


const localeMap = {
  en: enLocale,
  fr: frLocale
};

const maskMap = {
  fr: '__/__/____',
  en: '__/__/____'
};

const LocalizedDatePicker = (props) => {
  const [locale, setLocale] = React.useState('fr');

  const [field, meta] = useField(props);

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} locale={localeMap[locale]}>
      <div style={{ width: 300 }}>
        <DatePicker
          mask={maskMap[locale]}
          {...field}
          {...props}
          renderInput={
              (params) => <TextField {...params}  margin="normal" variant="standard" />
            }
        />
      </div>
    </LocalizationProvider>
  );
}

export default LocalizedDatePicker

// const [selectedDate, handleDateChange] = React.useState(new Date());

// value={selectedDate}
// onChange={(date) => handleDateChange(date)}