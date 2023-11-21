import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface ModalState {
    isOpen: boolean;
    isNewUser: boolean;
    isProjectMember: boolean;
}

export const initialState: ModalState = {
    isOpen: false,
    isNewUser: false,
    isProjectMember: false,
}

export const modalSlice = createSlice({
    name: "modal",
    initialState,
    reducers: {
        openModal: (state, action: PayloadAction<ModalState>) => {
            state.isOpen = true;
            state.isNewUser = action.payload.isNewUser;
            state.isProjectMember = action.payload.isProjectMember;
        },
        closeModal: (state) => {
            state.isOpen = false;
            state.isNewUser = false;
            state.isProjectMember = false;
        },
    },
});

export const { openModal, closeModal } = modalSlice.actions;
export default modalSlice.reducer;