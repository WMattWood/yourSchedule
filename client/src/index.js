import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import CalendarProvider from './CalendarContext';
import { Auth0Provider } from "@auth0/auth0-react"

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  
  // <React.StrictMode>
  <>
    console.log("Index.js", `${process.env.REACT_APP_URL_BASE}/calendar`)
    <Auth0Provider
      domain="dev-45e85v0tlk073h45.us.auth0.com"
      clientId="a7T9ZSkGnQdwzDJ0LpQgFRpeg9j06I3B"
      redirectUri={`${process.env.REACT_APP_URL_BASE}/calendar`}
    >
      <CalendarProvider>
        <App />
      </CalendarProvider>
    </Auth0Provider>
  </>
  // </React.StrictMode>
);
