import * as functions from "firebase-functions";
import {words} from "./words";

export const getWord = functions.https.onRequest((request, response) => {
    response.send({
        date: new Date(),
        word: words[0],
    });
});
