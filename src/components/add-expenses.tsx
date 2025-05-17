import { useState } from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { ArrowRight, Upload, Calendar, Download } from 'lucide-react'
import { Link } from '@tanstack/react-router'
import { useToast } from '@/hooks/use-toast'

// Mock data for visualization
const expensesByCategory = [
  { category: 'Office Supplies', amount: 450.75, color: 'bg-brand-400' },
  { category: 'Travel', amount: 1230.5, color: 'bg-blue-400' },
  { category: 'Meals', amount: 375.25, color: 'bg-green-400' },
  { category: 'Software', amount: 560.0, color: 'bg-yellow-400' },
  { category: 'Other', amount: 290.5, color: 'bg-red-400' },
]

const recentExpenses = [
  {
    id: '1',
    date: '2025-05-15',
    merchant: 'Adobe',
    category: 'Software',
    amount: 52.99,
  },
  {
    id: '2',
    date: '2025-05-14',
    merchant: 'Uber',
    category: 'Travel',
    amount: 24.5,
  },
  {
    id: '3',
    date: '2025-05-12',
    merchant: 'Office Depot',
    category: 'Office Supplies',
    amount: 87.35,
  },
]

const Dashboard = () => {
  const { toast } = useToast()
  const [period, setPeriod] = useState('quarter')

  const totalExpenses = expensesByCategory.reduce(
    (acc, curr) => acc + curr.amount,
    0,
  )

  // Calculate percentage for visualization
  const getPercentage = (amount: number) => {
    return (amount / totalExpenses) * 100
  }

  return (
    <div className="container mx-auto px-4 py-24">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-500 mt-1">
            Track and manage your freelance expenses
          </p>
        </div>
        <div className="mt-4 md:mt-0 space-x-2">
          <Button
            onClick={() => {
              toast({
                title: 'Coming Soon!',
                description:
                  'This feature will be available in a future update.',
              })
            }}
            className="bg-white hover:bg-gray-50 text-gray-800 border border-gray-300"
          >
            <Calendar className="h-4 w-4 mr-2" />
            May 2025
          </Button>
          <Link to="/expenses/add">
            <Button>
              <Upload className="h-4 w-4 mr-2" />
              Add Expense
            </Button>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium text-gray-700">
              Total Expenses
            </CardTitle>
            <CardDescription>Current quarter</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              ${totalExpenses.toFixed(2)}
            </div>
          </CardContent>
          <CardFooter className="pt-0 text-sm text-muted-foreground">
            +12% from last quarter
          </CardFooter>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium text-gray-700">
              Potential Deductions
            </CardTitle>
            <CardDescription>Based on categorized expenses</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              ${(totalExpenses * 0.8).toFixed(2)}
            </div>
          </CardContent>
          <CardFooter className="pt-0 text-sm text-muted-foreground">
            Approximately 80% of tracked expenses
          </CardFooter>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium text-gray-700">
              Uncategorized
            </CardTitle>
            <CardDescription>Expenses needing review</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">2 Items</div>
          </CardContent>
          <CardFooter className="pt-0">
            <Link
              to="/expenses?filter=uncategorized"
              className="text-brand-500 hover:text-brand-600 text-sm flex items-center"
            >
              Review now <ArrowRight className="h-3 w-3 ml-1" />
            </Link>
          </CardFooter>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Expense Breakdown</CardTitle>
              <Tabs
                defaultValue="quarter"
                value={period}
                onValueChange={setPeriod}
                className="w-[300px]"
              >
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="month">Month</TabsTrigger>
                  <TabsTrigger value="quarter">Quarter</TabsTrigger>
                  <TabsTrigger value="year">Year</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {expensesByCategory.map((expense) => (
                <div key={expense.category} className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span>{expense.category}</span>
                    <span className="font-medium">
                      ${expense.amount.toFixed(2)}
                    </span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2.5">
                    <div
                      className={`${expense.color} h-2.5 rounded-full`}
                      style={{
                        width: `${getPercentage(expense.amount)}%`,
                      }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t border-gray-100">
              <div className="flex justify-between text-sm font-semibold">
                <span>Total</span>
                <span>${totalExpenses.toFixed(2)}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Expenses</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentExpenses.map((expense) => (
              <div
                key={expense.id}
                className="flex justify-between items-center p-3 rounded-lg hover:bg-gray-50"
              >
                <div>
                  <p className="font-medium">{expense.merchant}</p>
                  <p className="text-xs text-gray-500">
                    {new Date(expense.date).toLocaleDateString()} Â·{' '}
                    {expense.category}
                  </p>
                </div>
                <div className="font-medium">${expense.amount.toFixed(2)}</div>
              </div>
            ))}
            <Button variant="outline" className="w-full mt-2" asChild>
              <Link to="/expenses">View All Expenses</Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button
              variant="outline"
              className="w-full justify-start"
              onClick={() => {
                toast({
                  title: 'Coming Soon!',
                  description:
                    'This feature will be available in a future update.',
                })
              }}
            >
              <Upload className="mr-2 h-4 w-4" /> Scan Receipt
            </Button>
            <Button
              variant="outline"
              className="w-full justify-start"
              onClick={() => {
                toast({
                  title: 'Coming Soon!',
                  description:
                    'This feature will be available in a future update.',
                })
              }}
            >
              <Download className="mr-2 h-4 w-4" /> Export Quarterly Report
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Tax Calendar</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between items-center p-3 bg-brand-50 rounded-lg">
              <div>
                <p className="font-medium text-brand-700">
                  Quarterly Estimated Tax
                </p>
                <p className="text-xs text-brand-500">Q2 Payment Due</p>
              </div>
              <div className="font-medium">Jun 15, 2025</div>
            </div>
            <div className="flex justify-between items-center p-3 rounded-lg">
              <div>
                <p className="font-medium">Q3 Payment Due</p>
                <p className="text-xs text-gray-500">Estimated Tax</p>
              </div>
              <div className="font-medium">Sep 15, 2025</div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default Dashboard
