import { createSlice } from "@reduxjs/toolkit";
import { Session, User } from "@supabase/supabase-js";

interface SessionState {
  data: Session | null;
  user: User | null;
}
//set initial value
const initialState: SessionState = {
  data: null,
  user: null,
};

export const sessionSlice = createSlice({
  name: "session",
  initialState,
  reducers: {
    setSession: (state, action) => {
      const { session } = action.payload;
      state.data = session;
      state.user = session.user;
    },
    logOut: (state, action) => {
      state.data = null;
      state.user = null;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setSession, logOut } = sessionSlice.actions;

export default sessionSlice.reducer;

export const userSelector = (state: SessionState) => state?.user;
