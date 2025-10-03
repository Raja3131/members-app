"use Client";

import {useCallback, useEffect,useState} from "react";

export const useFetch =<T>(url:string) => {
    const [data,setData] = useState<T | null>(null);
    const [loading,setLoading] = useState<boolean>(true)
    const [error,setError ] = useState<Error | null>(null)

    const fetchData = useCallback( 
        async () =>{
            try{
                const response = await fetch(url)
                if(!response.ok){
                    throw new Error(`Error: ${response.status  }`)
                }
                const json = await response.json()
                setData(json)
            }
            catch(err:any){
                console.log(err)
                setError(err)
            }
            finally{
                setLoading(false)
            }
        },[url]
    )

    useEffect(()=>{
        fetchData()
    },[fetchData])
    return {data,loading,error,refetch:fetchData}
}