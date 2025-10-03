"use client";

type Props<T>={
  data:T[]
}

export const UserTable = <T extends Record<string,unknown>>({data}:Props<T>) =>{
  if(!data || data.length ===0){
    return <p className="p-2">No Data to be displayed</p>
  }
  const headers = Object.keys(data[0])
  return (
    <>
    <div className='p-4'>
      <div className='overflow-x-auto rounded-xl border border-gray-200'>
        <table className="min-w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              {
                headers.map((header)=>(
                  <th key={header} className="px-4 py-2 text-left">
                    {header}
                  </th>
                ))
              }
            </tr>
          </thead>
          <tbody>
            {
              data.map((row)=>(
                <tr key={row.id}>
                  {headers.map((header)=>(
                    <td key={header} className="px-4 py-2">
                       {typeof row[header] === "string" && row[header].startsWith("http")
                      ? <img src={row[header]} alt={header} className="h-10 w-10 rounded-full" />
                      : String(row[header])}
                    </td>
                  ))}
                </tr>
              ))
            }
          </tbody>

        </table>

      </div>
    </div>
    </>
  )
}