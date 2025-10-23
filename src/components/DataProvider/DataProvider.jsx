import react,{createContext, useReducer} from 'react'
import { initialState } from '../../utility/Reducer'
export const dataContext=createContext()

export const DataProvider=({children,reducer,initialState})=>{
    return(
        <dataContext.Provider value={useReducer(reducer,initialState)} >

            {children}
        </dataContext.Provider>
    )
}

// const [state ,dispatch]= useReducer[reducer ,initialState]