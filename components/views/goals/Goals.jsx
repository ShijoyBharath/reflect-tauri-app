import React from 'react'
import DailyGoals from './DailyGoals'
import WeeklyGoals from './WeeklyGoals'

const Goals = () => {
  return (
    <div className="flex m-3 p-5 gap-3 justify-start items-start bg-slate-200 rounded-lg">
        <DailyGoals/>
        <WeeklyGoals/>
    </div>
  )
}

export default Goals