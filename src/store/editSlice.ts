import { createSlice } from "@reduxjs/toolkit";

const editSlice = createSlice({
    name: "edit",
    initialState: {
        editedComment: 0,
        editedPost: 0,
    },
    reducers: {
        editComment(state){
            state.editedComment += 1
        },
        editPost(state){
            state.editedPost +=1
        }
    }
})

export const editActions = editSlice.actions
export default editSlice.reducer;