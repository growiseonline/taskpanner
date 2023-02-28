import React, {useState,useEffect} from 'react';
import { useRouter } from 'next/router'
import PerfectScrollbar from 'react-perfect-scrollbar';
import PropTypes from 'prop-types';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import {api} from '../../services/api';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { format } from 'date-fns';
import EditIcon from '@mui/icons-material/Edit';
import AddTaskIcon from '@mui/icons-material/AddTask';
import { SeverityPill } from '../severity-pill';
import ManageHistoryIcon from '@mui/icons-material/ManageHistory';
import { useAuthContext } from '../../contexts/auth-context';
import {
  Avatar,
  Box,
  Card,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
 Grid,
  CardContent,

} from '@mui/material';
import Link from '@mui/material/Link';
import { getInitials } from '../../utils/get-initials';
import { id } from 'date-fns/locale';
import { string } from 'yup';

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

  const statusResult = {
    'Nao Iniciada' : '5',
    'Bloqueada' : '3',
    'Em Progresso' : '2',
    'Concluída' : '1',


  }

export const UserListActivePlanResults = ({ projects, ...rest }) => {
  const user = JSON.parse(localStorage.getItem('user-data'))

  const [selectedCustomerIds, setSelectedCustomerIds] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [open, setOpen] = React.useState(false);
  const [taskList, setTasks] = React.useState([]);
  const [newExecutedHour, setExecute] = React.useState();
  const [newStatus, setStatus] = React.useState();
  const [newDateExecute , setDateExecute] = React.useState();
  const [newNoteExecutor,setNoteExecutor] = React.useState();
  const [actvID, setActvID] = React.useState();
  const [totalRecords, setRecords] = React.useState();


  async function loadTasks(){
    const response = await api.get(`/api/ActivityPlan/v1/TasksByUser?userId=${user.id}&page=${page}&size=${limit}&searchExecutor=`);
    setTasks(response.data.activitList)
    setRecords(response.data.totalRecords)
  }
  useEffect(() =>{
  loadTasks();
},[]);

async function loadTasksRefresh(){
  loadTasks()
}

  const handleChangeScope = (event) => {
    setStatus(event.target.value);
  };
  const handleChange = (event) => {
    setAge(event.target.value);
  };

  async function handleUpdate (){
  const newTask = {

    id : actvID,
    status : String(newStatus),
    executedManHour : newExecutedHour,
    notesFromExecutor : newNoteExecutor,
    scheduledDate : newDateExecute
  }

  const response = await api.put("/api/ActivityPlan/v1/UpdateTaskExecutor", newTask);
  if(response.status===200){
    loadTasksRefresh()
    handleClose()
  }else{
    alert('Erro ao atualizar task!');
  }


 }

  const handleSelectAll = (event) => {
    let newSelectedCustomerIds;

    if (event.target.checked) {
      newSelectedCustomerIds = projects.map((project) => project.id);
    } else {
      newSelectedCustomerIds = [];
    }

    setSelectedCustomerIds(newSelectedCustomerIds);
  };



  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };
  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };
  async function  handleClickOpen(activityid) {
    console.log(id)
    const response =  await api.get("/api/ActivityPlan/v1/ActivityPlanByID?activityId=" + activityid);
    setExecute(response.data.executedManHour)
    setStatus(response.data.status)
    setDateExecute(response.data.scheduledDate)
    setNoteExecutor(response.data.notesFromExecutor)
    setActvID(activityid)
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Card {...rest}>
      <PerfectScrollbar>
        <Box sx={{ minWidth: 1050 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  Tarefa
                </TableCell>
                <TableCell>
                  Projeto
                </TableCell>
                <TableCell>
                  Executor
                </TableCell>
                <TableCell>
                  Hora Homem Planejada
                </TableCell>
                <TableCell>
                 Hora Homem Executada
                </TableCell>
                <TableCell>
                  Status
                </TableCell>
                <TableCell>
                  Data Agendada
                </TableCell>
                <TableCell>
                  Observação do Planejador
                </TableCell>
                <TableCell>
                  Observação do Executor
                </TableCell>
                <TableCell>

                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {taskList.slice(0, limit).map((projetc) => {

                return (
                  <TableRow
                    hover
                    key={projetc.id}
                    selected={selectedCustomerIds.indexOf(projetc.id) !== -1}
                  >

                    <TableCell>
                      <Box
                        sx={{
                          alignItems: 'center',
                          display: 'flex'
                        }}
                      >

                        <Typography
                          color="textPrimary"
                          variant="body1"
                        >
                          {projetc.description}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Typography
                        color="textPrimary"
                        variant="body1"
                      >
                        {projetc.projectName}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography
                        color="textPrimary"
                        variant="body1"
                      >
                        {projetc.executorName}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography
                        color="textPrimary"
                        variant="body1"
                      >
                        {projetc.plannedManHour}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography
                        color="textPrimary"
                        variant="body1"
                      >
                        {projetc.executedManHour}
                      </Typography>
                    </TableCell>
                    <TableCell>
                    <SeverityPill
                    color={(projetc.statusName === 'Concluída' && 'success')
                    || (projetc.statusName === 'Bloqueada' && 'error')
                    || (projetc.statusName === 'Não Iniciada' && 'info')
                    || 'warning'}
                  >
                    {(projetc.statusName)}
                  </SeverityPill>
                    </TableCell>
                    <TableCell>
                      <Typography
                        color="textPrimary"
                        variant="body1"
                      >
                          {format(Date.parse(projetc.startDate), 'dd/MM/yyyy')}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography
                        color="textPrimary"
                        variant="body1"
                      >
                        {projetc.notesFromPlanner}
                      </Typography>
                    </TableCell>
                    <TableCell>
                    <Typography
                        color="textPrimary"
                        variant="body1"
                      >
                        {projetc.notesFromExecutor}
                      </Typography>
                    </TableCell>
                    <TableCell>
                    <ManageHistoryIcon onClick={() =>handleClickOpen(projetc.id)}/>
                    </TableCell>

                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Box>
        <Dialog open={open}
onClose={handleClose}>
        <DialogTitle>Atualizar Tarefa</DialogTitle>
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
                label="Hora Executada"
                name="menHour"
                value={newExecutedHour}
                required
                type="number"
                onChange={e => setExecute(e.target.value)}
                variant="outlined"
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

        <InputLabel id="demo-simple-select-required-label">Status</InputLabel>
        <Select
          labelId="demo-simple-select-required-label"
          id="demo-simple-select-required"
          value={newStatus}
          label="Scope"
          onChange={handleChangeScope}
          MenuProps={MenuProps}
        >

          <MenuItem value={1}><SeverityPill color={'success'}>Concluída</SeverityPill></MenuItem>
          <MenuItem value={3}><SeverityPill color={'error'}>Bloqueada</SeverityPill></MenuItem>
          <MenuItem value={2}><SeverityPill color={'warning'}>Em progresso</SeverityPill></MenuItem>
          <MenuItem value={5}><SeverityPill color={'info'}>Não Iniciada</SeverityPill></MenuItem>


        </Select>
        <FormHelperText>Required</FormHelperText>
      </FormControl>
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
            <DesktopDatePicker
          label="Data de Execução"
          inputFormat="dd/MM/yyyy"
          renderInput={(params) => <TextField {...params} />}
          value={newDateExecute}
          onChange={e => setDateExecute(e)}
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
                value={newNoteExecutor}
                onChange={e => setNoteExecutor(e.target.value)}
              />
            </Grid>


          </Grid>
        </CardContent>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined"
                  onClick={handleClose}>Cancelar</Button>
          <Button variant="contained"
                  onClick={handleUpdate}>Atualizar</Button>
        </DialogActions>
      </Dialog>
      </PerfectScrollbar>
      <TablePagination
        component="div"
        count={totalRecords}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />


    </Card>


  );
};

UserListActivePlanResults.propTypes = {
  projects: PropTypes.array.isRequired
};
