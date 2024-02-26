import React from 'react';
import './App.css';
import { helperAction } from './redux/reducer/helper.reducer';
import { useDispatch } from "react-redux";
import 'react-toastify/dist/ReactToastify.css';

import { ToastContainer } from 'react-toastify';

function App() {
  const dispatch = useDispatch();
  return (
    <div className="App">
      <header className="App-header">
        <p onClick={() => dispatch(helperAction.customToast("hello"))}>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
      </header>
      <ToastContainer />
    </div>
  );
}

export default App;
