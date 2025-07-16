import React from 'react';

const Calendar = () => {
  const days = [
    { day: 'SUN', date: '22', isToday: true },
    { day: 'MON', date: '23', isToday: false },
    { day: 'TUE', date: '24', isToday: false },
    { day: 'WED', date: '25', isToday: false },
    { day: 'THU', date: '26', isToday: false },
    { day: 'FRI', date: '27', isToday: false },
    { day: 'SAT', date: '28', isToday: false },
  ];

  const events = [
    { time: '12 - 1:30am', title: 'Grind', color: 'bg-orange-500', day: 1 },
    { time: '3 - 4am', title: 'Chill', color: 'bg-red-600', day: 1 },
    { time: '5 - 6am', title: 'Physics Paper 2 2018', color: 'bg-blue-600', day: 1 },
    { time: '', title: 'Al-Hijra (Islamic New Year)', color: 'bg-green-600', day: 4 },
  ];

  const timeSlots = ['GMT+04', '1 AM', '2 AM', '3 AM', '4 AM', '5 AM'];

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      {/* Calendar Header */}
      <div className="grid grid-cols-8 gap-4 mb-6">
        <div className="text-sm text-gray-500"></div>
        {days.map((day, index) => (
          <div key={index} className="text-center">
            <div className={`text-xs font-medium mb-1 ${day.isToday ? 'text-blue-600' : 'text-gray-500'}`}>
              {day.day}
            </div>
            <div className={`text-xl font-semibold ${
              day.isToday 
                ? 'bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center mx-auto' 
                : 'text-gray-800'
            }`}>
              {day.date}
            </div>
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-8 gap-4">
        {/* Time column */}
        <div className="space-y-12">
          {timeSlots.map((time, index) => (
            <div key={index} className="text-xs text-gray-500 h-12 flex items-center">
              {time}
            </div>
          ))}
        </div>

        {/* Day columns */}
        {days.map((day, dayIndex) => (
          <div key={dayIndex} className="space-y-2">
            {dayIndex === 1 && (
              <>
                {/* Grind event */}
                <div className="bg-orange-500 text-white text-xs p-2 rounded mb-8">
                  <div className="font-medium">Grind</div>
                  <div className="text-xs opacity-90">12 - 1:30am</div>
                </div>
                
                {/* Chill event */}
                <div className="bg-red-600 text-white text-xs p-2 rounded mb-8">
                  <div className="font-medium">Chill</div>
                  <div className="text-xs opacity-90">3 - 4am</div>
                </div>
                
                {/* Physics event */}
                <div className="bg-blue-600 text-white text-xs p-2 rounded">
                  <div className="font-medium">Physics Paper 2 2018</div>
                </div>
              </>
            )}
            
            {dayIndex === 4 && (
              <div className="bg-green-600 text-white text-xs p-2 rounded">
                <div className="font-medium">Al-Hijra (Islamic New Year)</div>
              </div>
            )}
            
            {/* Empty time slots */}
            {Array(6).fill(null).map((_, slotIndex) => (
              <div key={slotIndex} className="h-12 border-b border-gray-100"></div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calendar;