import React from 'react'
import Daily from './Daily'
import Weekly from './Weekly'

const Goals = () => {
  return (
    <div className="flex m-3 p-5 gap-3 justify-between items-center bg-slate-200 rounded-lg">
        <Daily/>
        <Weekly/>
    </div>
  )
}

export default Goals