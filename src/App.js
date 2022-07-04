import Layout from './components/Layout/Layout';
import { Route } from 'react-router-dom';
import { Switch } from 'react-router-dom';
import Medicines from './container/Medicines/Medicines';
import Patients from './container/Patients/Patients';
import Docter from './container/Docter/Docter';

function App() {
  return (
    <>
     <Layout>
        <Switch>
          <Route path={"/medicines"} exact component={Medicines}/>
          <Route path={"/patients"} exact component={Patients}/>
          <Route path={"/docter"} exact component={Docter}/>
        </Switch>
     </Layout>
    </>
  );
}

export default App;
