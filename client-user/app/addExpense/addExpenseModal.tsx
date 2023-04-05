'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useState, useEffect } from 'react';
import { NextPage } from 'next';
import { axiosInstance } from '../../axios/axiosInstance';

import {
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  // border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  // outline: 0,
  '& .MuiTextField-root': { m: 2, width: '25ch' },
  // paddingTop: '60px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
};

const defaultFormValues = {
  amount: '',
  catagoryId: '',
  comments: '',
};

const defaultCatagoryValues = {
  id: 0,
  type: '',
};



const AddExpenseModal = () => {
  const [catagories, setCatagories] = useState([defaultCatagoryValues]);
  const [formValues, setFormValues] = useState(defaultFormValues);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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
    handleClose();
  };

  const handleSubmit = () => {
    axiosInstance
      .post('http://localhost:5000/api/entries', formValues)
      .then(() => successHandler())
      .catch((err) => console.log(err));
  };

  return (
    <div>
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
        <Button variant="contained" onClick={handleOpen}>
          Add Expense
        </Button>
      </Box>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
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
      </Modal>
    </div>
  );
};

export default AddExpenseModal;
