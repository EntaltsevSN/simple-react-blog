import { ADD_SUBSECTION, GET_SUBSECTIONS } from "./types";

export const getSubsections = sections => ({ type: GET_SUBSECTIONS, payload: sections })
export const addSubsection = subsection => ({ type: ADD_SUBSECTION, payload: subsection })