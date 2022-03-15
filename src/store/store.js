import { createStore } from "@reduxjs/toolkit";
import { reducer } from "../features/reducer";

export const store = createStore(reducer);