import Head from 'next/head';
import { Box, Container } from '@mui/material';
import { CustomerListResults } from '../../components/customer/customer-list-results';
import {UserListActivePlanResults} from '../../components/ActivityPlan/activityplan-list-results'
import { ActivityTaskToolbar} from '../../components//ActivityPlan/activityplan-task-toolbar';
import { CustomerListToolbar } from '../../components/customer/customer-list-toolbar';
import { DashboardLayout } from '../../components/dashboard-layout';
import { projectsTasks } from '../../__mocks__/project-task';
import { GetStaticPaths, GetStaticProps } from 'next';


const Page = () => (

<>
    <Head>
      <title>
        Atividades Planejadas
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
        <ActivityTaskToolbar />
        <Box sx={{ mt: 3 }}>
        <UserListActivePlanResults  projects={projectsTasks} />
        </Box>
      </Container>
    </Box>
  </>
);

Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);




export default Page;
