import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  totalCost: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addCourse: (state, action) => {
      const newCourse = action.payload;
      const duplicateCourse = state.items.find(
        (course) => course._id === newCourse._id
      );
      if (!duplicateCourse) {
        state.items.push(newCourse);
        state.totalCost += newCourse.coursePrice;
      }
    },
    clearCart: (state) => {
      state.items = [];
      state.totalCost = 0;
    },
    removeCourse: (state, action) => {
      const courseIdToRemove = action.payload;
      const courseToRemove = state.items.find(
        (course) => course._id === courseIdToRemove
      );
      if (courseToRemove) {
        state.items = state.items.filter(
          (course) => course._id !== courseIdToRemove
        );
        state.totalCost -= courseToRemove.coursePrice;
      }
    },
  },
});

export const { addCourse, clearCart, removeCourse } = cartSlice.actions;

export default cartSlice.reducer;
