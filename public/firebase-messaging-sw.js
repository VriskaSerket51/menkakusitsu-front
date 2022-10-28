try {
    importScripts("https://www.gstatic.com/firebasejs/8.7.1/firebase-app.js");
    importScripts(
        "https://www.gstatic.com/firebasejs/8.7.1/firebase-messaging.js"
    );

    firebase.initializeApp({
        apiKey: "AIzaSyAzQ_bR2dD4V1vdWoPViPXll6imyCajNCo",
        authDomain: "menkakusitsu-2d69d.firebaseapp.com",
        projectId: "menkakusitsu-2d69d",
        storageBucket: "menkakusitsu-2d69d.appspot.com",
        messagingSenderId: "382894730110",
        appId: "1:382894730110:web:ebf27b97399bec80c2612f",
        measurementId: "G-TE638S9GQ9",
    });

    const messaging = firebase.messaging();
} catch (error) {
    console.log(`Error: ${error}`);
}
