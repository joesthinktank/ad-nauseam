const functions = require("firebase-functions");
const os = require("os");
const fs = require("fs");
const path = require("path");
const cors = require("cors")({ origin: true });
const Busboy = require("busboy");

const gcconfig = {
  projectId: "ad-nauseam",
  keyFileName: "ad-nauseam-firebase-adminsdk-82e1t-490261e535.json",
};

const gcs = require("@google-cloud/storage");

var serviceAccount = require("./ad-nauseam-firebase-adminsdk-82e1t-490261e535.json");

// The Firebase Admin SDK to access the Firebase Realtime Database.
const admin = require("firebase-admin");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://ad-nauseam.firebaseio.com",
});

exports.uploadFile = functions.https.onRequest((req, res) => {
  cors(req, res, () => {
    const busboy = new Busboy({ headers: req.headers });
    let uploadData = null;

    busboy.on("file", (fieldname, file, filename, encoding, mimetype) => {
      const filepath = path.join(os.tmpdir(), filename);
      uploadData = { file: filepath, type: mimetype };
      file.pipe(fs.createWriteStream(filepath));
    });
    busboy.on("finish", () => {
      const bucket = gcs.bucket("ad-nauseam.appspot.com");
      // eslint-disable-next-line promise/catch-or-return
      bucket
        .upload(uploadData.file, {
          uploadType: "media",
          metadata: {
            metadata: {
              contentType: uploadData.type,
            },
          },
          // eslint-disable-next-line promise/always-return
        })
        // eslint-disable-next-line promise/always-return
        .then(() => {
          res.status(200).json({
            message: "It worked!",
          });
        })
        .catch(() => {
          res.status(500);
        });
    });
    busboy.end(req.rawBody);
  });
});

{
  /* <script src="https://www.gstatic.com/firebasejs/7.14.1/firebase-app.js"></script>

<script src="https://www.gstatic.com/firebasejs/7.14.1/firebase-analytics.js"></script>


  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyC1u33Eb8OCwiace_frjuIjxuliAYXDIsg",
    authDomain: "ad-nauseam.firebaseapp.com",
    databaseURL: "https://ad-nauseam.firebaseio.com",
    projectId: "ad-nauseam",
    storageBucket: "ad-nauseam.appspot.com",
    messagingSenderId: "764474225705",
    appId: "1:764474225705:web:089451380403446071d838",
    measurementId: "G-JN46M73B8Y"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics(); */
}
