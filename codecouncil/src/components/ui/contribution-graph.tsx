import { useTheme } from "@/context/ThemeContext";

interface CommitDay {
  date: string;
  count: number;
}

interface ContributionGraphProps {
  data: CommitDay[];
}

export function ContributionGraph({ data }: ContributionGraphProps) {
  const { theme } = useTheme();
  
  const renderCell = (day: CommitDay) => {
    const intensity = day.count;
    
    // Different color schemes for dark/light mode
    let bgColor = theme === 'dark' ? '#0d1117' : '#ebedf0'; // Base color
    
    if (theme === 'dark') {
      if (intensity === 1) bgColor = '#0e4429';
      if (intensity === 2) bgColor = '#006d32';
      if (intensity === 3) bgColor = '#26a641';
      if (intensity >= 4) bgColor = '#39d353';
    } else {
      if (intensity === 1) bgColor = '#9be9a8';
      if (intensity === 2) bgColor = '#40c463';
      if (intensity === 3) bgColor = '#30a14e';
      if (intensity >= 4) bgColor = '#216e39';
    }
    
    return (
      <div 
        key={day.date} 
        title={`${day.count} contributions on ${day.date}`}
        className="w-3 h-3 m-0.5 rounded-sm transition-colors hover:ring-1 hover:ring-white/10"
        style={{ backgroundColor: bgColor }}
      />
    );
  };
  
  // Group by week
  const weeks: CommitDay[][] = [];
  let currentWeek: CommitDay[] = [];
  
  data.forEach((day, index) => {
    currentWeek.push(day);
    if (currentWeek.length === 7 || index === data.length - 1) {
      weeks.push(currentWeek);
      currentWeek = [];
    }
  });
  
  return (
    <div className="neon-card p-4">
      <h3 className="text-lg mb-4 text-neon-blue">Contribution Activity</h3>
      <div className="flex flex-wrap">
        {weeks.map((week, i) => (
          <div key={i} className="flex flex-col">
            {week.map(day => renderCell(day))}
          </div>
        ))}
      </div>
    </div>
  );
} 