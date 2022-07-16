import React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import * as yup from 'yup';
import {  Form, Formik, useFormik } from 'formik';
import { jsx } from '@emotion/react';

function Medicines(props) {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    
    const handleInsert = (values) => {
      console.log(values);
  
      let localData = JSON.parse(localStorage.getItem("medicine"))

      if (localData === null) {
        localStorage.setItem("medicine", JSON.stringify([values]))
      } else {
        localData.push(values)
        localStorage.setItem("medicine", JSON.stringify(localData))
      }
  
      handleClose()
      formikObj.resetForm()
  
    }

    let schema = yup.object().shape({
      name: yup.string().required("please enter name"),
      price: yup.number().required("please enter price").positive().integer(),
      quantity: yup.string().required("please enter quantity"),
      expiry: yup.string().required("please enter expiry"),
    });
  
    const formikObj = useFormik({
      initialValues: {
        name: '',
        price: '',
        quantity: '',
        expiry: ''
      },
      validationSchema: schema,
      onSubmit: values => {
        handleInsert(values)
      },
    });
  
    const { handleChange, errors, handleSubmit, handleBlur, touched } = formikObj;
  // console.log(errors);


    return (
        <div>
            <h2>Medicines</h2>
          <Button variant="outlined" onClick={handleClickOpen}>
            Add Medicine
          </Button>
          <Dialog open={open} onClose={handleClose} fullWidth>
            <DialogTitle>Add medicine</DialogTitle>
            <Formik values={formikObj}>
              <Form onSubmit={handleSubmit}>
                <DialogContent>
                  <TextField
                    margin="dense"
                    name="name"
                    label="Medicine name"
                    type="text"
                    fullWidth
                    variant="standard"
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.name && touched.name ? <p>{errors.name}</p> : ''}
                  <TextField
                    margin="dense"
                    name="price"
                    label="Medicine price"
                    type="text"
                    fullWidth
                    variant="standard"
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                    {errors.price && touched.price ? <p>{errors.price}</p> : ''}
                  <TextField
                    margin="dense"
                    name="quantity"
                    label="Medicine quantity"
                    type="text"
                    fullWidth
                    variant="standard"
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                    {errors.quantity && touched.quantity ? <p>{errors.quantity}</p> : ''}
                  <TextField
                    margin="dense"
                    name="expiry"
                    label="Medicine expiry"
                    type="text"
                    fullWidth
                    variant="standard"
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                    {errors.expiry && touched.expiry ? <p>{errors.expiry}</p> : ''}
                  <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button type="submit">Submit</Button>
                  </DialogActions>
                </DialogContent>
              </Form>
            </Formik>
          </Dialog>
        </div>  
    );
}

export default Medicines;