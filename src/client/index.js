import './styles/resets.scss'
import './styles/base.scss'
import './styles/footer.scss'
import './styles/form.scss'
import './styles/header.scss'
import './styles/result.scss'

// Register the service worker
if (process.env.NODE_ENV === 'production') {
  if ('serviceWorker' in navigator) {
    // Wait for the 'load' event to not block other work
    window.addEventListener('load', async () => {
      // Try to register the service worker.
      try {
        const reg = await navigator.serviceWorker.register('/service-worker.js');
        console.log('Service worker registered! 😎', reg);
      } catch (err) {
        console.log('😥 Service worker registration failed: ', err);
      }
    });
  }
}
export { handleSubmit } from './js/formHandler.js'