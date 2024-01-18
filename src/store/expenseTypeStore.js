import { create, useStore } from "zustand";

const store = (set) => ({
    type:['EQUAL' , 'EXACT'  , 'PERCENT']
})

export default useStore