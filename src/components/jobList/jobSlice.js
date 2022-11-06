import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from "axios";
const baseUrl = "https://api.json-generator.com/templates/ZM1r0eic3XEy/data/?access_token=wm3gg940gy0xek1ld98uaizhz83c6rh2sir9f9fu";
const initialState = {
    jobs: [],
    currentPage: 1,
    jobsLoadingStatus: 'idle',
    job: {}
    
}
const convertArrayToObject = (array, key) => {
    const initialValue = {};
    return array.reduce((obj, item) => {
      return {
        ...obj,
        [item[key]]: item,
      };
    }, initialValue);
};
export const fetchJobs = createAsyncThunk(
    'jobs/fetchJobs',
    async () => {
        const response = await axios.get(baseUrl);
        const dataObj = convertArrayToObject(response.data, 'id');
        return dataObj;
        // return response.data;
    }  
);

const jobsSlice = createSlice({
    name: 'jobs',
    initialState,
    reducers: {
        setCurrentPage(state, action){
            state.currentPage = action.payload;
        },
        setJob(state, action){
            state.job = action.payload;
        }
    },
    extraReducers: (builder) =>{
        builder
            .addCase(fetchJobs.pending, state => {state.jobsLoadingStatus = 'loading'})
            .addCase(fetchJobs.fulfilled, (state, action) =>{
                state.jobsLoadingStatus = 'idle';
                state.jobs = action.payload; 
            })
            .addCase(fetchJobs.rejected, state => {
                state.jobsLoadingStatus = 'error';
                console.log('error');
            })
            .addDefaultCase(() => {})
    }
})
const {actions, reducer} = jobsSlice;
export default reducer;
export const {
    jobsFetching,
    jobsFetched,
    jobsFetchingError,
    setCurrentPage,
    setJob
} = actions



