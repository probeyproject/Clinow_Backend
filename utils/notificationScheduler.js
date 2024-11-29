
// every minute
// import cron from 'node-cron';
// import { addNotificationsForNearAppointments } from '../services/notificationServices.js';

// export function scheduleJobs() {
//   cron.schedule('* * * * *', async () => {
//     console.log("i start")
//     try {
//       await addNotificationsForNearAppointments();
//       console.log("hello");
//       console.log('Notifications processed for near appointments.');
//     } catch (err) {
//       console.error('Error while processing notifications:', err);
//     }
//   });
// }

//every hour

import cron from 'node-cron';
import { addNotificationsForNearAppointments } from '../services/notificationServices.js';

export function scheduleJobs() {
  cron.schedule('0 * * * *', async () => {
    try {
      await addNotificationsForNearAppointments();
      console.log('Notifications processed for near appointments.');
    } catch (err) {
      console.error('Error while processing notifications:', err);
    }
  });
}
