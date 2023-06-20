import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { Faculty } from "../models/faculty";
import { v4 as uuid } from 'uuid';
import { format } from 'date-fns';

export default class FacultyStore {
    facultyRegistry = new Map<string, Faculty>();
    selectedFaculty?: Faculty | undefined = undefined;
    editMode = false;
    loading = false;
    loadingInitial = false;

    constructor() {
        makeAutoObservable(this);
    }

    get faculties() {
        return Array.from(this.facultyRegistry.values());
    }


    loadFaculties = async () => {
        this.loadingInitial = true;
        try {
            const faculties = await agent.Faculties.list();
            faculties.forEach(faculty => {
                this.setFaculty(faculty);
            })
            this.setLoadingInitial(false);
        } catch (error) {
            console.log(error);
            this.setLoadingInitial(false);
        }
    }

    loadFaculty = async (id: string) => {
        let faculty = this.getFaculty(id);
        if (faculty) {
            this.selectedFaculty = faculty;
            return faculty;
        }
        else {
            this.loadingInitial = true;
            try {
                faculty = await agent.Faculties.details(id);
                this.setFaculty(faculty);
                runInAction(() => this.selectedFaculty = faculty)
                this.setLoadingInitial(false);
                return faculty;
            } catch (error) {
                console.log(error);
                this.setLoadingInitial(false);
            }
        }
    }

    private setFaculty = (faculty: Faculty) => {
        this.facultyRegistry.set(faculty.id, faculty);
    }


    private getFaculty = (id: string) => {
        return this.facultyRegistry.get(id);
    }


    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    }


    createFaculty = async (faculty: Faculty) => {
        this.loading = true;
        try {
            await agent.Faculties.create(faculty);
            runInAction(() => {
                this.facultyRegistry.set(faculty.id, faculty);
                this.selectedFaculty = faculty;
                this.editMode = false;
                this.loading = false;
            })
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            })
        }
    }

    updateFaculty = async (faculty: Faculty) => {
        this.loading = true;
        try {
            await agent.Faculties.update(faculty);
            runInAction(() => {
                this.facultyRegistry.set(faculty.id, faculty);
                this.selectedFaculty = faculty;
                this.editMode = false;
                this.loading = false;
            })
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            })
        }
    }

    deleteFaculty = async (id: string) => {
        this.loading = true;
        try {
            await agent.Faculties.delete(id);
            runInAction(() => {
                this.facultyRegistry.delete(id);
                this.loading = false;
            })
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            })
        }
    }

}

