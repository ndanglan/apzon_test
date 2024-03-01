import { PropsWithChildren } from "react";
import { Provider as ReduxProvider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "./store";

const Provider = (props: PropsWithChildren) => {
 return (
  <ReduxProvider store={store}>
   <PersistGate loading={null} persistor={persistor}>
    {props.children}
   </PersistGate>
  </ReduxProvider>
 );
};

export default Provider;
