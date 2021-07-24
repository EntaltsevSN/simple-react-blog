import { GET_SECTIONS } from "./types";

export const getSections = sections => ({ type: GET_SECTIONS, payload: sections })