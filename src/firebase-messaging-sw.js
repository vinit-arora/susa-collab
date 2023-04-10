importScripts('https://www.gstatic.com/firebasejs/9.18.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.18.0/firebase-messaging-compat.js');

const firebaseConfig = {
  apiKey: "AIzaSyDQ7Ff8GwSegz3XdnTYKJEDkbTN3M2VSUw",
  authDomain: "facebook-clone-c2cff.firebaseapp.com",
  projectId: "facebook-clone-c2cff",
  storageBucket: "facebook-clone-c2cff.appspot.com",
  messagingSenderId: "669529628191",
  appId: "1:669529628191:web:f68d5091d53e5543387f2a",
  measurementId: "G-1350SHN1EG"
};



const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log('Received background message: ', payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = { body: payload.notification.body };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
firebase.initializeApp(firebaseConfig);
const db = getFirestore(app);

export { firebaseConfig, db };