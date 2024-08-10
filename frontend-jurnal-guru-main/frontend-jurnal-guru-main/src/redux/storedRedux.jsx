import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { act } from "react";

const initialState = {
  data: [],
  loading: false,
  error: null,
};

export const fetchData = createAsyncThunk(
  "stored/fetchData",
  async (params, thunkAPI) => {
    try {
      const token = localStorage.getItem("access_token");
      const role = localStorage.getItem("role").toLowerCase();
      const detail = params?.detail;
      console.log(detail, "<<<<<<<<<<<<FETCH STORED REDUX");
      const id = params?.id;
      let link;

      if (params?.isPublic) {
        link = `${process.env.BASE_URL}/${detail}${id ? `/${id}` : ""}`;
      } else {
        link = `${process.env.BASE_URL}/${role}/${detail}${id ? `/${id}` : ""}`;
      }
      const response = await axios({
        method: "get",
        url: link,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data, "<<<<<<<<<<<<FETCH STORED REDUX");
      return response.data;
    } catch {
      throw error;
    }
  }
);

const storedSlice = createSlice({
  name: "stored",
  initialState,
  reducers: {
    updateState: (state, action) => {
        console.log(action.payload)
        state.data = action.payload ? action.payload : [];
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      });
  },
});

export default storedSlice.reducer;
