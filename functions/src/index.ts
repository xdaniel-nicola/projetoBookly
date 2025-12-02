/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

import {setGlobalOptions} from "firebase-functions";
// import {onRequest} from "firebase-functions/https";
// import * as logger from "firebase-functions/logger";
import * as admin from "firebase-admin";
import { onDocumentCreated } from "firebase-functions/v2/firestore";

admin.initializeApp();

// Enviar notificação
async function sendPushNotification(
  token: string,
  title: string,
  body: string,
  data: any = {}
) {
  await admin.messaging().send({
    token,
    notification: { title, body },
    data,
  });
}

// Trigger — Like criado
export const onLikeCreated = onDocumentCreated(
  "posts/{postId}/likes/{likeId}",
  async (event) => {
    const snap = event.data;
    const context = event.params;

    if (!snap) return;

    const like = snap.data();
    const postId = context.postId;

    const postRef = admin.firestore().collection("posts").doc(postId);
    const postDoc = await postRef.get();

    if (!postDoc.exists) return;

    const postOwnerId = postDoc.data()?.userId;

    const userRef = admin.firestore().collection("users").doc(postOwnerId);
    const userDoc = await userRef.get();

    const token = userDoc.data()?.fcmToken;
    if (!token) return;

    await sendPushNotification(
      token,
      "Nova curtida!",
      `${like.userName} curtiu sua postagem.`,
      { postId }
    );
  }
);

// Trigger — Comentário criado
export const onCommentCreated = onDocumentCreated(
  "posts/{postId}/comments/{commentId}",
  async (event) => {
    const snap = event.data;
    const context = event.params;

    if (!snap) return;

    const comment = snap.data();
    const postId = context.postId;

    const postRef = admin.firestore().collection("posts").doc(postId);
    const postDoc = await postRef.get();

    if (!postDoc.exists) return;

    const postOwnerId = postDoc.data()?.userId;

    const userRef = admin.firestore().collection("users").doc(postOwnerId);
    const userDoc = await userRef.get();

    const token = userDoc.data()?.fcmToken;
    if (!token) return;

    await sendPushNotification(
      token,
      "Novo comentário!",
      `${comment.userName} comentou na sua postagem.`,
      { postId }
    );
  }
);



// Start writing functions
// https://firebase.google.com/docs/functions/typescript

// For cost control, you can set the maximum number of containers that can be
// running at the same time. This helps mitigate the impact of unexpected
// traffic spikes by instead downgrading performance. This limit is a
// per-function limit. You can override the limit for each function using the
// `maxInstances` option in the function's options, e.g.
// `onRequest({ maxInstances: 5 }, (req, res) => { ... })`.
// NOTE: setGlobalOptions does not apply to functions using the v1 API. V1
// functions should each use functions.runWith({ maxInstances: 10 }) instead.
// In the v1 API, each function can only serve one request per container, so
// this will be the maximum concurrent request count.
setGlobalOptions({maxInstances: 10});

// export const helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
