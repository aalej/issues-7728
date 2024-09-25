/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const { onRequest } = require("firebase-functions/v2/https");
const { defineSecret } = require('firebase-functions/params');

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started
const apiKey = defineSecret('API_KEY')
const apiKey2 = defineSecret('API_KEY_2')

exports.helloSecret = onRequest({ secrets: [apiKey, apiKey2] }, async (req, res) => {
    res.send(`Hello from hello firebase function! ${apiKey.value()}`);
});
