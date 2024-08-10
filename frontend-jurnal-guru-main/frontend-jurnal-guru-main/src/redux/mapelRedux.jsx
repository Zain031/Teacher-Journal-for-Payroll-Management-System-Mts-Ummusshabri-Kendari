import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


export const fetchDataMapel = createAsyncThunk("mapel/fetchDataMapel",async(params,thunkAPI)=>{
    try{
        
        console.log("<<<<<<<<<<<<<<MAPEL<<<<<<<<<<,,")
        const token = localStorage.getItem("access_token");
        const role = localStorage.getItem("role")?.toLowerCase();
        const response = await axios({
            method:"get",
            url:`${process.env.BASE_URL}/mapel`,
            headers:{
                Authorization:`Bearer ${token}`
            }
        });
        console.log(response.data,"AASAAAAAAAAAAAAAA");
        return response.data;
    }
    catch(error){
        console.log(error)
        throw error;
    }
}
)

const mapelSlice = createSlice({
    name:"mapel",
    initialState:{
        data:[],
        loading:false,
        error:null
    },
    reducers:{
    },
    extraReducers:(builder)=>{
        builder
        .addCase(fetchDataMapel.pending,(state,action)=>{
            state.loading = true;
        })
        .addCase(fetchDataMapel.fulfilled,(state,action)=>{
            state.loading = false;
            state.data = action.payload;
        })
        .addCase(fetchDataMapel.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.error;
        })
    }
})


export default mapelSlice.reducer;