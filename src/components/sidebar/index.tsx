import { Layout, Menu, MenuProps } from "antd";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
 appSelector,
 setCurrentSideBarTab,
 toggleSidebar,
} from "@/redux/slices/app/appSlice";
import { ETab } from "@/shared/constants/app.enum";
import { ShoppingCartOutlined, ShoppingOutlined } from "@ant-design/icons";

const { Sider } = Layout;

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
 label: React.ReactNode,
 key: React.Key,
 icon?: React.ReactNode,
 children?: MenuItem[],
): MenuItem {
 return {
  key,
  icon,
  children,
  label,
 } as MenuItem;
}

const items: MenuItem[] = [
 getItem("Đơn bán hàng", ETab.ORDER, <ShoppingCartOutlined />),
 getItem("Đơn mua hàng", ETab.SHOPPING, <ShoppingOutlined />),
];

const SideBar = () => {
 const { sideBarOpen } = useAppSelector(appSelector);
 const dispatch = useAppDispatch();

 const onCollapse = (value: boolean) => {
  dispatch(toggleSidebar(value));
 };

 const onSelectTab = (key: ETab) => {
  dispatch(setCurrentSideBarTab(key));
 };
 return (
  <Sider collapsible collapsed={sideBarOpen} onCollapse={onCollapse}>
   <div className="demo-logo-vertical" />
   <Menu
    theme="dark"
    defaultSelectedKeys={[ETab.ORDER]}
    mode="inline"
    items={items}
    onSelect={({ key }) => {
     onSelectTab(key as ETab);
    }}
   />
  </Sider>
 );
};

export default SideBar;
