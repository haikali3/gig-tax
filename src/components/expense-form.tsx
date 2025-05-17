import { Button } from '@/components/ui/button'
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
import { Calendar as CalendarIcon, Loader2 } from 'lucide-react'
import { Calendar } from '@/components/ui/calendar'
import { format } from 'date-fns'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import type { FormData } from '@/types/expense'
import { CATEGORY_OPTIONS } from '@/types/expense'
import { cn } from '@/lib/utils'

interface ExpenseFormProps {
  formData: FormData
  setFormData: (data: FormData) => void
  date: Date | undefined
  setDate: (date: Date | undefined) => void
  onSubmit: (e: React.FormEvent) => void
  onCancel: () => void
  isProcessing?: boolean
}

export const ExpenseForm = ({
  formData,
  setFormData,
  date,
  setDate,
  onSubmit,
  onCancel,
  isProcessing = false,
}: ExpenseFormProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Expense Details</CardTitle>
        <CardDescription>
          Enter the information about your expense
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={onSubmit} className="space-y-6">
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="date">Date</Label>
                <div className="relative">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          'w-full justify-start text-left font-normal',
                          isProcessing && 'opacity-50 cursor-not-allowed',
                        )}
                        disabled={isProcessing}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, 'PPP') : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        initialFocus
                        disabled={isProcessing}
                        className={cn(isProcessing && 'opacity-50')}
                      />
                    </PopoverContent>
                  </Popover>
                  {isProcessing && (
                    <div className="absolute inset-0 flex items-center justify-center bg-white/50">
                      <Loader2 className="h-4 w-4 animate-spin text-brand-500" />
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="amount">Amount ($)</Label>
                <div className="relative">
                  <Input
                    id="amount"
                    placeholder="0.00"
                    type="number"
                    step="0.01"
                    required
                    value={formData.amount}
                    onChange={(e) =>
                      setFormData({ ...formData, amount: e.target.value })
                    }
                    disabled={isProcessing}
                    className={cn(isProcessing && 'opacity-50')}
                  />
                  {isProcessing && (
                    <div className="absolute inset-0 flex items-center justify-center bg-white/50">
                      <Loader2 className="h-4 w-4 animate-spin text-brand-500" />
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="merchant">Merchant/Vendor</Label>
              <div className="relative">
                <Input
                  id="merchant"
                  placeholder="Enter merchant name"
                  required
                  value={formData.merchant}
                  onChange={(e) =>
                    setFormData({ ...formData, merchant: e.target.value })
                  }
                  disabled={isProcessing}
                  className={cn(isProcessing && 'opacity-50')}
                />
                {isProcessing && (
                  <div className="absolute inset-0 flex items-center justify-center bg-white/50">
                    <Loader2 className="h-4 w-4 animate-spin text-brand-500" />
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <div className="relative">
                <Select
                  value={formData.category}
                  onValueChange={(value) =>
                    setFormData({ ...formData, category: value })
                  }
                  disabled={isProcessing}
                >
                  <SelectTrigger className={cn(isProcessing && 'opacity-50')}>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {CATEGORY_OPTIONS.map((category) => (
                      <SelectItem key={category} value={category.toLowerCase()}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {isProcessing && (
                  <div className="absolute inset-0 flex items-center justify-center bg-white/50">
                    <Loader2 className="h-4 w-4 animate-spin text-brand-500" />
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">Notes (optional)</Label>
              <div className="relative">
                <Textarea
                  id="notes"
                  placeholder="Add any relevant details about this expense"
                  value={formData.notes}
                  onChange={(e) =>
                    setFormData({ ...formData, notes: e.target.value })
                  }
                  disabled={isProcessing}
                  className={cn(isProcessing && 'opacity-50')}
                />
                {isProcessing && (
                  <div className="absolute inset-0 flex items-center justify-center bg-white/50">
                    <Loader2 className="h-4 w-4 animate-spin text-brand-500" />
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-2">
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              disabled={isProcessing}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isProcessing}>
              {isProcessing ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                'Save Expense'
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
