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
import { DataGrid } from '@mui/x-data-grid';

function Medicines(props) {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
      formikObj.resetForm()
    };

    const handleInsert = (values) => {
      console.log(values);
      let localData =JSON.parse(localStorage.getItem("medicine"))

      if(localData === null){
        localStorage.setItem("medicine",JSON.stringify([values]))
      }else{
        localData.push(values)
        localStorage.setItem("medicine",JSON.stringify(localData))
      }
      handleClose()
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
        handleInsert(values);
      },
    });

    const { handleChange, errors, handleSubmit, handleBlur, touched } = formikObj;
    // console.log(errors);

    // ------
    const columns = [
      { field: 'name', headerName: 'NAME', width: 70 },
      { field: 'price', headerName: 'price', width: 130 },
      { field: 'quantity', headerName: 'quantity', width: 130 },
      { field: 'expiry', headerName: 'expiry', width: 130 },
      {
        field: 'name',
        headerName: 'name',
        type: 'text',
        width: 90,
      },
      {
        field: 'price',
        headerName: 'price',
        description: 'This column has a value getter and is not sortable.',
        sortable: false,
        width: 160,
        valueGetter: (params) =>
          `${params.row.price || ''} ${params.row.quantity || ''}`,
      },
    ];

    const rows = [
      { name: "ABCD", price: '50', quantity: '1', expiry: 2023 },
      { name: "MEFTA", price: '50', quantity: '1', expiry: 2023 },
      { name: "EFGH", price: '50', quantity: '1', expiry: 2023 },
      { name: "PQRS", price: '50', quantity: '1', expiry: 2023 },
      { name: "XYZ", price: '50', quantity: '1', expiry: 2023 },
    ];
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
          <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
      />
    </div>
        </div>  
    );
}

export default Medicines;