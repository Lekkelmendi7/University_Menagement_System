import { createContext, useContext } from "react";
import UniversityStore from './universityStore';
import CommonStore from "./commonStore";
import UserStore from "./userStores";
import ModalStore from "./modalStore";

interface Store {
    universityStore: UniversityStore;
    commonStore: CommonStore;
    userStore: UserStore;
    modalStore: ModalStore;
}

export const store: Store = {
    universityStore: new UniversityStore(),
    commonStore: new CommonStore(),
    userStore: new UserStore(),
    modalStore: new ModalStore()
}

export const StoreContext = createContext(store);

export function useStore(){
    return useContext(StoreContext);
}
