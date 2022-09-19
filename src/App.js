import Layout from './components/Layout/Layout';
import { Route } from 'react-router-dom';
import { Switch } from 'react-router-dom';
import Medicines from './container/Medicines/Medicines';
import Patients from './container/Patients/Patients';
import Docter from './container/Docter/Docter';
import { Provider } from 'react-redux';
import { configureStore } from './redux/Store';
import Counter from './container/Counter/Counter';
import { PersistGate } from 'redux-persist/integration/react'
import Promise_Example from './Examples/Promise_Example';
import UseMemo_Example from './Examples/UseMemo_Example';
import UseCallback_Example from './Examples/UseCallback_Example';

function App() {
  const { store,persistor} = configureStore();

  return (
    <>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Layout>
            <Switch>
              <Route path={"/medicines"} exact component={Medicines} />
              <Route path={"/patients"} exact component={Patients} />
              <Route path={"/docter"} exact component={Docter} />
              <Route path={"/counter"} exact component={Counter} />
              <Route path={"/promise"} exact component={Promise_Example} />
              <Route path={"/useMemo"} exact component={UseMemo_Example} />
              <Route path={"/useCallback"} exact component={UseCallback_Example} />
            </Switch>
          </Layout>
        </PersistGate>
      </Provider>
    </>
  );
}

export default App;
