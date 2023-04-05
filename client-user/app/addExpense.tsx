'use client';

import {
  TextField,
  Select,
  MenuItem,
  FormControl,
  Button,
  InputLabel,
  Box,
} from '@mui/material';
import { useState, useEffect } from 'react';
import { NextPage } from 'next';
import { axiosInstance } from '../axios/axiosInstance';

const defaultFormValues = {
  amount: '',
  catagoryId: '',
  comments: '',
};

const defaultCatagoryValues = {
  id: 0,
  type: '',
};

const AddExpense: NextPage = () => {
  const [catagories, setCatagories] = useState([defaultCatagoryValues]);
  const [formValues, setFormValues] = useState(defaultFormValues);

  useEffect(() => {
    axiosInstance
      .get('/catagories')
      .then((res) => setCatagories(res.data))
      .catch((err) => console.log(err));
  }, []);

  const handleInputChange = (e: any) => {
    e.preventDefault();
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: name === 'comments' ? value : parseInt(value, 10),
    });
  };

  const successHandler = () => {
    setFormValues(defaultFormValues);
  };

  const handleSubmit = () => {
    axiosInstance
      .post('http://localhost:5000/api/entries', formValues)
      .then(() => successHandler())
      .catch((err) => console.log(err));
  };

  return (
    <Box
      sx={{
        '& .MuiTextField-root': { m: 2, width: '25ch' },
        paddingTop: '30px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <FormControl required sx={{ m: 1, minWidth: 120 }}>
        <TextField
          id="amount-input"
          name="amount"
          label="Amount"
          type="number"
          value={formValues.amount}
          onChange={(e) => handleInputChange(e)}
          required
        />
      </FormControl>
      <FormControl required sx={{ m: 1, minWidth: 200 }}>
        <InputLabel id="catagoryidselect">Catagory</InputLabel>
        <Select
          labelId="catagoryidselect"
          label="Catagory"
          id="catagoryidselect"
          name="catagoryId"
          value={formValues.catagoryId}
          onChange={(e) => handleInputChange(e)}
          required
        >
          {catagories.map((el) => {
            return (
              <MenuItem key={el.id} value={el.id}>
                {el.type}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
      <FormControl sx={{ m: 1, minWidth: 120 }}>
        <TextField
          id="comments"
          name="comments"
          label="Comment"
          type="text"
          value={formValues.comments}
          onChange={(e) => handleInputChange(e)}
        />
      </FormControl>
      <Button
        variant="contained"
        color="primary"
        type="submit"
        onClick={handleSubmit}
      >
        Submit
      </Button>
    </Box>
  );
};

export default AddExpense;
