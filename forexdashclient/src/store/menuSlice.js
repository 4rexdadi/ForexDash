import { createSlice } from "@reduxjs/toolkit";
// Slice

const menuSlice = createSlice({
	name: "menu",
	initialState: {
		menuSlice: {
			isSideBarOpen: false,
			isRightBarOpen: false,
		},
	},
	reducers: {
		setIsSideBarOpen: (state, action) => {
			state.menuSlice.isSideBarOpen = action.payload;
		},
		setIsRightBarOpen: (state) => {
			state.menuSlice.isRightBarOpen = !state.menuSlice.isRightBarOpen;
		},
	},
});

export const { setIsSideBarOpen, setIsRightBarOpen } = menuSlice.actions;
export default menuSlice.reducer;
