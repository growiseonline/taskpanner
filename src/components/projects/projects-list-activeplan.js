import { useState } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import PropTypes from 'prop-types';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import * as React from 'react';
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
  const names = [
    'Augusto Morais',
    'Julio Abrahão',
    'Ramon Oliveira',
    'Lucas Oliveira',
    'Guilherme Rodrigues',
    'Carlos Eduardo',
    'Bárbara Barbosa',
    'Lucas Fiorine',
  ];

export const ProjectsListActivePlanResults = ({ projects, ...rest }) => {
  const [selectedCustomerIds, setSelectedCustomerIds] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);
  const [open, setOpen] = React.useState(false);

  const [age, setAge] = React.useState('');
  const [scope, setScope] = React.useState('');

  const [personName, setPersonName] = React.useState([]);
  const handleChangeScope = (event) => {
    setScope(event.target.value);
  };
  const handleChange = (event) => {
    setAge(event.target.value);
  };

  const handleSelectAll = (event) => {
    let newSelectedCustomerIds;

    if (event.target.checked) {
      newSelectedCustomerIds = projects.map((project) => project.id);
    } else {
      newSelectedCustomerIds = [];
    }

    setSelectedCustomerIds(newSelectedCustomerIds);
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedCustomerIds.indexOf(id);
    let newSelectedCustomerIds = [];

    if (selectedIndex === -1) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(selectedCustomerIds, id);
    } else if (selectedIndex === 0) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(selectedCustomerIds.slice(1));
    } else if (selectedIndex === selectedCustomerIds.length - 1) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(selectedCustomerIds.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(
        selectedCustomerIds.slice(0, selectedIndex),
        selectedCustomerIds.slice(selectedIndex + 1)
      );
    }

    setSelectedCustomerIds(newSelectedCustomerIds);
  };

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };
  const handleClickOpen = () => {
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
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={selectedCustomerIds.length === projects.length}
                    color="primary"
                    indeterminate={
                      selectedCustomerIds.length > 0
                      && selectedCustomerIds.length < projects.length
                    }
                    onChange={handleSelectAll}
                  />
                </TableCell>
                <TableCell>
                  Tarefa
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
              {projects.slice(0, limit).map((projetc) => {
                return (
                  <TableRow
                    hover
                    key={projetc.id}
                    selected={selectedCustomerIds.indexOf(projetc.id) !== -1}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={selectedCustomerIds.indexOf(projetc.id) !== -1}
                        onChange={(event) => handleSelectOne(event, projetc.id)}
                        value="true" />
                    </TableCell>
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
                          {projetc.taskName}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Typography
                        color="textPrimary"
                        variant="body1"
                      >
                        {projetc.executor}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography
                        color="textPrimary"
                        variant="body1"
                      >
                        {projetc.horaPalanejada}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography
                        color="textPrimary"
                        variant="body1"
                      >
                        {projetc.horaExecutada}
                      </Typography>
                    </TableCell>
                    <TableCell>
                    <SeverityPill
                    color={(projetc.status === 'Concluída' && 'success')
                    || (projetc.status === 'Bloqueada' && 'error')
                    || (projetc.status === 'Não Iniciada' && 'info')
                    || 'warning'}
                  >
                    {projetc.status}
                  </SeverityPill>
                    </TableCell>
                    <TableCell>
                      <Typography
                        color="textPrimary"
                        variant="body1"
                      >
                        {projetc.daataAgendada}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography
                        color="textPrimary"
                        variant="body1"
                      >
                        {projetc.notesFromPalanner}
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
                    <EditIcon onClick={handleClickOpen}/>
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

                required
                type="number"

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
          value={scope}
          label="Scope"
          onChange={handleChangeScope}
          MenuProps={MenuProps}
        >

          <MenuItem value={10}><SeverityPill color={'success'}>Concluída</SeverityPill></MenuItem>
          <MenuItem value={20}><SeverityPill color={'error'}>Bloqueada</SeverityPill></MenuItem>
          <MenuItem value={30}><SeverityPill color={'warning'}>Em progresso</SeverityPill></MenuItem>
          <MenuItem value={30}><SeverityPill color={'info'}>Não Iniciada</SeverityPill></MenuItem>


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
          inputFormat="MM/dd/yyyy"
          renderInput={(params) => <TextField {...params} />}
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
              />
            </Grid>


          </Grid>
        </CardContent>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined"
                  onClick={handleClose}>Cancelar</Button>
          <Button variant="contained"
                  onClick={handleClose}>Cadastrar</Button>
        </DialogActions>
      </Dialog>
      </PerfectScrollbar>
      <TablePagination
        component="div"
        count={projects.length}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />


    </Card>


  );
};

ProjectsListActivePlanResults.propTypes = {
  projects: PropTypes.array.isRequired
};
