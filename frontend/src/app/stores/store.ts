import { createContext, useContext } from "react";
import UniversityStore from './universityStore';
import CommonStore from "./commonStore";
import UserStore from "./userStores";
import ModalStore from "./modalStore";
import FacultyStore from "./facultyStore";
import SubjectStore from "./subjectStore";
import StudyHallStore from "./studyhallStore";

interface Store {
    universityStore: UniversityStore;
    facultyStore: FacultyStore;
    subjectStore: SubjectStore;
    studyHallStore: StudyHallStore;
    commonStore: CommonStore;
    userStore: UserStore;
    modalStore: ModalStore;
}

export const store: Store = {
    universityStore: new UniversityStore(),
    commonStore: new CommonStore(),
    userStore: new UserStore(),
    modalStore: new ModalStore(),
    facultyStore: new FacultyStore(),
    subjectStore: new SubjectStore(),
    studyHallStore: new StudyHallStore()
}

export const StoreContext = createContext(store);

export function useStore() {
    return useContext(StoreContext);
}
