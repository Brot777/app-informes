import { idsSubtipoDeTarea } from "../utils/consts/indices.js"

export const formatEventsTableAll=(tasks)=>{

const newTasks=tasks.map((task)=>{
    
    return{...task,tipoFaltaDeAgua:idsSubtipoDeTarea[task.taskSubType.toString()]}
})
return newTasks 
}



