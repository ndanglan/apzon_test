import { Layout } from "antd";

import SideBar from "@/components/sidebar";
import OrderTab from "@/views/order";
import ShoppingTab from "@/views/shopping";

function App() {
 return (
  <Layout className="min-h-[100vh]">
   <SideBar />
   <Layout className="p-20">
    <OrderTab />
    <ShoppingTab />;
   </Layout>
  </Layout>
 );
}

export default App;
