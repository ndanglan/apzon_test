import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { TRootState } from "@/redux/store";
import { TAppState } from "@/redux/slices/app/appSlice.type";
import { ETab } from "@/shared/constants/app.enum";
import { TInfo } from "@/types/product.type";

const initialState: TAppState = {
 sideBarOpen: true,
 currentSideBarTab: ETab.ORDER,
};

export const appSlice = createSlice({
 name: "app",
 initialState,
 reducers: {
  toggleSidebar: (state, action: PayloadAction<boolean>) => {
   state.sideBarOpen = action.payload;
  },

  setCurrentSideBarTab: (state, action: PayloadAction<ETab>) => {
   state.currentSideBarTab = action.payload;
  },

  setOrderData: (state, action: PayloadAction<TInfo>) => {
   state.orderData = action.payload;
  },
  setShoppingData: (state, action: PayloadAction<TInfo>) => {
   state.shoppingData = action.payload;
  },
 },
});

// Action creators are generated for each case reducer function

export const {
 toggleSidebar,
 setCurrentSideBarTab,
 setOrderData,
 setShoppingData,
} = appSlice.actions;

export const appReducer = appSlice.reducer;

export const appSelector = (state: TRootState) => state.app;
