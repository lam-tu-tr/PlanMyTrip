import { createSlice } from "@reduxjs/toolkit";
import { Session, UserMetadata } from "@supabase/supabase-js";

interface SessionState {
  data: Session | null;
  user_metadata: UserMetadata | null;
}
//set initial value
const initialState: SessionState = {
  data: null,
  user_metadata: null,
};

export const sessionSlice = createSlice({
  name: "session",
  initialState,
  reducers: {
    setSession: (state, action) => {
      const { session } = action.payload;
      state.data = session;
      state.user_metadata = session.user.user_metadata;
    },
    logOut: (state) => {
      state.data = null;
      state.user_metadata = null;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setSession, logOut } = sessionSlice.actions;

export default sessionSlice.reducer;
