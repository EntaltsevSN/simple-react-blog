import { ADD_DOCUMENT, GET_DOCUMENTS } from "./types";

export const getDocuments = documents => ({ type: GET_DOCUMENTS, payload: documents })
export const addDocument = document => ({ type: ADD_DOCUMENT, payload: document })