import Head from 'next/head';
import { Box, Container } from '@mui/material';

import { UsersListResults } from '../components/users/users-list-results';
import { UsersListToolbar } from '../components/users/users-list-toolbar';

import { useNavigate, useParams } from "react-router-dom";

import { DashboardLayout } from '../components/dashboard-layout';
import { users } from '../__mocks__/users';

export default function UsersPage() {
  const { userId } = useParams();
  console.log(userId)
  return(
    <DashboardLayout>

    <Head>
      <title>
        Usuários | Task Planner
      </title>
    </Head>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8
      }}
    >
      <Container maxWidth={false}>
        <UsersListToolbar />
        <Box sx={{ mt: 3 }}>
          <UsersListResults users={users} />
        </Box>
      </Container>
    </Box>

  </DashboardLayout>
  )
}








