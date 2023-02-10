import Head from 'next/head';
import { Box, Container } from '@mui/material';
import { CustomerListResults } from '../../components/customer/customer-list-results';
import {ProjectsListResults} from '../../components/projects/projects-list-results'
import { ProjectsListToolbar } from '../../components/projects/projects-list-toolbar';
import { CustomerListToolbar } from '../../components/customer/customer-list-toolbar';
import { DashboardLayout } from '../../components/dashboard-layout';
import { projects } from '../../__mocks__/projects';
import { GetStaticPaths, GetStaticProps } from 'next';

const Page = () => (
<>
    <Head>
      <title>
        Vale | Task Planner
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
        <ProjectsListToolbar />
        <Box sx={{ mt: 3 }}>

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
