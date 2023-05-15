import { makeAutoObservable, runInAction } from "mobx";
import { University } from "../models/university";
import agent from "../api/agent";
import {v4 as uuid} from 'uuid';
import {format} from 'date-fns';

export default class UniversityStore
{
    universityRegistry = new Map<string, University>();
    selectedUniversity?: University | undefined = undefined;
    editMode = false;
    loading = false;
    loadingInitial= false;
    
    constructor (){
    makeAutoObservable(this)
    }

    get universitiesByDate(){
        return Array.from(this.universityRegistry.values()).sort((a,b) => 
        a.date!.getTime() - b.date!.getTime());
    }

    get groupedUniversities() {
        return Object.entries(
            this.universitiesByDate.reduce((universities, university) => {
                const date = format(university.date!, 'dd MMM yyyy');
                universities[date] = universities[date] ? [...universities[date], university] : [university];
                return universities;
            }, {} as {[key: string]: University[]})
        )
    }


    loadUniversities = async () => {
        this.loadingInitial= true;
        try{
            const universities = await agent.Universities.list();
                universities.forEach(university =>{
                    this.setUniversity(university);
                  })
            this.setLoadingInitial(false);
        }catch(error){
            console.log(error);
                this.setLoadingInitial(false);
            }
        }

        loadUniversity = async (id: string) => {
            let university = this.getUniversity(id);
            if(university) {
                this.selectedUniversity=university;
                return university;
            }
            else{
                this.loadingInitial =true;
                try{
                    university = await agent.Universities.details(id);
                    this.setUniversity(university);
                    runInAction(() => this.selectedUniversity=university)
                    this.setLoadingInitial(false);
                    return university;
                }catch(error){
                    console.log(error);
                    this.setLoadingInitial(false);
                }
            }
        }

        private setUniversity =(university: University) => {
            university.date = new Date(university.date!);
            this.universityRegistry.set(university.id, university);
        }


        private getUniversity = (id: string) => {
            return this.universityRegistry.get(id);
        }


    setLoadingInitial = (state: boolean) =>{
        this.loadingInitial=state;
    }


    createUniversity = async (university: University) => {
        this.loading=true;
        try{
            await agent.Universities.create(university);
            runInAction(() => {
                this.universityRegistry.set(university.id, university);
                this.selectedUniversity= university;
                this.editMode=false;
                this.loading= false;
            })
        }catch(error){
            console.log(error);
            runInAction(() => {
                this.loading=false;
            })
        }
    }

    updateUniversity = async (university: University) => {
        this.loading=true;
        try{
            await agent.Universities.update(university);
            runInAction(() => {
                this.universityRegistry.set(university.id, university);
                this.selectedUniversity= university;
                this.editMode=false;
                this.loading=false;
            })
        }catch(error){
            console.log(error);
            runInAction(()=>{
                this.loading=false;
            })
        }
    }

    deleteUniversity =async (id: string) => {
        this.loading=true;
        try{
            await agent.Universities.delete(id);
            runInAction(() => {
                this.universityRegistry.delete(id);
            this.loading=false;
            })
        }catch(error){
            console.log(error);
            runInAction(() => {
                this.loading=false;
            })
        }
    }

}