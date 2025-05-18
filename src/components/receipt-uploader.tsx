import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Receipt,
  Upload,
  Camera,
  Loader2,
  CheckCircle2,
  XCircle,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { useToast } from '@/hooks/use-toast'
import { Typography } from '@/components/typography'
import { Progress } from '@/components/ui/progress'

interface ReceiptUploaderProps {
  onUpload: (file: File) => void
  isPending: boolean
}

type UploadStatus = 'idle' | 'uploading' | 'processing' | 'success' | 'error'

export const ReceiptUploader = ({
  onUpload,
  isPending,
}: ReceiptUploaderProps) => {
  const [isDragging, setIsDragging] = useState(false)
  const [receipt, setReceipt] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [uploadStatus, setUploadStatus] = useState<UploadStatus>('idle')
  const [uploadProgress, setUploadProgress] = useState(0)
  const { toast } = useToast()

  const createImagePreview = (file: File) => {
    const reader = new FileReader()
    reader.onloadend = () => {
      setImagePreview(reader.result as string)
    }
    reader.readAsDataURL(file)
  }

  const simulateUploadProgress = () => {
    setUploadProgress(0)
    let progress = 0
    const interval = setInterval(() => {
      progress += 5
      if (progress >= 90) {
        clearInterval(interval)
        setUploadProgress(90)
      } else {
        setUploadProgress(progress)
      }
    }, 100)
    return interval
  }

  const handleFileUpload = (file: File) => {
    setReceipt(file)
    createImagePreview(file)
    setUploadStatus('uploading')
    const progressInterval = simulateUploadProgress()

    // Simulate upload completion
    setTimeout(() => {
      clearInterval(progressInterval)
      setUploadProgress(100)
      setUploadStatus('processing')
      onUpload(file)
      toast({
        title: 'Receipt Uploaded',
        description: `File "${file.name}" has been uploaded.`,
      })
    }, 2000) // Increased to 2 seconds to show progress
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(false)

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileUpload(e.dataTransfer.files[0])
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFileUpload(e.target.files[0])
    }
  }

  const getStatusIcon = () => {
    switch (uploadStatus) {
      case 'uploading':
        return <Loader2 className="h-5 w-5 animate-spin text-brand-500" />
      case 'processing':
        return <Loader2 className="h-5 w-5 animate-spin text-brand-500" />
      case 'success':
        return <CheckCircle2 className="h-5 w-5 text-green-500" />
      case 'error':
        return <XCircle className="h-5 w-5 text-red-500" />
      default:
        return null
    }
  }

  const getStatusText = () => {
    if (!isPending && uploadStatus === 'processing') {
      setUploadStatus('success')
    }

    switch (uploadStatus) {
      case 'uploading':
        return 'Uploading receipt...'
      case 'processing':
        return 'Processing receipt...'
      case 'success':
        return 'Receipt processed successfully'
      case 'error':
        return 'Error processing receipt'
      default:
        return 'Drop receipt here or click to upload'
    }
  }

  return (
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
                'receipt-drop-area border-2 border-dashed rounded-lg p-8 text-center cursor-pointer hover:bg-gray-50 transition-all duration-200',
                isDragging && 'active border-brand-500 bg-brand-50',
                (uploadStatus === 'uploading' ||
                  uploadStatus === 'processing') &&
                  'opacity-50 cursor-not-allowed',
                uploadStatus === 'success' && 'border-green-500 bg-green-50',
                uploadStatus === 'error' && 'border-red-500 bg-red-50',
              )}
              onDragOver={(e) => {
                e.preventDefault()
                setIsDragging(true)
              }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={handleDrop}
              onClick={() => document.getElementById('receipt-upload')?.click()}
            >
              <input
                type="file"
                id="receipt-upload"
                className="hidden"
                accept="image/*"
                onChange={handleFileChange}
                disabled={
                  uploadStatus === 'uploading' || uploadStatus === 'processing'
                }
              />
              <div className="flex flex-col items-center">
                {imagePreview ? (
                  <div className="relative w-full">
                    <img
                      src={imagePreview}
                      alt="Receipt preview"
                      className="w-full h-48 object-contain rounded-lg mb-4"
                    />
                    {(uploadStatus === 'uploading' ||
                      uploadStatus === 'processing') && (
                      <div className="absolute inset-0 bg-black/10 rounded-lg flex items-center justify-center">
                        <div className="bg-white p-4 rounded-lg shadow-lg">
                          <div className="flex items-center gap-2 mb-2">
                            {getStatusIcon()}
                            <span className="text-sm font-medium">
                              {getStatusText()}
                            </span>
                          </div>
                          <Progress
                            value={uploadProgress}
                            className="w-[200px]"
                          />
                        </div>
                      </div>
                    )}
                    {uploadStatus !== 'uploading' &&
                      uploadStatus !== 'processing' && (
                        <Button
                          variant="destructive"
                          size="sm"
                          className="absolute top-2 right-2"
                          onClick={(e) => {
                            e.stopPropagation()
                            setImagePreview(null)
                            setReceipt(null)
                            setUploadStatus('idle')
                            setUploadProgress(0)
                          }}
                        >
                          Remove
                        </Button>
                      )}
                  </div>
                ) : (
                  <>
                    <Receipt className="h-10 w-10 text-gray-400 mb-2" />
                    <Typography variant="p" className="font-bold">
                      {getStatusText()}
                    </Typography>
                    <Typography variant="small" className="text-gray-500 mt-1">
                      Supports JPG, PNG, PDF up to 10MB
                    </Typography>
                  </>
                )}
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
              <Typography variant="large" className="font-medium text-gray-500">
                Camera capture coming soon
              </Typography>
              <Typography variant="small" className="text-gray-500 mt-1">
                This feature will let you take pictures of receipts directly
              </Typography>
            </div>
          </TabsContent>
        </Tabs>

        <div className="mt-6">
          <Typography variant="h4" className="font-medium mb-2">
            Tips for better results
          </Typography>
          <ul className="space-y-1">
            <li>
              <Typography
                variant="small"
                fontClass="satoshi"
                className="text-gray-500"
              >
                • Make sure the receipt is on a flat surface
              </Typography>
            </li>
            <li>
              <Typography
                variant="small"
                fontClass="satoshi"
                className="text-gray-500"
              >
                • Ensure all text is visible and readable
              </Typography>
            </li>
            <li>
              <Typography
                variant="small"
                fontClass="satoshi"
                className="text-gray-500"
              >
                • Avoid shadows and glare on the receipt
              </Typography>
            </li>
            <li>
              <Typography
                variant="small"
                fontClass="satoshi"
                className="text-gray-500"
              >
                • Include the total amount and date
              </Typography>
            </li>
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}
