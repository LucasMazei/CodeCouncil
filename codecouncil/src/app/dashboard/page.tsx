'use client';

import { useState } from 'react';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { OverviewChart } from '@/components/ui/overview-chart';
import { LineChartComponent } from '@/components/ui/line-chart';
import { ContributionGraph } from '@/components/ui/contribution-graph';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

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

// Simplified data for bar charts
const barChartData = [
  { name: 'Jan', value: 580 },
  { name: 'Feb', value: 420 },
  { name: 'Mar', value: 650 },
  { name: 'Apr', value: 760 },
  { name: 'May', value: 490 },
  { name: 'Jun', value: 530 },
  { name: 'Jul', value: 470 },
  { name: 'Aug', value: 630 },
  { name: 'Sep', value: 510 },
  { name: 'Oct', value: 680 },
  { name: 'Nov', value: 780 },
  { name: 'Dec', value: 890 },
];

// Mock commit data for GitHub-style contribution graph
const generateCommitData = (): { date: string; count: number }[] => {
  const result: { date: string; count: number }[] = [];
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

// Dashboard component
export default function DashboardPage() {
  const [selectedRepo, setSelectedRepo] = useState('all');
  const [selectedPerson, setSelectedPerson] = useState('all');
  const [dateRange, setDateRange] = useState('last-30-days');
  
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
          <Card>
            <CardHeader>
              <CardTitle>Pull Requests</CardTitle>
              <CardDescription>Open and closed PRs</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">24</div>
              <p className="text-gray-400">Open PRs: 8</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Average PR Size</CardTitle>
              <CardDescription>Lines of code per PR</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">145</div>
              <p className="text-gray-400">Target: 100 lines</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Average Pickup Time</CardTitle>
              <CardDescription>Time to first review</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">12h</div>
              <p className="text-gray-400">Target: 6 hours</p>
            </CardContent>
          </Card>
        </div>
        
        {/* Contribution Graph */}
        <div className="mb-8">
          <ContributionGraph data={commitData} />
        </div>
        
        {/* Charts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Overview</CardTitle>
              <CardDescription>Monthly commit activity</CardDescription>
            </CardHeader>
            <CardContent>
              <OverviewChart data={barChartData} />
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <Tabs defaultValue="pr-size">
                <TabsList>
                  <TabsTrigger value="pr-size">PR Size</TabsTrigger>
                  <TabsTrigger value="pickup-time">Pickup Time</TabsTrigger>
                </TabsList>
              </Tabs>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="pr-size">
                <TabsContent value="pr-size">
                  <LineChartComponent data={prSizeData} xKey="week" yKey="size" />
                </TabsContent>
                <TabsContent value="pickup-time">
                  <LineChartComponent data={pickupTimeData} xKey="week" yKey="time" />
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
} 