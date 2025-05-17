import { useMutation } from '@tanstack/react-query'
import { useToast } from '@/hooks/use-toast'

interface FileUploadResponse {
  // Add response type based on your API response
  success: boolean
  data?: any
  error?: string
}

export const useFileUpload = () => {
  const { toast } = useToast()

  return useMutation({
    mutationFn: async (file: File): Promise<FileUploadResponse> => {
      console.log('Starting file upload:', {
        fileName: file.name,
        fileSize: file.size,
        fileType: file.type,
      })

      const formData = new FormData()
      formData.append('file', file)
      
      console.log('Sending request to:', 'http://47.250.119.191/extract')
      
      const response = await fetch('http://47.250.119.191/extract', {
        method: 'POST',
        body: formData,
      })
      
      if (!response.ok) {
        console.error('Upload failed:', {
          status: response.status,
          statusText: response.statusText,
        })
        throw new Error('Upload failed')
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
    onError: (error) => {
      console.error('Mutation error:', error)
      toast({
        title: 'Upload Failed',
        description: 'Failed to process the receipt. Please try again.',
        variant: 'destructive',
      })
      throw error
    },
  })
} 