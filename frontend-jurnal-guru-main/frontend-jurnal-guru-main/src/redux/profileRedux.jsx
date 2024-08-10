import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";



export const fetchDataProfile = createAsyncThunk('profile/fetchDataProfile', async (params,thunkAPI) => {
    try {
        const token = localStorage.getItem("access_token");
        const role = localStorage.getItem("role").toLowerCase();
        const link = `${process.env.BASE_URL}/${role}/${
            params?.id ? `users/${params?.id}` : "profile"
          }`
          console.log(link,"<<<<<<<<<<<<FETCH PROFILE REDUX");
        const response = await axios({
          method: "get",
          url: link,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        
        return {data:response?.data,role:response?.data?.role};
      } catch (error) {
        console.log(error);
      }
});

const profileSlice = createSlice({
    name: "profile",
    initialState: {
        data: [],
        loading: false,
        error: null,
        role: "",
    },
    reducers: {
    },
    extraReducers: (builder) => {
        builder
        .addCase(fetchDataProfile.pending, (state, action) => {
            state.loading = true;
            state.data = [];
        })
        .addCase(fetchDataProfile.fulfilled, (state, action) => {
            state.loading = false;
            state.data = action.payload;
            state.role = action.payload?.role?.toLowerCase();
        })
        .addCase(fetchDataProfile.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error;
        });
    },
});

export default profileSlice.reducer;