import React from 'react'
import DataTableDemo from './data-table';

const DaftarPengguna = () => {
  const [position, setPosition] = React.useState("bottom")
  return (
    <div>
      <h2 className='text-[30px] font-semibold mt-6 mb-6'>List pengguna</h2>

      <DataTableDemo/>
    </div>
  )
}

export default DaftarPengguna

