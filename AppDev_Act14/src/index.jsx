/* @refresh reload */
import { render } from 'solid-js/web'
import './index.css'
import App from './App.jsx'

const root = document.getElementById('root')

render(() => <App />, root)

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/service-worker.js")
      .then(() => console.log("Service Worker registered"))
      .catch((err) => console.log("SW failed:", err));
  });
}
