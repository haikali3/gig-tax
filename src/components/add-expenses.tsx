import { useState } from 'react'
import { useNavigate } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import { useFileUpload } from '@/hooks/queries/use-file-upload'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Calendar as CalendarIcon,
  Receipt,
  ArrowLeft,
  Upload,
  Camera,
} from 'lucide-react'
import { Calendar } from '@/components/ui/calendar'
import { format } from 'date-fns'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { cn } from '@/lib/utils'
import { useToast } from '@/hooks/use-toast'
import { Typography } from '@/components/typography'

const AddExpense = () => {
  const navigate = useNavigate()
  const { toast } = useToast()
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [isDragging, setIsDragging] = useState(false)
  const [receipt, setReceipt] = useState<File | null>(null)
  const [formData, setFormData] = useState({
    merchant: '',
    amount: '',
    category: '',
    notes: '',
  })

  const { mutate: uploadFile, isPending } = useFileUpload()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    toast({
      title: 'Expense Added',
      description: 'Your expense has been successfully recorded.',
    })
    navigate({ to: '/expenses' })
  }

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(false)

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0]
      setReceipt(file)
      uploadFile(file, {
        onSuccess: (response) => {
          console.log('Full upload response:', response)
          const data = response.data
          console.log('Response data:', data)

          if (data) {
            console.log('Setting form data with:', {
              merchant: data.name,
              amount: data.total_amount,
              category: data.category,
              notes: data.description,
            })

            // Update form with receipt data
            setFormData((prev) => {
              const newData = {
                ...prev,
                merchant: data.name || '',
                amount: data.total_amount?.toString() || '',
                category: data.category || '',
                notes: data.description || '',
              }
              console.log('New form data:', newData)
              return newData
            })

            // Update date if available
            if (data.date) {
              const [year, month, day] = data.date.match(/.{1,2}/g) || []
              if (year && month && day) {
                setDate(
                  new Date(
                    2000 + parseInt(year),
                    parseInt(month) - 1,
                    parseInt(day),
                  ),
                )
              }
            }

            toast({
              title: 'Receipt Processed',
              description: 'Form has been populated with receipt data.',
            })
          } else {
            console.log('No data in response')
          }
        },
      })
      toast({
        title: 'Receipt Uploaded',
        description: `File "${file.name}" has been uploaded.`,
      })
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0]
      setReceipt(file)
      uploadFile(file, {
        onSuccess: (response) => {
          console.log('Full upload response:', response)
          const data = response.data
          console.log('Response data:', data)

          if (data) {
            console.log('Setting form data with:', {
              merchant: data.name,
              amount: data.total_amount,
              category: data.category,
              notes: data.description,
            })

            // Update form with receipt data
            setFormData((prev) => {
              const newData = {
                ...prev,
                merchant: data.name || '',
                amount: data.total_amount?.toString() || '',
                category: data.category || '',
                notes: data.description || '',
              }
              console.log('New form data:', newData)
              return newData
            })

            // Update date if available
            if (data.date) {
              const [year, month, day] = data.date.match(/.{1,2}/g) || []
              if (year && month && day) {
                setDate(
                  new Date(
                    2000 + parseInt(year),
                    parseInt(month) - 1,
                    parseInt(day),
                  ),
                )
              }
            }

            toast({
              title: 'Receipt Processed',
              description: 'Form has been populated with receipt data.',
            })
          } else {
            console.log('No data in response')
          }
        },
      })
      toast({
        title: 'Receipt Uploaded',
        description: `File "${file.name}" has been uploaded.`,
      })
    }
  }

  const categoryOptions = [
    'Advertising',
    'Car & Truck Expenses',
    'Commissions & Fees',
    'Contract Labor',
    'Home Office',
    'Insurance',
    'Meals',
    'Office Supplies',
    'Professional Services',
    'Rent',
    'Software & Subscriptions',
    'Travel',
    'Utilities',
    'Other',
  ]

  return (
    <div className="container mx-auto px-4 py-24">
      <Button
        variant="ghost"
        onClick={() => navigate({ to: '/expenses' })}
        className="mb-6"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Expenses
      </Button>

      <div className="mb-8">
        <Typography variant="h1" className="text-3xl font-bold text-gray-900">
          Add Expense
        </Typography>
        <Typography variant="p" className="text-gray-500 mt-1">
          Record a new business expense
        </Typography>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Expense Details</CardTitle>
              <CardDescription>
                Enter the information about your expense
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="date">Date</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className="w-full justify-start text-left font-normal"
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {date ? (
                              format(date, 'PPP')
                            ) : (
                              <span>Pick a date</span>
                            )}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={date}
                            onSelect={setDate}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="amount">Amount ($)</Label>
                      <Input
                        id="amount"
                        placeholder="0.00"
                        type="number"
                        step="0.01"
                        required
                        value={formData.amount}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            amount: e.target.value,
                          }))
                        }
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="merchant">Merchant/Vendor</Label>
                    <Input
                      id="merchant"
                      placeholder="Enter merchant name"
                      required
                      value={formData.merchant}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          merchant: e.target.value,
                        }))
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Select
                      value={formData.category}
                      onValueChange={(value) =>
                        setFormData((prev) => ({ ...prev, category: value }))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categoryOptions.map((category) => (
                          <SelectItem
                            key={category}
                            value={category.toLowerCase()}
                          >
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="notes">Notes (optional)</Label>
                    <Textarea
                      id="notes"
                      placeholder="Add any relevant details about this expense"
                      value={formData.notes}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          notes: e.target.value,
                        }))
                      }
                    />
                  </div>
                </div>

                <div className="flex justify-end space-x-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => navigate({ to: '/expenses' })}
                  >
                    Cancel
                  </Button>
                  <Button type="submit">Save Expense</Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <Typography variant="h3" className="font-medium mb-2">
                Attach Receipt
              </Typography>
              <Typography variant="p" className="text-gray-500">
                Upload a photo of your receipt for your records
              </Typography>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="upload">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="upload">Upload</TabsTrigger>
                  <TabsTrigger
                    value="camera"
                    onClick={() =>
                      toast({
                        title: 'Coming Soon!',
                        description:
                          'Camera capture will be available in a future update.',
                      })
                    }
                  >
                    Camera
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="upload" className="space-y-4">
                  <div
                    className={cn(
                      'receipt-drop-area border-2 border-dashed rounded-lg p-8 text-center cursor-pointer hover:bg-gray-50',
                      isDragging && 'active',
                      isPending && 'opacity-50 cursor-not-allowed',
                    )}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    onClick={() =>
                      document.getElementById('receipt-upload')?.click()
                    }
                  >
                    <input
                      type="file"
                      id="receipt-upload"
                      className="hidden"
                      accept="image/*"
                      onChange={handleFileChange}
                      disabled={isPending}
                    />
                    <div className="flex flex-col items-center">
                      <Receipt className="h-10 w-10 text-gray-400 mb-2" />
                      <Typography variant="p" className="font-bold">
                        {isPending
                          ? 'Processing receipt...'
                          : receipt
                            ? receipt.name
                            : 'Drop receipt here or click to upload'}
                      </Typography>
                      <Typography
                        variant="small"
                        className="text-gray-500 mt-1"
                      >
                        Supports JPG, PNG, PDF up to 10MB
                      </Typography>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center">
                      <Upload className="h-4 w-4 mr-1" />
                      Drag and drop or click to upload
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="camera">
                  <div className="flex flex-col items-center justify-center h-56 border rounded-lg bg-gray-50 text-center p-4">
                    <Camera className="h-10 w-10 text-gray-400 mb-2" />
                    <Typography
                      variant="large"
                      className="font-medium text-gray-500"
                    >
                      Camera capture coming soon
                    </Typography>
                    <Typography variant="small" className="text-gray-500 mt-1">
                      This feature will let you take pictures of receipts
                      directly
                    </Typography>
                  </div>
                </TabsContent>
              </Tabs>

              <div className="mt-6">
                <Typography variant="h4" className="font-medium mb-2">
                  Tips for better results
                </Typography>
                <ul className="text-sm text-gray-500 space-y-1">
                  <li>• Make sure the receipt is on a flat surface</li>
                  <li>• Ensure all text is visible and readable</li>
                  <li>• Avoid shadows and glare on the receipt</li>
                  <li>• Include the total amount and date</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default AddExpense
