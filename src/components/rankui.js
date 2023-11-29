

export function RankUI() {

    
    return(
        <>
        <section className=" p-4 flex-col flex  gap-2.5">
            <p className=" text-2xl">Compared to somethingidk</p>
            <div className=" flex items-center gap-1.5">
                <span className=" text-3xl">Rank</span> 
                <button className=" font-extrabold text-3xl border border-[#e5e7eb] rounded-full w-11 h-11 shadow-inner shadow-[#e5e7eb]">&#8679;</button>
                <button className=" font-extrabold text-3xl border border-[#e5e7eb] rounded-full w-11 h-11 shadow-inner shadow-[#e5e7eb]">&#8681;</button>
            </div>
        </section>
        </>
    ) 
}