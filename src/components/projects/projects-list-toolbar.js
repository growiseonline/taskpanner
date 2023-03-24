import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Grid,
  InputAdornment,
  SvgIcon, Typography
} from '@mui/material';
import { Search as SearchIcon } from '../../icons/search';
import { Upload as UploadIcon } from '../../icons/upload';
import { Download as DownloadIcon } from '../../icons/download';

import ListItemText from '@mui/material/ListItemText';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import OutlinedInput from '@mui/material/OutlinedInput';
import Checkbox from '@mui/material/Checkbox';
import {api} from '../../services/api';
import React, {useState,useEffect} from 'react';
import { useRouter } from 'next/router';
import {ProjectsListResults} from './projects-list-results'

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};


export const ProjectsListToolbar = (props) => {
  const router = useRouter();
  const [open, setOpen] = React.useState(false);
  const [projectName , setProjectName] = React.useState('')
  const [internalCode , setInternalCode] = React.useState('')
  const [client, setClient] = React.useState('');
  const [plannerManager, setPM]= React.useState('');
  const [plannerHour, setPlanerHour] = React.useState([]);
  const [departmentName, setDepartmentName] = React.useState([]);
  const [departmentList,setDepartments] = React.useState([]);
  const [clientList,setClients] = React.useState([]);
  const [pmList,setPMs] = React.useState([]);
  const [dateContract, setDateContract] = React.useState('');
  const [dateStart, setDateStart] = React.useState('');


  async function handleSubmit(){
    const data = {
      projectName : projectName,
      clientID : String(client),
      plannedManHour : plannerHour,
      dapartment : departmentName ,
      internalCode : internalCode,
      startDate : dateStart.getFullYear()+ "-" + padTo2Digits( dateStart.getMonth() +1) + "-" + dateStart.getDate(),
      contractEndDate : dateContract.getFullYear()+ "-" +padTo2Digits( dateContract.getMonth() +1) + "-" + dateContract.getDate(),
      PMTeamID : String(8)
     }
     console.log(data.contractEndDate)
     function padTo2Digits(num) {
      return num.toString().padStart(2, '0'); 
    }
     if(projectName!==''&&projectName!==''&&plannerHour!==''&&internalCode!==''){
      //Requisição
      console.log(data)
      const response = await api.post('/api/projects/v1',data);

      if(response.status===200){
        router
        .replace({
          pathname: '/projects',
          //  query: router.asPath !== '/' ? { continueUrl: router.asPath } : undefined
        })


        window.location.href='/projects'

      }else{
        alert('Erro ao cadastrar o usuário!');
      }
    }else{
      alert('Por favor, preencha todos os dados!');
    }
  }



  const handleChangeDepartment = (event) => {
    const {
      target: { value },
    } = event;
    setDepartmentName(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  console.log(departmentName)
  useEffect(() =>{
    async function loadDepartments(){
      const response = await api.get("/api/department/v1");
      setDepartments(response.data)
    }
    loadDepartments();
    async function loadClients(){
      const response = await api.get("/api/clients/v1");
      setClients(response.data)
    }
    loadClients();
    async function loadPM(){
      const response = await api.get("/api/projects/v1/managerplanner");
      setPMs(response.data)
    }
    loadPM();
  },[]);


  const handleChangeDateContract = (event) => {
    setDateContract(event);
  };
  const handleChangeDateStart = (event) => {
    setDateStart(event);
  };
  const handleChangeClient = (event) => {
    setClient(event.target.value);
  };

  const handleChangePM = (event) => {
    setPM(event.target.value);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  return(

    <Box {...props}>
    <Box
      sx={{
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        m: -1
      }}
    >
      <Typography
        sx={{ m: 1 }}
        variant="h4"
      >
      Projetos
      </Typography>
      <Box sx={{ m: 1 }}>



        <Button onClick={handleClickOpen}
          color="primary"
          variant="contained"
        >
          Adicionar Projeto
        </Button>
      </Box>
    </Box>
    <Box sx={{ mt: 3 }}>
      <Card>
        <CardContent>
          <Box sx={{ maxWidth: 500 }}>
            <TextField
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SvgIcon
                      color="action"
                      fontSize="small"
                    >
                      <SearchIcon />
                    </SvgIcon>
                  </InputAdornment>
                )
              }}
              placeholder="Search projects"
              variant="outlined"
            />
          </Box>
        </CardContent>
      </Card>
    </Box>
    <Dialog open={open}
onClose={handleClose}>
        <DialogTitle>Novo Projeto</DialogTitle>
        <DialogContent>
          <DialogContentText>
          </DialogContentText>
          <CardContent>
          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                helperText="Insira o nome do projeto"
                label="Nome do Projeto"
                name="nameProjetc"
                required
                variant="outlined"
                value={projectName}
                onChange={e => setProjectName(e.target.value)}
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
             <FormControl required
                         variant="outlined"
sx={{ minWidth:240, maxWidth:240}}>

        <InputLabel id="demo-simple-select-required-label">Cliente</InputLabel>
        <Select
          labelId="demo-simple-select-required-label"
          id="demo-simple-select-required"
          value={client}
          label="Cliente"
          onChange={handleChangeClient}
          MenuProps={MenuProps}
        >
          {clientList.map((name) => (
            <MenuItem value={name.id}>
             {name.name}
            </MenuItem>
          ))}


        </Select>
        <FormHelperText>Required</FormHelperText>
      </FormControl>
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Hora Planejada"
                name="menHour"
                required
                type="number"
                variant="outlined"
                value={plannerHour}
                onChange={e => setPlanerHour(e.target.value)}
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Código"
                name="codeInter"
                variant="outlined"
                value={internalCode}
                onChange={e => setInternalCode(e.target.value)}
              />
            </Grid>

            <Grid
              item
              md={6}
              xs={12}
            >
            <DesktopDatePicker
          label="Data do Contrato"
          inputFormat="dd/MM/yyyy"
          value={dateContract}
          onChange={handleChangeDateContract}
          renderInput={(params) => <TextField {...params} />}
           />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
            <DesktopDatePicker
          label="Data Início de Execução"
          inputFormat="dd/MM/yyyy"
          value={dateStart}
          onChange={handleChangeDateStart}
          renderInput={(params) => <TextField {...params} />}
           />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
 <FormControl required
                         variant="outlined"
sx={{ minWidth:240, maxWidth:240}}>

        <InputLabel id="demo-simple-select-required-label">Getor do Projeto</InputLabel>
        <Select
          labelId="demo-simple-select-required-label"
          id="demo-simple-select-required"
          value={plannerManager}
          label="Cliente"
          onChange={handleChangePM}
          MenuProps={MenuProps}
        >
          {pmList.map((name) => (
            <MenuItem value={name.id}>
             {name.fullName}
            </MenuItem>
          ))}


        </Select>
        <FormHelperText>Required</FormHelperText>

        </FormControl>

            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <FormControl sx={{ minWidth:240, maxWidth:240}}>
        <InputLabel id="demo-multiple-checkbox-label">Departamentos</InputLabel>
        <Select
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          multiple
          label="Gestor do Projeto"
          value={departmentName}
          onChange={handleChangeDepartment}
          input={<OutlinedInput label="Gestor do Projeto" />}
          renderValue={(selected) => selected.join(', ')}
          MenuProps={MenuProps}
        >
          {departmentList.map((name) => (
            <MenuItem key={name.name}
       value={name.name}>
              <Checkbox checked={departmentName.indexOf(name.name) > -1} />
              <ListItemText primary={name.name} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
            </Grid>
          </Grid>
        </CardContent>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined"
                  onClick={handleClose}>Cancelar</Button>
          <Button variant="contained"
                  onClick={handleSubmit}>Cadastrar</Button>
        </DialogActions>
      </Dialog>

  </Box>


  )

}




