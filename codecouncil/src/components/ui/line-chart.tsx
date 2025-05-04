import { Line, LineChart, ResponsiveContainer, CartesianGrid, XAxis, YAxis, Tooltip } from "recharts"
import { useTheme } from "@/context/ThemeContext"

interface DataPoint {
  [key: string]: string | number;
}

interface LineChartProps {
  data: DataPoint[];
  xKey: string;
  yKey: string;
}

export function LineChartComponent({ data, xKey, yKey }: LineChartProps) {
  const { theme } = useTheme();
  
  // Chart colors based on theme
  const chartGridColor = theme === 'dark' ? '#333' : '#ddd';
  const chartTextColor = theme === 'dark' ? '#888888' : '#666';
  const chartTooltipBg = theme === 'dark' ? '#111' : '#fff';
  const chartTooltipBorder = theme === 'dark' ? '#333' : '#ccc';
  const chartLineColor = 'oklch(.623 .214 259.815)';
  
  return (
    <ResponsiveContainer width="100%" height={350}>
      <LineChart
        data={data}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 20,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke={chartGridColor} />
        <XAxis 
          dataKey={xKey} 
          stroke={chartTextColor} 
          fontSize={12} 
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke={chartTextColor}
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <Tooltip
          contentStyle={{ 
            backgroundColor: chartTooltipBg, 
            borderColor: chartTooltipBorder,
            borderRadius: '8px',
            fontSize: '12px'
          }}
          labelStyle={{ color: chartTextColor }}
        />
        <Line
          type="monotone"
          dataKey={yKey}
          stroke={chartLineColor}
          strokeWidth={2}
          dot={{ r: 4, fill: chartLineColor }}
          activeDot={{ r: 6, fill: chartLineColor }}
        />
      </LineChart>
    </ResponsiveContainer>
  )
} 