import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import CalendarProvider from './CalendarContext';
import { Auth0Provider } from "@auth0/auth0-react"

const root = ReactDOM.createRoot(document.getElementById('root'));
const domain = process.env.REACT_APP_AUTH0_DOMAIN
const clientId = process.env.REACT_APP_AUTH0_CLIENTID

const redirectURI = ''
if (process.env.NODE_ENV === 'development') {
  redirectURI = "https:/yourschedule.onrender.com"
} else if (process.env.NODE_ENV === 'production') {
  redirectURI = "http:/localhost:3000/calendar"
}

root.render(
  <>
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      redirectUri={window.location.origin}
    > {console.log(redirectURI)}
      <CalendarProvider>
        <App />
      </CalendarProvider>
    </Auth0Provider>
  </>
);
