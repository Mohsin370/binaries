import { createSlice } from "@reduxjs/toolkit";

interface UserState {
  isLoading: boolean;
  user: {
    uuid: string,
    email: string,
    name: string,
    role: string,
    token: string
    refreshToken: string
    
  }  
}

const initialState: UserState = {
  isLoading: false,
  user:{
    uuid: '',
    email: '',
    name: '',
    role: '',
    token: '',
    refreshToken: ''
  }
};

const slice = createSlice({
  name: "user",
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },
  },
});


export default slice.reducer;
