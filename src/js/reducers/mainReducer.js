import { createSlice } from "@reduxjs/toolkit";

export const mainReducer = createSlice({
  name: "main",
  initialState: {
    platform: "",
    isDesktop: false,
    theme: "light",
    hasHeader: false,
    infoUser: { name: "Загрузка..." },
    home: [],
    home2: [],
    home_sort: [],
    isCheckRef: false,
    home_tab: "new",
    profile: [],
    isSub: false,
    user_id: 0,
    isAdmin: false,
    report_id: 0,
    helper: {},
    help: {},
    userCard: {},
    helpers: [],
    heplerInfo: {},
    helpersID: 0,
    add: "",
    isPanelConnection: false,
    prevPanel: "",
    client: "",
    upInfo: {}
  },
  reducers: {
    set: (state, action) => {
      state[action.payload.key] = action.payload.value;
    },
  },
});

export const { set } = mainReducer.actions;
export default mainReducer.reducer;
