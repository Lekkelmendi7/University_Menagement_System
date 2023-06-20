import { makeAutoObservable, runInAction } from "mobx";
import { Subject } from "../models/subject";
import agent from "../api/agent";



export default class SubjectStore {
    subjectRegistry = new Map<string, Subject>();
    selectedSubject?: Subject | undefined = undefined;
    editMode = false;
    loading = false;
    loadingInitial = false;

    constructor() {
        makeAutoObservable(this)
    }

    get subjects() {
        return Array.from(this.subjectRegistry.values());
    }

    loadSubjects = async () => {
        this.loadingInitial = true;
        try {
            const subjects = await agent.Subjects.list();
            subjects.forEach(subject => {
                this.setSubject(subject);
            })
            this.setLoadingInitial(false);
        } catch (error) {
            console.log(error);
            this.setLoadingInitial(false);
        }
    }

    loadSubject = async (id: string) => {
        let subject = this.getSubject(id);
        if (subject) {
            this.selectedSubject = subject;
            return subject;
        }
        else {
            this.loadingInitial = true;
            try {
                subject = await agent.Subjects.details(id);
                this.setSubject(subject);
                runInAction(() => this.selectedSubject = subject)
                this.setLoadingInitial(false);
                return subject;
            } catch (error) {
                console.log(error);
                this.setLoadingInitial(false);
            }
        }
    }

    private setSubject = (subject: Subject) => {
        this.subjectRegistry.set(subject.id, subject);
    }

    private getSubject = (id: string) => {
        return this.subjectRegistry.get(id);
    }

    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    }


    createSubject = async (subject: Subject) => {
        this.loadingInitial = true;
        try {
            await agent.Subjects.create(subject);
            runInAction(() => {
            this.subjectRegistry.set(subject.id, subject);
            this.selectedSubject = subject;
            this.editMode = false;
            this.loading = false;
        }) 
        }catch (error) {
            console.log(error);
            runInAction(() => {
                this.loadingInitial = false;
            })
        }
    }

    updateSubject = async (subject: Subject) => {
        this.loading = true;
        try {
            await agent.Subjects.update(subject);
            runInAction(() => {
                this.subjectRegistry.set(subject.id, subject);
                this.selectedSubject = subject;
                this.editMode = false;
                this.loading = false;
            })
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loadingInitial = false;
            })
        }
    }

    deleteSubject = async (id: string) => {
        this.loading = true;
        try {
            await agent.Subjects.delete(id);
            runInAction(() => {
                this.subjectRegistry.delete(id);
                this.loading = false;
            })
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loadingInitial = false;
            })
        }
    }

}