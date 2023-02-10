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
import * as React from 'react';
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

export const ProjectsListToolbar = (props) => {
  const [open, setOpen] = React.useState(false);

  const [age, setAge] = React.useState('');

  const [personName, setPersonName] = React.useState([]);

  const handleChangeUser = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  const handleChange = (event) => {
    setAge(event.target.value);
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
        <Button
          variant="outlined"
        >
          Atribuir tarefa
        </Button>
        <Button
          startIcon={(<DownloadIcon fontSize="small" />)}
          sx={{ mr: 1 }}
        >
          Export
        </Button>

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
          value={age}
          label="Cliente"
          onChange={handleChange}
          MenuProps={MenuProps}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={10}>VALE</MenuItem>
          <MenuItem value={20}>CEMIG</MenuItem>
          <MenuItem value={30}>ANGLO GOLD</MenuItem>
          <MenuItem value={10}>HONDA</MenuItem>
          <MenuItem value={20}>COLGATE</MenuItem>
          <MenuItem value={30}>AMAZON</MenuItem>
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
              />
            </Grid>

            <Grid
              item
              md={6}
              xs={12}
            >
            <DesktopDatePicker
          label="Data do Contrato"
          inputFormat="MM/dd/yyyy"
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
          inputFormat="MM/dd/yyyy"
          renderInput={(params) => <TextField {...params} />}
           />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <FormControl sx={{ minWidth:240, maxWidth:240}}>
        <InputLabel id="demo-multiple-checkbox-label">Gestores do Projeto</InputLabel>
        <Select
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          multiple
          label="Gestor do Projeto"
          value={personName}
          onChange={handleChangeUser}
          input={<OutlinedInput label="Gestor do Projeto" />}
          renderValue={(selected) => selected.join(', ')}
          MenuProps={MenuProps}
        >
          {names.map((name) => (
            <MenuItem key={name}
       value={name}>
              <Checkbox checked={personName.indexOf(name) > -1} />
              <ListItemText primary={name} />
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
                  onClick={handleClose}>Cadastrar</Button>
        </DialogActions>
      </Dialog>

  </Box>


  )

}




