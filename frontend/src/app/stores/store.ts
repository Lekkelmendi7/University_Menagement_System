import { createContext, useContext } from "react";
import UniversityStore from './universityStore';

interface Store {
    universityStore: UniversityStore
}

export const store: Store = {
    universityStore: new UniversityStore()
}

export const StoreContext = createContext(store);

export function useStore(){
    return useContext(StoreContext);
}
