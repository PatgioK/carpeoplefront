import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import produce from "immer";
import { RootState } from "../../app/store";
import { fetchPeople, createPerson } from "./peopleAPI";

export enum Statuses {
  Initial = "Not Fetched",
  Loading = "Loading...",
  UpToDate = "Up to Date",
  Deleted = "Deleted",
  Error = "Error",
}

// TODO: change so dates export as json 
// dates are set to any, idk how to fix error yet I know this is not right lol

export interface PersonState {
  id?: number;
  firstname?: string;
  lastname?: string;
  email?: string;
  created_at?: any;
  updated_at?: any;
}

export interface PersonFormData{
    person: {
        id? :string;
        firstname: string;
        lastname: string;
        email: string;
    }
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
    },
  ],
  status: Statuses.Initial,
};

export const fetchPersonAsync = createAsyncThunk(
  "people/fetchPeople",
  async () => {
    const response = await fetchPeople();
    return response;
  }
);

export const createPersonAsync = createAsyncThunk(
    'people/createPerson',
    async (payload: PersonFormData) => {
        const response = await createPerson(payload);

        return response;
    }
)


// TODO
// all using immer, not sure if correct way
// unit test this
export const peopleSlice = createSlice({
  name: "person",
  initialState,
  
  //Synchronous actions from rails frontend?
  reducers: {},

  //Async actions
  extraReducers: (builder) => {
    builder
    /** fetches */
      .addCase(fetchPersonAsync.pending, (state) => {
        return produce(state, (draftState) => {
          draftState.status = Statuses.Loading;
        });
      })
      .addCase(fetchPersonAsync.fulfilled, (state, action) => {
        return produce(state, (draftState) => {
            draftState.person = action.payload;
          draftState.status = Statuses.UpToDate;
        });
      })
      .addCase(fetchPersonAsync.rejected , (state) => {
        return produce(state, (draftState) => {
          draftState.status = Statuses.Error;
        });
      })
    /**  Create*/  
      .addCase(createPersonAsync.pending, (state) => {
        return produce(state, (draftState) => {
          draftState.status = Statuses.Loading;
        });
      })
      .addCase(createPersonAsync.fulfilled, (state, action) => {
        return produce(state, (draftState) => {
            draftState.person.push(action.payload);
          draftState.status = Statuses.UpToDate;
        });
      })
      .addCase(createPersonAsync.rejected , (state) => {
        return produce(state, (draftState) => {
          draftState.status = Statuses.Error;
        });
      });
  },
});

// actions for frontend that dont really effect backend
// eg: how data sorted in frontend
//export const {setSortDirection} = peopleSlice.actions;
export const {} = peopleSlice.actions;

export const selectPerson = (state: RootState) => state.people.person;
export const selectStatus = (state: RootState) => state.people.status;

export default peopleSlice.reducer;
