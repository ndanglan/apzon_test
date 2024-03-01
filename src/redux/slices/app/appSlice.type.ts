import { ETab } from "@/shared/constants/app.enum";
import { TInfo } from "@/types/product.type";

export type TAppState = {
 sideBarOpen: boolean;
 currentSideBarTab: ETab;
 orderData?: TInfo;
 shoppingData?: TInfo;
};
