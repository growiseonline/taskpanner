import React, { useState, useEffect } from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import PropTypes from "prop-types";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { format } from "date-fns";
import EditIcon from "@mui/icons-material/Edit";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import { api } from "../../services/api";
import AddTaskIcon from "@mui/icons-material/AddTask";
import Pagination from "@mui/material/Pagination";
import MenuItem from "@mui/material/MenuItem";
import { SeverityPill } from "../severity-pill";

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
  LinearProgress,
} from "@mui/material";
import Link from "@mui/material/Link";
import { getInitials } from "../../utils/get-initials";
import { id } from "date-fns/locale";

const statusResult = {
  "Nao Iniciada": "5",
  "Bloqueada": "3",
  "Em Progresso": "2",
  "Concluída": "1",
};

export const ProjectsListResults = ({ projects, ...rest }) => {
  const [selectedCustomerIds, setSelectedCustomerIds] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [totalRecords, setRecords] = React.useState();

  const user = JSON.parse(localStorage.getItem("user-data"));
  console.log(user.permissionId);
  const [projectList, setProjects] = useState([]);

  const loadProjects = async () => {
    const response = await api.get(`/api/projects/v1?page=${page}&size=${limit}`);
    setProjects(response.data.projectList);
    setRecords(response.data.totalRecors);
    console.log(response);
  };
  useEffect(() => {
    loadProjects();
  }, [page]);

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  async function ChangePage() {
    const response = await api.get(`/api/projects/v1?page=${page}&size=${limit}`);
    setProjects(response.data);
  }
  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };
  return (
    <Card {...rest}>
      <PerfectScrollbar>
        <Box sx={{ minWidth: 1050 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Nome do Projeto</TableCell>
                <TableCell>Cliente</TableCell>
                <TableCell>Hora Prevista</TableCell>
                <TableCell>Hora Homem Planejada</TableCell>
                <TableCell>Hora Homem Executada</TableCell>
                <TableCell>Progresso</TableCell>
                <TableCell>Gestor do Projeto</TableCell>
                <TableCell>Inicio de Execução</TableCell>
                <TableCell>Data de Vigência</TableCell>
                <TableCell>Data de Enceramento</TableCell>
                <TableCell>Status</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {projectList.slice(0, limit).map((projetc) => {
                return (
                  <TableRow
                    hover
                    key={projetc.projectID}
                    selected={selectedCustomerIds.indexOf(projetc.projectID) !== -1}
                  >
                    <TableCell>
                      <Box
                        sx={{
                          alignItems: "center",
                          display: "flex",
                        }}
                      >
                        <Typography color="textPrimary" variant="body1">
                          {projetc.projectName}
                        </Typography>
                      </Box>
                    </TableCell>

                    <TableCell>
                      <Typography color="textPrimary" variant="body1">
                        {projetc.clientName}
                      </Typography>
                    </TableCell>

                    <TableCell>
                      <Typography color="textPrimary" variant="body1">
                        {projetc.expectedManHor}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography color="textPrimary" variant="body1">
                        {projetc.plannedManHour}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography color="textPrimary" variant="body1">
                        {projetc.executedManHour}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Box sx={{ width: "100%", mr: 1 }}>
                          {projetc.executedManHour < projetc.plannedManHour && (
                            <LinearProgress
                              variant="determinate"
                              value={(projetc.executedManHour * 100) / projetc.plannedManHour}
                            ></LinearProgress>
                          )}
                          {projetc.executedManHour == projetc.plannedManHour && (
                            <LinearProgress
                              variant="determinate"
                              value={(projetc.executedManHour * 100) / projetc.plannedManHour}
                              color="success"
                            ></LinearProgress>
                          )}
                          {projetc.executedManHour > projetc.plannedManHour && (
                            <LinearProgress
                              variant="determinate"
                              value={100}
                              color="error"
                            ></LinearProgress>
                          )}
                        </Box>

                        {
                          <Box sx={{ minWidth: 35 }}>
                            <Typography variant="body2" color="text.secondary">
                              {projetc.executedManHour == 0
                                ? "0%"
                                : `${Math.round(
                                    (projetc.executedManHour * 100) / projetc.plannedManHour
                                  )}%`}
                            </Typography>
                          </Box>
                        }
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Typography color="textPrimary" variant="body1">
                        {projetc.full_name}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography color="textPrimary" variant="body1">
                        {format(Date.parse(projetc.startDate), "dd/MM/yyyy")}
                      </Typography>
                    </TableCell>

                    <TableCell>
                      <Typography color="textPrimary" variant="body1">
                        {format(Date.parse(projetc.contractEndDate), "dd/MM/yyyy")}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography color="textPrimary" variant="body1">
                        {format(Date.parse(projetc.endDate), "dd/MM/yyyy")}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography color={(projetc.status === '1' && 'green')
                    || (projetc.status === '3' && 'red')
                    || (projetc.status === '5' && 'blue')
                    || (projetc.status === '4' && 'orange')
                    || (projetc.status === '2' && 'orange')
                    || 'warning'} variant="body1">
                        {
                        (projetc.status === "5" && "Não Iniciada") ||
                        (projetc.status === "3" && "Bloqueada") ||
                        (projetc.status === "2" && "Em Progresso") ||
                        (projetc.status === "1" && "Concluido") ||
                        (projetc.status === "4" && "Cancelado")


                        }

                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Link href={`/projects/${projetc.projectID}`}>
                        <AddTaskIcon />
                      </Link>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Box>
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

ProjectsListResults.propTypes = {
  projectList: PropTypes.array.isRequired,
};
