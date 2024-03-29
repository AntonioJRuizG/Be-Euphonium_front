import { createReducer } from "@reduxjs/toolkit";
import * as ac from "./filter.action.creator";

export type FilterProps = {
  filter: string;
  category: string;
};

const initialState = {
  filter: "",
  category: "",
} as FilterProps;

export const filterReducer = createReducer(initialState, (builder) => {
  builder.addCase(ac.loadCreator, (_state, { payload }) => payload);
  builder.addCase(ac.clearCreator, (_state) => initialState);
  builder.addDefaultCase((state) => state);
});
