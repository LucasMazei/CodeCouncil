'use client';

import { useState } from 'react';
import { 
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, 
  Tooltip, Legend, ResponsiveContainer, ReferenceLine 
} from 'recharts';
import { useTheme } from '@/context/ThemeContext';

// Mock data for graphs
const prSizeData = [
  { week: 'Week 1', size: 120, average: 150, target: 100 },
  { week: 'Week 2', size: 180, average: 150, target: 100 },
  { week: 'Week 3', size: 90, average: 150, target: 100 },
  { week: 'Week 4', size: 210, average: 150, target: 100 },
  { week: 'Week 5', size: 140, average: 150, target: 100 },
  { week: 'Week 6', size: 130, average: 150, target: 100 },
];

const pickupTimeData = [
  { week: 'Week 1', time: 8, average: 12, target: 6 },
  { week: 'Week 2', time: 14, average: 12, target: 6 },
  { week: 'Week 3', time: 10, average: 12, target: 6 },
  { week: 'Week 4', time: 18, average: 12, target: 6 },
  { week: 'Week 5', time: 9, average: 12, target: 6 },
  { week: 'Week 6', time: 13, average: 12, target: 6 },
];

// Define commit data type
interface CommitDay {
  date: string;
  count: number;
}

// Mock commit data for GitHub-style contribution graph
const generateCommitData = (): CommitDay[] => {
  const result: CommitDay[] = [];
  const now = new Date();
  for (let i = 0; i < 365; i++) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    result.push({
      date: date.toISOString().split('T')[0],
      count: Math.floor(Math.random() * 5)
    });
  }
  return result;
};

const commitData = generateCommitData();

