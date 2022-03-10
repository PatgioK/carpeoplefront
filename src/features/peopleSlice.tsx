import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import produce from 'immer';
import { RootState } from "../app/store";
import { fetchPeople } from "./peopleAPI";

export enum Statuses {
    Initial = "Not Fetched",
    Loading = "Loading...",
    UpToDate = "Up to Date",
    Deleted = "Deleted",
    Error = "Error",
}

// dates are set to any, idk how to fix errors yet I know this is not right lol
export interface PersonState {
    id?: number;
    firstname?: string;
    lastname?: string;
    email?: string;
    created_at?: any;
    updated_at?: any;
}

export interface PeopleState {
    person: PersonState[];
    status: string;
}

const initialState: PeopleState = {
    person: [
        {
            id: 0,
            firstname: "",
            lastname: "",
            email: "",
            created_at: "",
            updated_at: "",
        }
    ],
    status: Statuses.Initial
}

export const fetchPersonAsync = createAsyncThunk(
    'people/fetchPeople',
    async () => {
        const response = await fetchPeople();
        return response;
    }
)

export const peopleSlice = createSlice({
    name: 'person',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchPersonAsync.pending, (state) => {
                return produce(state, (draftState) => {
                    draftState.status = Statuses.Loading;
                })
            })

            .addCase(fetchPersonAsync.fulfilled, (state) => {
                return produce(state, (draftState) => {
                        draftState.status = Statuses.UpToDate;
                })
            })

            .addCase(fetchPersonAsync.pending, (state) => {
                return produce(state, (draftState) => {
                        draftState.status = Statuses.Error;
                })
            })
    }
})

export const {} = peopleSlice.actions

export const selectPerson = (state: RootState) => state.people.posts;
export const selectStatus = (state: RootState) => state.person.posts;

export default peopleSlice.reducer;