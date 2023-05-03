import { makeAutoObservable, runInAction } from "mobx";
import { University } from "../models/university";
import agent from "../api/agent";
import {v4 as uuid} from 'uuid';

export default class UniversityStore
{
    universityRegistry = new Map<string, University>();
    selectedUniversity: University | undefined = undefined;
    editMode = false;
    loading = false;
    loadingInitial= true;
    
    constructor (){
    makeAutoObservable(this)
    }

    get universitiesByDate(){
        return Array.from(this.universityRegistry.values()).sort((a,b) => 
        Date.parse(a.date) - Date.parse(b.date));
    }

    loadUniversities = async () => {

        try{
            const universities = await agent.Universities.list();
                universities.forEach(university =>{
                    university.date = university.date.split('T')[0];
                    this.universityRegistry.set(university.id, university);
                  })
            this.setLoadingInitial(false)
        }catch(error){
            console.log(error);
                this.setLoadingInitial(false)
            }
        }
    

    setLoadingInitial = (state: boolean) =>{
        this.loadingInitial=state;
    }

    selectUniversity = (id: string) => {
        this.selectedUniversity = this.universityRegistry.get(id);;
    }

    cancelSelectedUniversity = () => {
        this.selectedUniversity= undefined;
    }

    openForm = (id?: string) => {
        id ? this.selectUniversity(id) : this.cancelSelectedUniversity() ;
        this.editMode= true;
    }

    closeForm = () => {
        this.editMode= false;
    }

    createUniversity = async (university: University) => {
        this.loading=true;
        university.id= uuid();
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
            if (this.selectedUniversity?.id=== id) this.cancelSelectedUniversity();
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