import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Receipt, Upload, Camera } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useToast } from '@/hooks/use-toast'
import { Typography } from '@/components/typography'

interface ReceiptUploaderProps {
  onUpload: (file: File) => void
  isPending: boolean
}

export const ReceiptUploader = ({
  onUpload,
  isPending,
}: ReceiptUploaderProps) => {
  const [isDragging, setIsDragging] = useState(false)
  const [receipt, setReceipt] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const { toast } = useToast()

  const createImagePreview = (file: File) => {
    const reader = new FileReader()
    reader.onloadend = () => {
      setImagePreview(reader.result as string)
    }
    reader.readAsDataURL(file)
  }

  const handleFileUpload = (file: File) => {
    setReceipt(file)
    createImagePreview(file)
    onUpload(file)
    toast({
      title: 'Receipt Uploaded',
      description: `File "${file.name}" has been uploaded.`,
    })
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
                'receipt-drop-area border-2 border-dashed rounded-lg p-8 text-center cursor-pointer hover:bg-gray-50',
                isDragging && 'active',
                isPending && 'opacity-50 cursor-not-allowed',
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
                disabled={isPending}
              />
              <div className="flex flex-col items-center">
                {imagePreview ? (
                  <>
                    <div className="relative w-full">
                      <img
                        src={imagePreview}
                        alt="Receipt preview"
                        className="w-full h-48 object-contain rounded-lg mb-4"
                      />
                    </div>
                    <div className="relative w-full">
                      <Button
                        variant="destructive"
                        size="sm"
                        // className="absolute top-2 right-2"
                        onClick={(e) => {
                          e.stopPropagation()
                          setImagePreview(null)
                          setReceipt(null)
                        }}
                      >
                        Remove
                      </Button>
                    </div>
                  </>
                ) : (
                  <>
                    <Receipt className="h-10 w-10 text-gray-400 mb-2" />
                    <Typography variant="p" className="font-bold">
                      {isPending
                        ? 'Processing receipt...'
                        : receipt
                          ? receipt.name
                          : 'Drop receipt here or click to upload'}
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
          <ul className="text-sm text-gray-500 space-y-1">
            <li>• Make sure the receipt is on a flat surface</li>
            <li>• Ensure all text is visible and readable</li>
            <li>• Avoid shadows and glare on the receipt</li>
            <li>• Include the total amount and date</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}
