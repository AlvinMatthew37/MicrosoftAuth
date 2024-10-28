import { useState } from 'react'
import McAuth from './components/McAuth';
import { AuthenticatedTemplate, UnauthenticatedTemplate, useMsal } from '@azure/msal-react';
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

const ProfileContent = () => {
  const { instance, accounts } = useMsal();
  const [graphData, setGraphData] = useState(null);

  function RequestProfileData() {
      // Silently acquires an access token which is then attached to a request for MS Graph data
      instance
          .acquireTokenSilent({
              ...loginRequest,
              account: accounts[0],
          })
          .then((response) => {
              callMsGraph(response.accessToken).then((response) => setGraphData(response));
          });
  }

  return (
      <>
          <h5 className="card-title">Welcome {accounts[0].name}</h5>
      </>
  );
};

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <AuthenticatedTemplate>
          <ProfileContent />
          <McAuth/>
      </AuthenticatedTemplate>
      <UnauthenticatedTemplate>
      <McAuth/>
      </UnauthenticatedTemplate>
    </>
  )
}

export default App
