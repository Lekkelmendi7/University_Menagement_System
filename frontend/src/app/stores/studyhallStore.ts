import { makeAutoObservable, runInAction } from "mobx";
import { StudyHall } from "../models/studyhalls";
import agent from "../api/agent";
import { v4 as uuid } from 'uuid';

export default class StudyHallStore{
    studyHallRegistry= new Map<string, StudyHall>();
    selectedStudyHall?: StudyHall | undefined = undefined;
    editMode = false; 
    loading = false;
    loadingInitial = false;

    constructor(){
        makeAutoObservable(this);
    }

    private setStudyHall = (studyhall: StudyHall) => {
        this.studyHallRegistry.set(studyhall.id, studyhall);
    }

    private getStudyHall = (id: string) => {
        return this.studyHallRegistry.get(id);
    }

    setLoadingInitial = (state: boolean) => {
        this.loadingInitial=state;
    }

    get studyhalls() {
        return Array.from(this.studyHallRegistry.values());
    }

    loadStudyHalls = async() => {
        this.loadingInitial=true;
        try{
            const studyhalls= await agent.StudyHalls.list();
            studyhalls.forEach(studyHall => {
                this.setStudyHall(studyHall);
            })
        }catch(error){
            console.log(error);
            this.setLoadingInitial(false);
        }
    }

    loadStudyHall = async (id: string) => {
        let studyhall= this.getStudyHall(id);
        if(studyhall){
            this.selectedStudyHall= studyhall;
            return studyhall;
        }
        else{
            this.loadingInitial= true;
            try{
                studyhall = await agent.StudyHalls.details(id);
                this.setStudyHall(studyhall);
                runInAction(() => this.selectedStudyHall = studyhall);
                this.setLoadingInitial(false);
                return studyhall;
            }catch(error){
                console.log(error);
                this.setLoadingInitial(false);
            }
        }
    }


    createStudyHall = async (studyhall: StudyHall) => {
        this.loading=true;
        try{
            await agent.StudyHalls.create(studyhall);
            runInAction(() =>{
                this.studyHallRegistry.set(studyhall.id, studyhall);
                this.selectedStudyHall= studyhall;
                this.editMode= false;
                this.loading = false;
            })
        }catch(error){
            console.log(error);
            runInAction(() =>{
                this.loadingInitial = false;
            })
        }
    }

    updateStudyHall = async (studyhall: StudyHall) => {
        this.loading=false;
        try{
            await agent.StudyHalls.update(studyhall);
            runInAction(() => {
                this.studyHallRegistry.set(studyhall.id, studyhall);
                this.selectedStudyHall = studyhall;
                this.editMode= false;
                this.loading = false;
            })
        }catch(error){
            console.log(error);
            runInAction(()=> {
                this.loadingInitial = false;
            })
        }
    }

    deleteStudyHall = async (id: string) => {
        this.loading= true;
        try{
            await agent.StudyHalls.delete(id);
            runInAction(() => {
                this.studyHallRegistry.delete(id);
                this.loading = false;
            })
        }catch(error){
            console.log(error);
            runInAction(()=> {
                this.loadingInitial= false;
            })
        }
    }


}