// Component for GitHub-style contribution graph
const ContributionGraph = () => {
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
        className="w-3 h-3 m-0.5 rounded-sm" 
        style={{ backgroundColor: bgColor }}
      />
    );
  };
  
  // Group by week
  const weeks: CommitDay[][] = [];
  let currentWeek: CommitDay[] = [];
  
  commitData.forEach((day, index) => {
    currentWeek.push(day);
    if (currentWeek.length === 7 || index === commitData.length - 1) {
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
};

// Dashboard component
export default function DashboardPage() {
  const [selectedRepo, setSelectedRepo] = useState('all');
  const [selectedPerson, setSelectedPerson] = useState('all');
  const [dateRange, setDateRange] = useState('last-30-days');
  const { theme } = useTheme();
  
  // Mock data for dropdowns
  const repositories = [
    { id: 'all', name: 'All Repositories' },
    { id: 'repo1', name: 'Frontend App' },
    { id: 'repo2', name: 'Backend API' },
    { id: 'repo3', name: 'Mobile App' },
  ];
  
  const people = [
    { id: 'all', name: 'All Contributors' },
    { id: 'user1', name: 'Alex Johnson' },
    { id: 'user2', name: 'Sam Chen' },
    { id: 'user3', name: 'Taylor Kim' },
  ];
  
  const dateRanges = [
    { id: 'last-7-days', name: 'Last 7 Days' },
    { id: 'last-30-days', name: 'Last 30 Days' },
    { id: 'last-90-days', name: 'Last Quarter' },
    { id: 'last-365-days', name: 'Last Year' },
  ];
  
  // Chart colors based on theme
  const chartGridColor = theme === 'dark' ? '#333' : '#ddd';
  const chartTextColor = theme === 'dark' ? '#999' : '#666';
  const chartTooltipBg = theme === 'dark' ? '#111' : '#fff';
  const chartTooltipBorder = theme === 'dark' ? '#333' : '#ccc';
  const chartBlueColor = 'oklch(.623 .214 259.815)';

  return (
    <main className="p-8 font-geist">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-neon-blue mb-8">Dashboard</h1>
        
        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="select-group">
            <label className="select-label">Repository</label>
            <select 
              value={selectedRepo}
              onChange={(e) => setSelectedRepo(e.target.value)}
              className="neon-select w-full"
            >
              {repositories.map(repo => (
                <option key={repo.id} value={repo.id}>{repo.name}</option>
              ))}
            </select>
          </div>
          
          <div className="select-group">
            <label className="select-label">Contributor</label>
            <select 
              value={selectedPerson}
              onChange={(e) => setSelectedPerson(e.target.value)}
              className="neon-select w-full"
            >
              {people.map(person => (
                <option key={person.id} value={person.id}>{person.name}</option>
              ))}
            </select>
          </div>
          
          <div className="select-group">
            <label className="select-label">Time Period</label>
            <select 
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="neon-select w-full"
            >
              {dateRanges.map(range => (
                <option key={range.id} value={range.id}>{range.name}</option>
              ))}
            </select>
          </div>
        </div>
        
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="neon-card p-6">
            <h2 className="text-xl font-semibold text-neon-blue mb-4">Pull Requests</h2>
            <p className="text-3xl font-bold">24</p>
            <p className="text-gray-400">Open PRs: 8</p>
          </div>
          
          <div className="neon-card p-6">
            <h2 className="text-xl font-semibold text-neon-blue mb-4">Average PR Size</h2>
            <p className="text-3xl font-bold">145 lines</p>
            <p className="text-gray-400">Target: 100 lines</p>
          </div>
          
          <div className="neon-card p-6">
            <h2 className="text-xl font-semibold text-neon-blue mb-4">Average Pickup Time</h2>
            <p className="text-3xl font-bold">12 hours</p>
            <p className="text-gray-400">Target: 6 hours</p>
          </div>
        </div>
        
        {/* GitHub-style contribution graph */}
        <div className="mb-8">
          <ContributionGraph />
        </div>
        
        {/* PR Size Chart */}
        <div className="neon-card p-6 mb-8">
          <h2 className="text-xl font-semibold text-neon-blue mb-6">PR Size per Week</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={prSizeData}>
                <CartesianGrid strokeDasharray="3 3" stroke={chartGridColor} />
                <XAxis dataKey="week" stroke={chartTextColor} />
                <YAxis stroke={chartTextColor} />
                <Tooltip 
                  contentStyle={{ backgroundColor: chartTooltipBg, borderColor: chartTooltipBorder }}
                  labelStyle={{ color: chartTextColor }}
                />
                <Legend />
                <Bar dataKey="size" fill={chartBlueColor} name="PR Size (lines)" />
                <ReferenceLine y={150} stroke={chartTextColor} strokeDasharray="3 3" label={{ value: 'Average', fill: chartTextColor, position: 'left' }} />
                <ReferenceLine y={100} stroke="#26a641" strokeDasharray="3 3" label={{ value: 'Target', fill: '#26a641', position: 'right' }} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        {/* Pickup Time Chart */}
        <div className="neon-card p-6">
          <h2 className="text-xl font-semibold text-neon-blue mb-6">Pickup Time per Week</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={pickupTimeData}>
                <CartesianGrid strokeDasharray="3 3" stroke={chartGridColor} />
                <XAxis dataKey="week" stroke={chartTextColor} />
                <YAxis stroke={chartTextColor} />
                <Tooltip 
                  contentStyle={{ backgroundColor: chartTooltipBg, borderColor: chartTooltipBorder }}
                  labelStyle={{ color: chartTextColor }}
                />
                <Legend />
                <Line type="monotone" dataKey="time" stroke={chartBlueColor} name="Pickup Time (hours)" />
                <ReferenceLine y={12} stroke={chartTextColor} strokeDasharray="3 3" label={{ value: 'Average', fill: chartTextColor, position: 'left' }} />
                <ReferenceLine y={6} stroke="#26a641" strokeDasharray="3 3" label={{ value: 'Target', fill: '#26a641', position: 'right' }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </main>
  );
} 