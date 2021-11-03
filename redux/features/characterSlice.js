import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	character: null,
	id: null,
};

const characterSlice = createSlice({
	name: "character",
	initialState,
	reducers: {
		setActiveCharacter: (state, action) => {
			state.character = action.payload.data;
			state.id = action.payload.id;
		},
		deselectCharacter: (state) => {
			state.character = null;
			state.id = null;
		},
	},
});

export const { setActiveCharacter, deselectCharacter } = characterSlice.actions;

export const selectCharacter = (state) => state.character.character;
export const selectID = (state) => state.character.id;

export default characterSlice.reducer;
