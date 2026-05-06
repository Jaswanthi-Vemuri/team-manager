import { motion } from 'framer-motion'
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts'
import Card from '../ui/Card'

const data = [
  { name: 'Completed', value: 45, color: 'hsl(142, 71%, 45%)' },
  { name: 'In Progress', value: 30, color: 'hsl(217, 91%, 60%)' },
  { name: 'Pending', value: 15, color: 'hsl(38, 92%, 50%)' },
  { name: 'Overdue', value: 10, color: 'hsl(0, 84%, 60%)' },
]

export default function TaskAnalytics() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <Card>
        <h3 className="text-lg font-semibold text-text-primary mb-6">Task Distribution</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
                paddingAngle={4}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={index} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid hsl(220, 13%, 91%)',
                  borderRadius: '12px',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                }}
              />
              <Legend
                verticalAlign="bottom"
                height={36}
                formatter={(value) => (
                  <span className="text-sm text-text-secondary">{value}</span>
                )}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </motion.div>
  )
}
