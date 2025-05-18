import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import {
  Filter,
  Search,
  Upload,
  ArrowUpDown,
  Edit,
  Trash,
  Download,
} from 'lucide-react'
import { Link } from '@tanstack/react-router'
import { useToast } from '@/hooks/use-toast'
import { Typography } from '@/components/typography'

// Mock data
const expenses = [
  {
    id: '0',
    date: '2021-12-06',
    merchant: 'food panda',
    category: 'Meals',
    amount: 86.99,
    status: 'Processed',
  },
  {
    id: '1',
    date: '2025-05-15',
    merchant: 'Adobe Creative Cloud',
    category: 'Software',
    amount: 52.99,
    status: 'Processed',
  },
  {
    id: '2',
    date: '2025-05-14',
    merchant: 'Uber',
    category: 'Travel',
    amount: 24.5,
    status: 'Processed',
  },
  {
    id: '3',
    date: '2025-05-12',
    merchant: 'Office Depot',
    category: 'Office Supplies',
    amount: 87.35,
    status: 'Processed',
  },
  {
    id: '4',
    date: '2025-05-10',
    merchant: 'Starbucks',
    category: 'Meals',
    amount: 12.85,
    status: 'Needs Review',
  },
  {
    id: '5',
    date: '2025-05-08',
    merchant: 'AWS',
    category: 'Software',
    amount: 156.7,
    status: 'Processed',
  },
  {
    id: '6',
    date: '2025-05-05',
    merchant: 'Home Depot',
    category: '',
    amount: 95.2,
    status: 'Uncategorized',
  },
  {
    id: '7',
    date: '2025-05-03',
    merchant: 'Delta Airlines',
    category: 'Travel',
    amount: 450.0,
    status: 'Needs Review',
  },
  {
    id: '8',
    date: '2025-05-01',
    merchant: 'WeWork',
    category: 'Rent',
    amount: 350.0,
    status: 'Processed',
  },
]

