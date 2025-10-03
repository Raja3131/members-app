"use client"

type Props ={
    value:string;
    onChange:(v:string)=>void
    placeholder?:string
}

export const SearchBox =({value,onChange,placeholder}:Props) =>{

    return (
        <div className="mb-4">
            <input
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder ?? "Search"}
                className="w-full max-w-sm rounded-lg border px-3 py-2 outline-none focus:ring"
                type="text"
            />
        </div>
    )
}