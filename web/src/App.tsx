
import { Provider } from 'react-redux';
import { store } from "./Redux/store";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from './components/Header'
import Dashboard from './components/Dashboard';
import Segments from './components/Segments';
import Overview from './components/Overview';
import CreateSegment from './components/CreateSegment';


const App =()=>{
  return(

    <Provider store={store}>
     <BrowserRouter>
            <Routes>
              <Route path="/" element={<Header />}>
                <Route index element={<Dashboard />}></Route>
                <Route path='/overview' element={<Overview />} ></Route>
               <Route path="/segments/:id" element={<Segments />} />
               <Route path='/createSegment' element={<CreateSegment />} ></Route>
              </Route>
       </Routes>
       </BrowserRouter>
    </Provider>
  )
};
export default App;

