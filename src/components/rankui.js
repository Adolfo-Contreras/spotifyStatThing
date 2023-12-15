import React, { useReducer } from 'react';
function rankReducer(state, action) {
    //reducer to either rank above or below random picked song
    switch (action.type) {
        case 'RankUp':{
            console.log('up')
            return {
                ...state,
                RankedHigher: [...state.RankedHigher, ' up'],
            };
        }
        case 'RankDown':{
            console.log('dwon')
            return {
                ...state,
                RankedLower: [...state.RankedLower, ' down'],
            };
        }
        default:
            throw Error('Unknown action '+ action.type)
    }
}
const initialState ={RankedHigher:[],RankedLower:[]}


export function RankUI() {
    const [state, dispatch] = useReducer(rankReducer, initialState)
    function handleRankDown() {
        dispatch({
            type: 'RankDown',
        })
    }
    function handleRankUp() {
        dispatch({
            type: 'RankUp',
        })
    }
    return(
        <>
        <section className=" p-4 flex-col flex  gap-2.5">
            <p className=" text-2xl">Compared to somethingidk</p>
            <div className=" flex items-center gap-1.5">
                <span className=" text-3xl">Rank</span> 
                <button className=" font-extrabold text-3xl border border-[#e5e7eb] rounded-full w-11 h-11 shadow-inner shadow-[#e5e7eb]"
                onClick={handleRankUp}>&#8679;</button>
                <button className=" font-extrabold text-3xl border border-[#e5e7eb] rounded-full w-11 h-11 shadow-inner shadow-[#e5e7eb]"
                onClick={handleRankDown}>&#8681;</button>
            </div>
            <div>
                <section>
                    <p>{state.RankedHigher}</p>
                </section>
                <section>
                    <p>{state.RankedLower}</p>
                </section>
            </div>
        </section>
        </>
    ) 
}