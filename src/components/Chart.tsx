import React, { useEffect, useRef } from 'react';

const Chart = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    // Chart data points (approximated from the image)
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const physics = [75, 78, 85, 88, 82, 78, 74, 76, 82, 85, 80, 75];
    const computerScience = [50, 65, 80, 85, 75, 70, 65, 72, 78, 85, 90, 95];
    const maths = [95, 85, 75, 65, 70, 75, 68, 72, 75, 80, 85, 90];

    // Scale data to canvas
    const scaleX = width / (months.length - 1);
    const scaleY = height / 100;

    // Draw grid lines
    ctx.strokeStyle = '#f0f0f0';
    ctx.lineWidth = 1;
    
    // Horizontal grid lines
    for (let i = 0; i <= 10; i++) {
      const y = (i * height) / 10;
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }

    // Draw lines
    const drawLine = (data: number[], color: string) => {
      ctx.strokeStyle = color;
      ctx.lineWidth = 2;
      ctx.beginPath();
      
      data.forEach((value, index) => {
        const x = index * scaleX;
        const y = height - (value * scaleY);
        
        if (index === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      });
      
      ctx.stroke();
    };

    drawLine(physics, '#6366f1'); // Blue
    drawLine(computerScience, '#10b981'); // Green
    drawLine(maths, '#ef4444'); // Red
  }, []);

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-800">Subject Performance Over Time</h2>
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
            <span className="text-sm text-gray-600">Physics</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="text-sm text-gray-600">Computer Science</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <span className="text-sm text-gray-600">Maths</span>
          </div>
        </div>
      </div>
      
      <div className="relative">
        <canvas
          ref={canvasRef}
          width={800}
          height={300}
          className="w-full h-64"
        />
        
        {/* Month labels */}
        <div className="flex justify-between mt-4 text-xs text-gray-500">
          {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map((month) => (
            <span key={month} className={month === 'Oct' ? 'text-blue-600 font-medium' : ''}>{month}</span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Chart;