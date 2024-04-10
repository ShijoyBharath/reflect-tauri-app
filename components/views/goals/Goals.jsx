import React from 'react'
import DailyGoals from './DailyGoals'
import WeeklyGoals from './WeeklyGoals'

const Goals = () => {
  return (
    <div className="flex flex-wrap mr-3 mb-3 bg-secondary rounded-lg">
        <DailyGoals/>
        <WeeklyGoals/>
    </div>
  )
}

export default Goals