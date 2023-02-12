import {
  v4 as uuid
} from 'uuid';

export const projectsTasks = [

  {
    id: uuid(),
    taskName: 'Inplantação PME',
    executor: "Augusto Morais",
    status: "Concluída",
    notesFromPalanner: "Implantar PME 2022",
    notesFromExecutor: "Foi implantado o PME 2022 com arquitetra distribuida",
    horaPalanejada: 4,
    horaExecutada: 3,
    daataAgendada: "2023-01-04"

  },
  {
    id: uuid(),
    taskName: 'Calibrar Medidor',
    executor: "Lucas Fiorini",
    status: "Concluída",
    notesFromPalanner: "Calibrar Medidor PM7650",
    notesFromExecutor: "",
    horaPalanejada: 2,
    horaExecutada: 5,
    daataAgendada: "2023-01-05"

  },
  {
    id: uuid(),
    taskName: 'Criação de Dashboards',
    executor: "Julio Abrahao",
    status: "Em progresso",
    notesFromPalanner: "Criar dashboards",
    notesFromExecutor: "",
    horaPalanejada: 4,
    horaExecutada: 3,
    daataAgendada: "2022-01-04"

  },
  {
    id: uuid(),
    taskName: 'Inplantação PME',
    executor: "Augusto Morais",
    status: "Bloqueada",
    notesFromPalanner: "Implantar PME 2022",
    notesFromExecutor: "Foi implantado o PME 2022 com arquitetra distribuida",
    horaPalanejada: 4,
    horaExecutada: 3,
    daataAgendada: "2022-01-04"

  },
  {
    id: uuid(),
    taskName: 'Inplantação PME',
    executor: "Augusto Morais",
    status: "Não Iniciada",
    notesFromPalanner: "Implantar PME 2022",
    notesFromExecutor: "Foi implantado o PME 2022 com arquitetra distribuida",
    horaPalanejada: 4,
    horaExecutada: 0,
    daataAgendada: "2022-01-04"

  },

]
