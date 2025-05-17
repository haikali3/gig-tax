import { useMutation } from '@tanstack/react-query'
import { useToast } from '@/hooks/use-toast'

interface ReceiptData {
  name: string
  date: string
  description: string
  total_amount: number
  item: string
  raw_response: {
    name: string
    date_of_transaction: string
    description: string
    item: string
    total_amount: string
  }
  product: string | null
  category: string | null
}

interface FileUploadResponse {
  // Add response type based on your API response
  success: boolean
  data?: ReceiptData
  error?: string
}

// Supported file types
const SUPPORTED_FILE_TYPES = [
  'image/jpeg',
  'image/png',
  'image/jpg',
  'application/pdf'
]

// Maximum file size (10MB)
const MAX_FILE_SIZE = 10 * 1024 * 1024

export const useFileUpload = () => {
  const { toast } = useToast()

  const validateFile = (file: File) => {
    console.log('Validating file:', {
      name: file.name,
      type: file.type,
      size: file.size,
      lastModified: new Date(file.lastModified).toISOString()
    })

    if (!SUPPORTED_FILE_TYPES.includes(file.type)) {
      throw new Error(`Unsupported file type. Please upload a JPG, PNG, or PDF file.`)
    }

    if (file.size > MAX_FILE_SIZE) {
      throw new Error(`File size too large. Maximum size is 10MB.`)
    }
  }

  return useMutation({
    mutationFn: async (file: File): Promise<FileUploadResponse> => {
      console.log('Starting file upload:', {
        fileName: file.name,
        fileSize: file.size,
        fileType: file.type,
      })

      // Validate file before upload
      validateFile(file)
      
      // Convert file to ArrayBuffer
      const arrayBuffer = await file.arrayBuffer()
      
      console.log('Sending request to:', 'http://47.250.119.191/extract')
      
      const response = await fetch('http://47.250.119.191/extract', {
        method: 'POST',
        headers: {
          'Content-Type': file.type,
          'Accept': 'application/json',
        },
        body: arrayBuffer,
      })
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => null)
        console.error('Upload failed:', {
          status: response.status,
          statusText: response.statusText,
          errorData,
          headers: Object.fromEntries(response.headers.entries()),
        })
        
        // Handle specific error cases
        if (errorData?.error?.code === 'InvalidParameter.DataInspection') {
          toast({
            title: 'Unsupported File Format',
            description: 'The file format is not supported. Please upload a JPG, PNG, or PDF file.',
            variant: 'destructive',
          })
          throw new Error('The file format is not supported. Please upload a JPG, PNG, or PDF file.')
        }
        
        toast({
          title: 'Upload Failed',
          description: 'Upload failed. Please try again.',
          variant: 'destructive',
        })
        throw new Error('Upload failed. Please try again.')
      }
      
      const data = await response.json()
      console.log('Upload successful, response data:', data)
      return data
    },
    onSuccess: (data) => {
      console.log('Mutation successful:', data)
      toast({
        title: 'Receipt Processed',
        description: 'Your receipt has been successfully processed.',
      })
      return data
    },
    onError: (error: Error) => {
      console.error('Mutation error:', error)
      toast({
        title: 'Upload Failed',
        description: error.message || 'Failed to process the receipt. Please try again.',
        variant: 'destructive',
      })
      throw error
    },
  })
} 