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
import { useRouter } from 'next/router'
import { Search as SearchIcon } from '../../icons/search';
import { Upload as UploadIcon } from '../../icons/upload';
import { Download as DownloadIcon } from '../../icons/download';
import React, {useState,useEffect} from 'react';
import {api} from '../../services/api';
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
import { TextareaAutosize } from '@mui/base';


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



export const ProjectsTaskToolbar = (props) => {
  const router = useRouter()
  const  projectid  = router.query.id
  const [open, setOpen] = React.useState(false);
  const [scope, setScope] = React.useState('');
  const [scopeList, setScopeList] = React.useState([]);
  const [executor, setExecutor] = React.useState([]);
  const [executorList, setExecutorList] = React.useState([]);
  const [dateTask, setDateTask] = React.useState('');
  const [plannedHour, setPlanerHour] = React.useState('');
  const [observationPlanner, setObservationPlanner]= React.useState('');

 console.log(executorList)

  useEffect(() =>{
    async function loadScopeList(){
      const response = await api.get("/api/ActiviesScopeList/v1?projectId=" + projectid);
      setScopeList(response.data)
    }
    loadScopeList();
    async function loadExecutorList(){
      const response = await api.get("/api/ActivityPlan/v1/ExecutorPlannerList?projectId=" + projectid);
      setExecutorList(response.data)
    }
    loadExecutorList();

  },[]);

  async function handleSubmit(){
    const data = {
      activitiesScopeListID :  scope,
      scheduledDate : dateTask,
      plannedManHour :plannedHour,
      plannerTeamID :45,
      executorTeamID : executor,
      notesFromPlanner : observationPlanner,
      projectID : projectid

     }
     console.log(data)


      const response = await api.post('/api/ActivityPlan/v1',data);

      if(response.status===200){
        window.location.href='/projects/'+projectid

      }else{
        alert('Erro ao cadastrar o usuário!');
      }

  }


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
      Atividades Planejadas
      </Typography>
      <Box sx={{ m: 1 }}>



        <Button onClick={handleClickOpen}
          color="primary"
          variant="outlined"
        >
          Atribuir nova Tarefa
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
              placeholder="Search tasks"
              variant="outlined"
            />
          </Box>
        </CardContent>
      </Card>
    </Box>
    <Dialog open={open}
onClose={handleClose}
>

        <DialogTitle>Nova Tarefa</DialogTitle>
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
                 <FormControl required
                         variant="outlined"
sx={{ minWidth:240, maxWidth:240}}>

        <InputLabel id="demo-simple-select-required-label">Tarefa</InputLabel>
        <Select
          labelId="demo-simple-select-required-label"
          id="demo-simple-select-required"
          value={scope}
          label="Scope"

          onChange={e => setScope(e.target.value)}
          MenuProps={MenuProps}
        >
            {scopeList.map((name) => (
            <MenuItem value={name.id}>
             {name.description}
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
             <FormControl required
                         variant="outlined"
sx={{ minWidth:240, maxWidth:240}}>

        <InputLabel id="demo-simple-select-required-label">Executor</InputLabel>
        <Select
          labelId="demo-simple-select-required-label"
          id="demo-simple-select-required"
          value={executor}
          label="Executor"
          onChange={e => setExecutor(e.target.value)}
          MenuProps={MenuProps}
        >
            {executorList.map((name) => (
            <MenuItem value={name.pmTeamID}>
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
                value={plannedHour}
                type="number"
                onChange={e => setPlanerHour(e.target.value)}
                variant="outlined"
              />
            </Grid>

            <Grid
              item
              md={6}
              xs={12}
            >
            <DesktopDatePicker
          label="Data Agendada"
          inputFormat="dd/MM/yyyy"
          renderInput={(params) => <TextField {...params} />}
          value={dateTask}
          onChange={e => setDateTask(e)}
           />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >

            </Grid>
            <Grid
              item
              md={12}
              xs={12}

            >
              <TextField

                fullWidth
                label="Observação"
                name="codeInter"
                variant="outlined"
                value={observationPlanner}
                onChange={e => setObservationPlanner(e.target.value)}
              />
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