const Expenses = () => {
  const { toast } = useToast()
  const [view, setView] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState('date')
  const [sortOrder, setSortOrder] = useState('desc')

  // Filter expenses based on view and search term
  const filteredExpenses = expenses
    .filter((expense) => {
      if (view === 'all') return true
      if (view === 'uncategorized') return expense.status === 'Uncategorized'
      if (view === 'needs-review') return expense.status === 'Needs Review'
      return true
    })
    .filter((expense) => {
      if (!searchTerm) return true
      const searchLower = searchTerm.toLowerCase()
      return (
        expense.merchant.toLowerCase().includes(searchLower) ||
        expense.category.toLowerCase().includes(searchLower)
      )
    })

  // Sort expenses
  const sortedExpenses = [...filteredExpenses].sort((a, b) => {
    if (sortBy === 'date') {
      return sortOrder === 'asc'
        ? new Date(a.date).getTime() - new Date(b.date).getTime()
        : new Date(b.date).getTime() - new Date(a.date).getTime()
    }
    if (sortBy === 'amount') {
      return sortOrder === 'asc' ? a.amount - b.amount : b.amount - a.amount
    }
    // Sort by merchant name
    return sortOrder === 'asc'
      ? a.merchant.localeCompare(b.merchant)
      : b.merchant.localeCompare(a.merchant)
  })

  const toggleSort = (column: string) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
    } else {
      setSortBy(column)
      setSortOrder('asc')
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Processed':
        return 'bg-green-100 text-green-800'
      case 'Needs Review':
        return 'bg-yellow-100 text-yellow-800'
      case 'Uncategorized':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const handleDelete = (id: string) => {
    toast({
      title: 'Expense Deleted',
      description: 'The expense has been removed from your records.',
    })
    // In a real app, you would delete from your data source
  }

  return (
    <div className="container mx-auto px-4 py-24">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <Typography
            variant="h1"
            fontClass="instrument-serif"
            className="text-3xl font-bold text-gray-900"
          >
            Expenses
          </Typography>
          <Typography
            variant="lead"
            fontClass="satoshi"
            className="mt-1 !text-gray-500"
          >
            Track and manage your business expenses
          </Typography>
        </div>
        <div className="mt-4 md:mt-0 flex space-x-2">
          <Button
            variant="outline"
            onClick={() => {
              toast({
                title: 'Coming Soon!',
                description:
                  'Export functionality will be available in a future update.',
              })
            }}
          >
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Link to="/expenses/add-expenses">
            <Button>
              <Upload className="h-4 w-4 mr-2" />
              Add Expense
            </Button>
          </Link>
        </div>
      </div>

      <Card className="mb-6">
        <CardHeader className="pb-3">
          <Typography
            variant="h4"
            fontClass="satoshi"
            className="text-lg font-medium text-gray-700"
          >
            Filter & Search
          </Typography>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Search expenses..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex items-center space-x-2">
              <Filter className="h-4 w-4 text-gray-500" />
              <Select
                defaultValue="all"
                onValueChange={(value) => setView(value)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Expenses</SelectItem>
                  <SelectItem value="uncategorized">Uncategorized</SelectItem>
                  <SelectItem value="needs-review">Needs Review</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center space-x-2">
              <Filter className="h-4 w-4 text-gray-500" />
              <Select defaultValue="all">
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="software">Software</SelectItem>
                  <SelectItem value="travel">Travel</SelectItem>
                  <SelectItem value="office">Office Supplies</SelectItem>
                  <SelectItem value="meals">Meals</SelectItem>
                  <SelectItem value="rent">Rent</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center space-x-2">
              <Filter className="h-4 w-4 text-gray-500" />
              <Select defaultValue="recent">
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Time Period" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="recent">Last 30 Days</SelectItem>
                  <SelectItem value="quarter">Current Quarter</SelectItem>
                  <SelectItem value="year">Current Year</SelectItem>
                  <SelectItem value="custom">Custom Range</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="list" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="list">List View</TabsTrigger>
          <TabsTrigger
            value="grid"
            onClick={() =>
              toast({
                title: 'Coming Soon!',
                description: 'Grid view will be available in a future update.',
              })
            }
          >
            Grid View
          </TabsTrigger>
        </TabsList>
        <TabsContent value="list">
          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead
                        className="cursor-pointer hover:bg-gray-50"
                        onClick={() => toggleSort('date')}
                      >
                        <div className="flex items-center">
                          <Typography variant="medium" fontClass="satoshi">
                            Date
                          </Typography>
                          <ArrowUpDown className="ml-2 h-3 w-3" />
                        </div>
                      </TableHead>
                      <TableHead
                        className="cursor-pointer hover:bg-gray-50"
                        onClick={() => toggleSort('merchant')}
                      >
                        <div className="flex items-center">
                          <Typography variant="medium" fontClass="satoshi">
                            Merchant
                          </Typography>
                          <ArrowUpDown className="ml-2 h-3 w-3" />
                        </div>
                      </TableHead>
                      <TableHead>
                        <Typography variant="medium" fontClass="satoshi">
                          Category
                        </Typography>
                      </TableHead>
                      <TableHead
                        className="cursor-pointer hover:bg-gray-50"
                        onClick={() => toggleSort('amount')}
                      >
                        <div className="flex items-center">
                          <Typography variant="medium" fontClass="satoshi">
                            Amount
                          </Typography>
                          <ArrowUpDown className="ml-2 h-3 w-3" />
                        </div>
                      </TableHead>
                      <TableHead>
                        <Typography variant="medium" fontClass="satoshi">
                          Status
                        </Typography>
                      </TableHead>
                      <TableHead className="text-right">
                        <Typography variant="medium" fontClass="satoshi">
                          Actions
                        </Typography>
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {sortedExpenses.map((expense) => (
                      <TableRow key={expense.id}>
                        <TableCell>
                          <Typography variant="medium" fontClass="satoshi">
                            {new Date(expense.date).toLocaleDateString()}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="medium" fontClass="satoshi">
                            {expense.merchant}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          {expense.category ? (
                            <Typography variant="medium" fontClass="satoshi">
                              {expense.category}
                            </Typography>
                          ) : (
                            <Typography
                              variant="small"
                              fontClass="satoshi"
                              className="text-gray-400 italic"
                            >
                              Uncategorized
                            </Typography>
                          )}
                        </TableCell>
                        <TableCell>
                          <Typography variant="medium" fontClass="satoshi">
                            ${expense.amount.toFixed(2)}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(expense.status)}>
                            {expense.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            asChild
                          >
                            <Link to="/expenses">
                              <Edit className="h-4 w-4" />
                              <span className="sr-only">Edit</span>
                            </Link>
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-red-500 hover:text-red-700"
                            onClick={() => handleDelete(expense.id)}
                          >
                            <Trash className="h-4 w-4" />
                            <span className="sr-only">Delete</span>
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                    {sortedExpenses.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center py-6">
                          <Typography variant="muted" fontClass="satoshi">
                            No expenses found
                          </Typography>
                          <Button className="mt-2" asChild>
                            <Link to="/expenses/add-expenses">
                              Add Your First Expense
                            </Link>
                          </Button>
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default Expenses
