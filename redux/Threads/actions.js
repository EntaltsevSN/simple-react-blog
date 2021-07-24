import { ADD_THREAD } from "../temp/CommentThreads/types";
import { GET_THREADS } from "./types";

export const getThreads = threads => ({ type: GET_THREADS, payload: threads })
export const addThread = thread => ({ type: ADD_THREAD, payload: thread })