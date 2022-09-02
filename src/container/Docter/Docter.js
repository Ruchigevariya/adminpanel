import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import * as yup from 'yup';
import { Form, Formik, useFormik } from 'formik';
import { DataGrid } from '@mui/x-data-grid';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useDispatch, useSelector } from 'react-redux';
import { addDocterData, deleteDocterData, getDocterdata, updateDocterData } from '../../redux/Action/Docter.action';

function Doctors(props) {
    const [open, setOpen] = useState(false);
    const [data, setData] = useState([])
    const [doopen, setDopen] = useState(false);
    const [didid, setDidid] = useState(0);
    const [update, setUpdate] = useState(false)
    const [filterData, setFilterData] = useState([])
    const c = useSelector(state => state.counter)

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setDopen(false);
        setUpdate(false);
        formikObj.resetForm()
    };

    //alerts
    const handleDoClickDopen = () => {
        setDopen(true);
    };

    const handleInsert = (values) => {
        console.log(values);

        // let localData = JSON.parse(localStorage.getItem("doctor"))

        // let id = Math.floor(Math.random() * 10000);
        // console.log(id);

        // let data = {
        //     id: id,
        //     ...values
        // }

        dispatch(addDocterData(values))
        // if (localData === null) {
        //     localStorage.setItem("doctor", JSON.stringify([data]))
        // } else {
        //     localData.push(data)
        //     localStorage.setItem("doctor", JSON.stringify(localData))
        // }

        handleClose()
        formikObj.resetForm()
        loadData()
    }

    const handleUpdateData = (values) => {
        // let localData = JSON.parse(localStorage.getItem("doctor"))

        // let uData = localData.map((l) => {
        //     if (l.id === values.id) {
        //         return values;
        //     } else {
        //         return l;
        //     }
        // })

        // // console.log(values);

        // localStorage.setItem("doctor", JSON.stringify(uData))

        dispatch(updateDocterData(values))

        handleClose()
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
            if (update) {
                handleUpdateData(values)
            } else {
                handleInsert(values);
            }
        },
    });

    const { handleChange, handleSubmit, errors, handleBlur, touched, values } = formikObj;

    const handleDelete = () => {
        // let localData = JSON.parse(localStorage.getItem("doctor"))

        // let fData = localData.filter((l) => l.id !== didid)

        // // console.log(fdata,params.id);

        // localStorage.setItem("doctor", JSON.stringify(fData))

        dispatch(deleteDocterData(didid))

        loadData()
        handleClose()
    }

    const handleEdit = (params) => {
        handleClickOpen()

        formikObj.setValues(params.row)

        // console.log(params.row);
        setUpdate(true)
    }

    const columns = [
        { field: 'firstname', headerName: 'First name', width: 130 },
        { field: 'lastname', headerName: 'Last name', width: 130 },
        { field: 'email', headerName: 'Email id', width: 130 },
        { field: 'contact', headerName: 'Contact', width: 130 },
        {
            field: 'action',
            headerName: 'Action',
            width: 180,
            renderCell: (params) => (
                <>
                    <IconButton aria-label="edit" onClick={() => handleEdit(params)}>
                        <EditIcon />
                    </IconButton>
                    <IconButton aria-label="delete" onClick={() => { handleDoClickDopen(); setDidid(params.id) }}>
                        <DeleteIcon />
                    </IconButton>
                </>

            )
        },
    ];

    //data ne get karvvva
    const loadData = () => {
        let localData = JSON.parse(localStorage.getItem("doctor"));

        if (localData !== null) {
            setData(localData);
        }

    }

    const dispatch = useDispatch()
    const Docter = useSelector(state => state.Docter)

    useEffect(() => {
        // loadData()
        dispatch(getDocterdata())
    }, [])

    const handlesearch = (val) => {
        console.log(val);

        let localData = JSON.parse(localStorage.getItem("doctor"))

        let fData = localData.filter((d) => (
            d.firstname.toLowerCase().includes(val.toLowerCase()) ||
            d.lastname.toLowerCase().includes(val.toLowerCase()) ||
            d.email.toLowerCase().includes(val.toLowerCase()) ||
            d.contact.toString().includes(val)
        ))

        setFilterData(fData)

        console.log(fData);
    }

    const finalData = filterData.length > 0 ? filterData : data

    return (
        <div>
            {
                Docter.isLoading ?
                    <p>Loading...</p>
                    :
                    Docter.error !== '' ?
                        <p>{Docter.error}</p>
                        :
                        <div>
                            <h2>Doctor{c.counter}</h2>
                            <Button variant="outlined" onClick={handleClickOpen}>
                                Add Details
                            </Button>
                            <TextField
                                margin="dense"
                                name="search"
                                label="Doctor search"
                                type="text"
                                fullWidth
                                variant="standard"
                                onChange={(d) => handlesearch(d.target.value)}
                            />
                            <div style={{ height: 400, width: '100%' }}>
                                <DataGrid
                                    rows={Docter.Docter}
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
                                    {"Are you sure want to delete?"}
                                </DialogTitle>
                                <DialogContent>
                                </DialogContent>
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
                                        <DialogTitle>Update Doctors Data</DialogTitle>
                                        :
                                        <DialogTitle>Doctors Details</DialogTitle>
                                }
                                <Formik values={formikObj}>
                                    <Form onSubmit={handleSubmit}>
                                        <DialogContent>
                                            <TextField
                                                value={values.firstname}
                                                margin="dense"
                                                name="firstname"
                                                label="Doctor first Name"
                                                type="text"
                                                fullWidth
                                                variant="standard"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                            />
                                            {errors.firstname && touched.firstname ? <p>{errors.firstname}</p> : ''}
                                            <TextField
                                                value={values.lastname}
                                                margin="dense"
                                                name="lastname"
                                                label="Doctor last Name"
                                                type="text"
                                                fullWidth
                                                variant="standard"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                            />
                                            {errors.lastname && touched.lastname ? <p>{errors.lastname}</p> : ''}
                                            <TextField
                                                value={values.email}
                                                margin="dense"
                                                name="email"
                                                label="Doctor email id"
                                                type="text"
                                                fullWidth
                                                variant="standard"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                            />
                                            {errors.email && touched.email ? <p>{errors.email}</p> : ''}
                                            <TextField
                                                value={values.specicontact}
                                                margin="dense"
                                                name="contact"
                                                label="Doctor contact"
                                                type="text"
                                                fullWidth
                                                variant="standard"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                            />
                                            {errors.contact && touched.contact ? <p>{errors.contact}</p> : ''}
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
            }
        </div>  

    );
}

export default Doctors;