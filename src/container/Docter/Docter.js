import React, {  useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import * as yup from 'yup';
import { Form, Formik, useFormik } from 'formik';
import { DataGrid } from '@mui/x-data-grid';

function Docter(props) {
    const [open, setOpen] = React.useState(false);
    const [data, setData] = useState([]);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleInsert = (values) => {
        console.log(values);
    
        let localData = JSON.parse(localStorage.getItem("docter"))
    
        let id = Math.floor(Math.random() * 1000);
        console.log(id);
    
        let data = {
          id: id,
          ...values
        }
    
        if (localData === null) {
          localStorage.setItem("docter", JSON.stringify([data]))
        } else {
          localData.push(data)
          localStorage.setItem("docter", JSON.stringify(localData))
        }
    
        handleClose()
        formikObj.resetForm()
        loadData()
    
    }

    let schema = yup.object().shape({
        firstname: yup.string().required("Please enter your firstname."),
        lastname: yup.string().required("Please enter your lastname."),
        email: yup.string().required("Please enter email id.").email("please enter valid email id."),
        contact: yup.string().required("Please enter your contact number."),
    });

    const formikObj = useFormik({
        initialValues: {
            firstname: '',
            lastname: '',
            email: '',
            contact: '',
        },
        validationSchema: schema,
        onSubmit: values => {
            handleInsert(values)
        },
    });

    const { handleChange, handleSubmit, errors, handleBlur, touched } = formikObj;

    const columns = [
        { field: 'firstname', headerName: 'First name', width: 130 },
        { field: 'lastname', headerName: 'Last name', width: 130 },
        { field: 'email', headerName: 'Email id', width: 130 },
        { field: 'contact', headerName: 'Contact', width: 130 },
    ];

    //data ne get karvvva
    const loadData = () => {
    
        let localData = JSON.parse(localStorage.getItem("docter"));
        
        if(localData !== null){
          setData(localData); // state ni ander set karvya
        }
    
    }
    
    useEffect (() => {
        loadData() //data ne get karvya
    },[])

    return (
        <div>
            <h2>docter</h2>
            <Button variant="outlined" onClick={handleClickOpen}>
                Add Docter
            </Button>
            <div style={{ height: 400, width: '100%' }}>
                <DataGrid
                    rows={data}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                    checkboxSelection
                />
            </div>
            <Dialog open={open} onClose={handleClose} fullWidth>
                <DialogTitle>Docter Data</DialogTitle>
                <Formik values={formikObj}>
                    <Form onSubmit={handleSubmit}>
                        <DialogContent>
                            <TextField
                                margin="dense"
                                name="firstname"
                                label="Docter firstname"
                                type="text"
                                fullWidth
                                variant="standard"
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            {errors.firstname && touched.firstname ? <p>{errors.firstname}</p> : ''}
                            <TextField
                                margin="dense"
                                name="lastname"
                                label="Docter lastname"
                                type="text"
                                fullWidth
                                variant="standard"
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            {errors.lastname && touched.lastname ? <p>{errors.lastname}</p> : ''}
                            <TextField
                                margin="dense"
                                name="email"
                                label="Docter email id"
                                type="text"
                                fullWidth
                                variant="standard"
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            {errors.email && touched.email ? <p>{errors.email}</p> : ''}
                            <TextField
                                margin="dense"
                                name="contact"
                                label="docter contact"
                                type="text"
                                fullWidth
                                variant="standard"
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            {errors.contact && touched.contact ? <p>{errors.contact}</p> : ''}
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

export default Docter;