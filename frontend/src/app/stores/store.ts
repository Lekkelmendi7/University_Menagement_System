import { createContext, useContext } from "react";
import UniversityStore from './universityStore';
import CommonStore from "./commonStore";

interface Store {
    universityStore: UniversityStore;
    commonStore: CommonStore;
}

export const store: Store = {
    universityStore: new UniversityStore(),
    commonStore: new CommonStore()
}

export const StoreContext = createContext(store);

export function useStore(){
    return useContext(StoreContext);
}
