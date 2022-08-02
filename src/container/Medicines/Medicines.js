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
import { useDispatch, useSelector } from 'react-redux';
import { addMedicines, deleteMedicines, getMedicines, updateMedicines } from '../../redux/Action/Medicines.action';

function Medicines(props) {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState([]);
  const [doopen, setDoOpen] = useState(false);
  const [didid, setDidId] = useState(0);
  const [update, setUpdate] = useState(false);
  const [filterData, setFilterData] = useState([])
  const c = useSelector(state => state.counter);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setDoOpen(false);
    setUpdate(false);
    formikObj.resetForm()
  };

  //Alerts
  const handledoClickOpen = () => {
    setDoOpen(true);
  };

  const handleInsert = (values) => {
    console.log(values);

    // let localData = JSON.parse(localStorage.getItem("medicine"))

    let id = Math.floor(Math.random() * 10000);
    console.log(id);

    let data = {
      id: id,
      ...values
    }

    dispatch(addMedicines(data))

    // if (localData === null) {
    //   localStorage.setItem("medicine", JSON.stringify([data]))
    // } else {
    //   localData.push(data)
    //   localStorage.setItem("medicine", JSON.stringify(localData))
    // }

    handleClose()
    loadData()
  }

  const handleUpdateData = (values) => {
    // let localData = JSON.parse(localStorage.getItem("medicine"))

    // let udata = localData.map((l) => {
    //   if (l.id === values.id) {
    //     return values;
    //   } else {
    //     return l;
    //   }
    // })

    // localStorage.setItem("medicine", JSON.stringify(udata))

    // console.log(values);

    dispatch(updateMedicines(values))

    handleClose();

    loadData();

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
      if (update) {
        handleUpdateData(values);
      } else {
        handleInsert(values);
      }
    },
    enableReinitialize: true,
  });

  const { handleChange, errors, handleSubmit, handleBlur, touched, values } = formikObj;
  // console.log(errors);

  const handleDelete = () => {
    // let localData = JSON.parse(localStorage.getItem("medicine"));

    // let fdata = localData.filter((l) => l.id !== didid)

    // // console.log(fdata,params.id);

    // localStorage.setItem("medicine", JSON.stringify(fdata))

    dispatch(deleteMedicines(didid))

    loadData();

    handleClose();
  }

  const handleEdit = (params) => {
    handleClickOpen();

    formikObj.setValues(params.row)

    setUpdate(true);

  }

  const columns = [
    { field: 'name', headerName: 'Name', width: 130 },
    { field: 'price', headerName: 'Price', width: 130 },
    { field: 'quantity', headerName: 'Quantity', width: 130 },
    { field: 'expiry', headerName: 'Expiry', width: 130 },
    {
      field: 'action',
      headerName: 'Action',
      width: 130,
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
    let localData = JSON.parse(localStorage.getItem("medicine"));

    if (localData !== null) {
      setData(localData);
    }

  }

  const dispatch = useDispatch()
  const Medicines = useSelector(state => state.Medicines)

  useEffect(() => {
    // loadData()
    dispatch(getMedicines())
  }, [])

  const handlesearch = (val) => {
    console.log(val);

    let localData = JSON.parse(localStorage.getItem("medicine"))

    let fData = localData.filter((m) => (
      m.name.toLowerCase().includes(val.toLowerCase()) ||
      m.price.toString().includes(val) ||
      m.quantity.toString().includes(val) ||
      m.expiry.toString().includes(val)
    ))

    setFilterData(fData)

    console.log(fData);
  }

  const finalData = filterData.length > 0 ? filterData : data

  return (
    <div>
    {
      Medicines.isLoading ?
      <p>Loading....</p> 
      :
      Medicines.error !== '' ?
      <p>{Medicines.error}</p>
      :
      <div>
        <h2>Medicines {c.counter}</h2>
        <Button variant="outlined" onClick={handleClickOpen}>
          Add Medicine
        </Button>
        {/* data-table */}
        <TextField
          margin="dense"
          name="search"
          label="Medicine search"
          type="text"
          fullWidth
          variant="standard"
          onChange={(m) => handlesearch(m.target.value)}
        />
        <div style={{ height: 400, width: '100%' }}>
          <DataGrid
            rows={Medicines.Medicines}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            checkboxSelection
          />
        </div>
        {/* //alert popup */}
        <Dialog
          open={doopen}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Are you sure want to delete?"}
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
              <DialogTitle>Update medicine</DialogTitle>
              :
              <DialogTitle>Add medicine</DialogTitle>
          }
          <Formik values={formikObj}>
            <Form onSubmit={handleSubmit}>
              <DialogContent>
                <TextField
                  value={values.name}
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
                  value={values.price}
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
                  value={values.quantity}
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
                  value={values.expiry}
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
                  {
                    update ?
                      <Button type="submit">Update</Button>
                      :
                      <Button type="submit">Submit</Button>
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

export default Medicines;