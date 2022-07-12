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
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';

function Patients(props) {
    const [open, setOpen] = React.useState(false);
    const [data, setData] = useState([])
    const [doopen, setDoOpen] = React.useState(false);
    const [didid, setDidId] = useState(0);
    const [update, setUpdate] = useState(false);
    const [filterData, setFilterData] = useState([]);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setDoOpen(false);
        setUpdate(false);
        formikObj.resetForm();
    };

    //Alerts
    const handledoClickOpen = () => {
        setDoOpen(true);
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

    const handleUpdateData = (values) => {
        // console.log(values);

        let localData = JSON.parse(localStorage.getItem("patient"));

        let uData = localData.map((l) => {
            if (l.id === values.id) {
                return values;
            } else {
                return l;
            }
        })

        localStorage.setItem("patient", JSON.stringify(uData))

        loadData();

        handleClose();

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
            if (update) {
                handleUpdateData(values);
            } else {
                handleInsert(values)
            }
        },
    });

    const { handleChange, errors, handleSubmit, touched, handleBlur, values } = formikObj;

    const handleDelete = () => {
        let localData = JSON.parse(localStorage.getItem("patient"))
        // console.log(params.id);
        let fdata = localData.filter((l) => l.id !== didid)
        // console.log(fdata);

        localStorage.setItem("patient", JSON.stringify(fdata))

        loadData();

        handleClose();

    }

    const handleEdit = (params) => {
        handleClickOpen();

        formikObj.setValues(params.row)

        setUpdate(true);
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
                <>
                    <IconButton aria-label="edit" onClick={() => handleEdit(params)}>
                        <ModeEditOutlineIcon />
                    </IconButton>
                    <IconButton aria-label="delete" onClick={() => { handledoClickOpen(); setDidId(params.id) }}>
                        <DeleteIcon />
                    </IconButton>
                </>
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

    const handlesearch = (val) => {
        console.log(val);

        let localData = JSON.parse(localStorage.getItem("patient"))

        let fData = localData.filter((p) => (
            p.name.toLowerCase().includes(val.toLowerCase()) ||
            p.age.toString().includes(val) ||
            p.birthDate.toString().includes(val) ||
            p.contact.toString().includes(val) || 
            p.city.toLowerCase().includes(val)
        ))

        setFilterData(fData)

        console.log(fData);

    }

    const finalData = filterData.length > 0 ? filterData : data

    return (
        <div>
            <h2>patients</h2>
            <Button variant="outlined" onClick={handleClickOpen}>
                Add patients
            </Button>
            <TextField
                margin="dense"
                name="search"
                label="patients search"
                type="text"
                fullWidth
                variant="standard"
                onChange={(p) => handlesearch(p.target.value)}
            />
            <div style={{ height: 400, width: '100%' }}>
                <DataGrid
                    rows={finalData}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                    checkboxSelection
                />
            </div>
            <Dialog
                open={doopen}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Are you sure want to delete this data.?"}
                </DialogTitle>
                <DialogActions>
                    <Button onClick={handleClose}>No</Button>
                    <Button onClick={handleDelete} autoFocus>
                        Yes
                    </Button>
                </DialogActions>
            </Dialog>
            <Dialog open={open} onClose={handleClose} fullWidth>
                {
                    update ?
                        <DialogTitle>Update Patients Data</DialogTitle>
                        :
                        <DialogTitle>Add Patients Details</DialogTitle>
                }
                <Formik values={formikObj}>
                    <Form onSubmit={handleSubmit}>
                        <DialogContent>
                            <TextField
                                value={values.name}
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
                                value={values.age}
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
                                value={values.birthDate}
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
                                value={values.contact}
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
                                value={values.city}
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
                                {
                                    update ?
                                        <Button type='submit'>Update</Button>
                                        :
                                        <Button type='submit'>Submit</Button>
                                }
                            </DialogActions>
                        </DialogContent>
                    </Form>
                </Formik>
            </Dialog>
        </div>
    );
}

export default Patients;