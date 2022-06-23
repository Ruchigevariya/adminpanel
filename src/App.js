import Layout from './components/Layout/Layout';
import { Route } from 'react-router-dom';
import { Switch } from 'react-router-dom';
import Medicines from './container/Medicines/Medicines';
import Patients from './container/Patients/Patients';

function App() {
  return (
    <>
     <Layout>
        <Switch>
          <Route path={"/medicines"} exact component={Medicines}/>
          <Route path={"/patients"} exact component={Patients}/>
        </Switch>
     </Layout>
    </>
  );
}

export default App;
