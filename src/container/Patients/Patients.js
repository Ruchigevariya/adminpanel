import React, { useEffect, useState } from 'react';
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
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

function Patients(props) {
    const [open, setOpen] = React.useState(false);
    const [data, setData] = useState([])

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleInsert = (values) => {
        console.log(values);
        let localData = JSON.parse(localStorage.getItem("patient"))

        let id = Math.floor(Math.random() * 1000);
        console.log(id);

        let data = {
            id: id,
            ...values
        }

        if (localData === null) {
            localStorage.setItem("patient", JSON.stringify([data]))
        } else {
            localData.push(data)
            localStorage.setItem("patient", JSON.stringify(localData))
        }

        handleClose();
        formikObj.resetForm();
        loadData()

    }

    let schema = yup.object().shape({
        name: yup.string().required("please enter name"),
        age: yup.number().required("please enter age").positive().integer(),
        birthDate: yup.string().required("please enter birthDate"),
        contact: yup.string().required("please enter contact"),
        city: yup.string().required("please enter city"),
    });

    const formikObj = useFormik({
        initialValues: {
            name: '',
            age: '',
            birthDate: '',
            contact: '',
            city: '',
        },
        validationSchema: schema,
        onSubmit: values => {
            handleInsert(values)
        },
    });

    const { handleChange, errors, handleSubmit, touched, handleBlur } = formikObj;

    const handleDelete = (params) => {
        let localData=JSON.parse(localStorage.getItem("patient"))
        console.log(params.id);
        let fdata = localData.filter((l) => l.id !== params.id)
        console.log(fdata);

        localStorage.setItem("patient",JSON.stringify(fdata))

        loadData();
    }

    const columns = [
        { field: 'name', headerName: 'name', width: 130 },
        { field: 'age', headerName: 'age', width: 130 },
        { field: 'birthDate', headerName: 'birthDate', width: 170 },
        { field: 'contact', headerName: 'contact', width: 170 },
        { field: 'city', headerName: 'city', width: 130 },
        {
            field: 'Action',
            headerName: 'action',
            width: 170,
            renderCell: (params) => (
                <IconButton aria-label="delete" onClick={() => handleDelete(params)}>
                    <DeleteIcon />
                </IconButton>
            )
        },
    ];

    const loadData = () => {

        let localData = JSON.parse(localStorage.getItem("patient"))

        if (localData !== null) {
            setData(localData);
        }

    }

    useEffect(() => {
        loadData()
    }, [])

    return (
        <div>
            <h2>patients</h2>
            <Button variant="outlined" onClick={handleClickOpen}>
                Add patients
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
                <DialogTitle>Patients Data</DialogTitle>
                <Formik values={formikObj}>
                    <Form onSubmit={handleSubmit}>
                        <DialogContent>
                            <TextField
                                margin="dense"
                                name="name"
                                label="patients name"
                                type="text"
                                fullWidth
                                variant="standard"
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            {errors.name && touched.name ? <p>{errors.name}</p> : ''}
                            <TextField
                                margin="dense"
                                name="age"
                                label="patients age"
                                type="text"
                                fullWidth
                                variant="standard"
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            {errors.age && touched.age ? <p>{errors.age}</p> : ''}
                            <TextField
                                margin="dense"
                                name="birthDate"
                                label="patients birthDate"
                                type="text"
                                fullWidth
                                variant="standard"
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            {errors.birthDate && touched.birthDate ? <p>{errors.birthDate}</p> : ''}
                            <TextField
                                margin="dense"
                                name="contact"
                                label="patients contact"
                                type="text"
                                fullWidth
                                variant="standard"
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            {errors.contact && touched.contact ? <p>{errors.contact}</p> : ''}
                            <TextField
                                margin="dense"
                                name="city"
                                label="patients city"
                                type="text"
                                fullWidth
                                variant="standard"
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            {errors.city && touched.city ? <p>{errors.city}</p> : ''}
                            <DialogActions>
                                <Button onClick={handleClose}>Cancel</Button>
                                <Button type='submit'>Submit</Button>
                            </DialogActions>
                        </DialogContent>
                    </Form>
                </Formik>
            </Dialog>
        </div>
    );
}

export default Patients;