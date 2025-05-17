import { useState } from 'react'
import { useNavigate } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import { useFileUpload } from '@/hooks/queries/use-file-upload'
import { ArrowLeft } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'
import { Typography } from '@/components/typography'
import type { FormData } from '@/types/expense'
import { ExpenseForm } from '@/components/expense-form'
import { ReceiptUploader } from '@/components/receipt-uploader'

const AddExpense = () => {
  const navigate = useNavigate()
  const { toast } = useToast()
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [formData, setFormData] = useState<FormData>({
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

  const handleFileUpload = (file: File) => {
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

          setFormData({
            merchant: data.name || '',
            amount: data.total_amount?.toString() || '',
            category: data.category || '',
            notes: data.description || '',
          })

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
  }

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
          <ExpenseForm
            formData={formData}
            setFormData={setFormData}
            date={date}
            setDate={setDate}
            onSubmit={handleSubmit}
            onCancel={() => navigate({ to: '/expenses' })}
          />
        </div>

        <div>
          <ReceiptUploader onUpload={handleFileUpload} isPending={isPending} />
        </div>
      </div>
    </div>
  )
}

export default AddExpense
