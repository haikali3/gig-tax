import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Calendar, Download, FileText, Info } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { Typography } from '@/components/typography'

const Reports = () => {
  const { toast } = useToast()
  const [reportType, setReportType] = useState('quarterly')
  const [selectedYear, setSelectedYear] = useState('2025')
  const [selectedQuarter, setSelectedQuarter] = useState('Q2')

  // Mock data for expense summary
  const categoryTotals = [
    { category: 'Office Supplies', amount: 450.75 },
    { category: 'Travel', amount: 1230.5 },
    { category: 'Meals', amount: 375.25 },
    { category: 'Software', amount: 560.0 },
    { category: 'Other', amount: 290.5 },
  ]

  const totalExpenses = categoryTotals.reduce(
    (acc, curr) => acc + curr.amount,
    0,
  )

  // Mock Schedule C data
  const scheduleC = [
    { label: 'Advertising', amount: 150.5 },
    { label: 'Car and truck expenses', amount: 320.75 },
    { label: 'Commissions and fees', amount: 0 },
    { label: 'Contract labor', amount: 0 },
    { label: 'Depletion', amount: 0 },
    { label: 'Depreciation', amount: 0 },
    { label: 'Insurance', amount: 250.0 },
    { label: 'Interest', amount: 0 },
    { label: 'Legal and professional services', amount: 0 },
    { label: 'Office expense', amount: 450.75 },
    { label: 'Rent or lease', amount: 0 },
    { label: 'Repairs and maintenance', amount: 0 },
    { label: 'Supplies', amount: 0 },
    { label: 'Taxes and licenses', amount: 180.0 },
    { label: 'Travel, meals, and entertainment', amount: 1605.75 },
    { label: 'Utilities', amount: 0 },
    { label: 'Wages', amount: 0 },
    { label: 'Other expenses', amount: 850.5 },
  ]

  const totalScheduleC = scheduleC.reduce((acc, curr) => acc + curr.amount, 0)

  const handleDownload = () => {
    toast({
      title: 'Report Downloaded',
      description: `Your ${reportType} report for ${selectedQuarter} ${selectedYear} has been downloaded.`,
    })
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
            Reports
          </Typography>
          <Typography
            variant="lead"
            fontClass="satoshi"
            className="mt-1 !text-gray-500"
          >
            Generate and download tax-ready reports
          </Typography>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <Card className="lg:col-span-2">
          <CardHeader>
            <Typography
              variant="h4"
              fontClass="satoshi"
              className="text-lg font-medium text-gray-700"
            >
              Generate Report
            </Typography>
            <Typography variant="muted" fontClass="satoshi">
              Create a tax-ready report of your business expenses
            </Typography>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div>
                <Typography
                  variant="small"
                  fontClass="satoshi"
                  className="font-medium mb-2 block"
                >
                  Report Type
                </Typography>
                <Select value={reportType} onValueChange={setReportType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select report type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="quarterly">Quarterly Summary</SelectItem>
                    <SelectItem value="annual">Annual Summary</SelectItem>
                    <SelectItem value="schedule-c">Schedule C</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Typography
                  variant="small"
                  fontClass="satoshi"
                  className="font-medium mb-2 block"
                >
                  Year
                </Typography>
                <Select value={selectedYear} onValueChange={setSelectedYear}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select year" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="2025">2025</SelectItem>
                    <SelectItem value="2024">2024</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Typography
                  variant="small"
                  fontClass="satoshi"
                  className="font-medium mb-2 block"
                >
                  Period
                </Typography>
                <Select
                  value={selectedQuarter}
                  onValueChange={setSelectedQuarter}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select quarter" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Q1">Q1 (Jan-Mar)</SelectItem>
                    <SelectItem value="Q2">Q2 (Apr-Jun)</SelectItem>
                    <SelectItem value="Q3">Q3 (Jul-Sep)</SelectItem>
                    <SelectItem value="Q4">Q4 (Oct-Dec)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Tabs defaultValue="preview">
              <TabsList>
                <TabsTrigger value="preview">Preview</TabsTrigger>
                <TabsTrigger
                  value="settings"
                  onClick={() =>
                    toast({
                      title: 'Coming Soon!',
                      description:
                        'Report settings will be available in a future update.',
                    })
                  }
                >
                  Report Settings
                </TabsTrigger>
              </TabsList>
              <TabsContent value="preview">
                <div className="mt-4 border rounded-lg p-6">
                  <div className="flex justify-between items-center border-b pb-4 mb-4">
                    <div>
                      <Typography
                        variant="h4"
                        fontClass="satoshi"
                        className=" text-lg"
                      >
                        Expense Summary
                      </Typography>
                      <Typography
                        variant="small"
                        fontClass="satoshi"
                        className="text-gray-500"
                      >
                        {selectedQuarter} {selectedYear}
                      </Typography>
                    </div>
                    <Button variant="outline" onClick={handleDownload}>
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                  </div>

                  {reportType === 'schedule-c' ? (
                    <div className="space-y-4">
                      <Typography
                        variant="h4"
                        fontClass="satoshi"
                        className="font-medium"
                      >
                        Schedule C - Profit or Loss From Business
                      </Typography>

                      <div className="space-y-2">
                        {scheduleC.map((item) => (
                          <div
                            key={item.label}
                            className="flex justify-between py-1 border-b border-gray-100"
                          >
                            <Typography variant="small" fontClass="satoshi">
                              {item.label}
                            </Typography>
                            <Typography
                              variant="small"
                              fontClass="satoshi"
                              className="font-medium"
                            >
                              ${item.amount.toFixed(2)}
                            </Typography>
                          </div>
                        ))}
                      </div>

                      <div className="flex justify-between pt-2">
                        <Typography
                          variant="medium"
                          fontClass="satoshi"
                          className="font-bold"
                        >
                          Total Expenses
                        </Typography>
                        <Typography
                          variant="medium"
                          fontClass="satoshi"
                          className="font-bold"
                        >
                          ${totalScheduleC.toFixed(2)}
                        </Typography>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div>
                        <Typography
                          variant="h4"
                          fontClass="satoshi"
                          className="font-medium mb-2"
                        >
                          Expense Breakdown
                        </Typography>
                        <div className="space-y-2">
                          {categoryTotals.map((item) => (
                            <div
                              key={item.category}
                              className="flex justify-between py-1 border-b border-gray-100"
                            >
                              <Typography variant="small" fontClass="satoshi">
                                {item.category}
                              </Typography>
                              <Typography
                                variant="small"
                                fontClass="satoshi"
                                className="font-medium"
                              >
                                ${item.amount.toFixed(2)}
                              </Typography>
                            </div>
                          ))}
                        </div>

                        <div className="flex justify-between pt-2">
                          <Typography
                            variant="medium"
                            fontClass="satoshi"
                            className="font-bold"
                          >
                            Total Expenses
                          </Typography>
                          <Typography
                            variant="medium"
                            fontClass="satoshi"
                            className="font-bold"
                          >
                            ${totalExpenses.toFixed(2)}
                          </Typography>
                        </div>
                      </div>

                      <div className="bg-brand-50 p-4 rounded-md mt-4">
                        <div className="flex items-start">
                          <Info className="h-5 w-5 text-brand-500 mt-0.5 mr-2 flex-shrink-0" />
                          <div>
                            <Typography
                              variant="h4"
                              fontClass="satoshi"
                              className="font-medium text-brand-700"
                            >
                              Estimated Tax Deduction
                            </Typography>
                            <Typography
                              variant="small"
                              fontClass="satoshi"
                              className="text-brand-600"
                            >
                              Based on your expense categories, approximately $
                              {(totalExpenses * 0.8).toFixed(2)} may be
                              tax-deductible.
                            </Typography>
                            <Typography
                              variant="small"
                              fontClass="satoshi"
                              className="text-brand-600 mt-1"
                            >
                              * This is an estimate. Consult with a tax
                              professional for personalized advice.
                            </Typography>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <Typography
                variant="h4"
                fontClass="satoshi"
                className="text-lg font-medium text-gray-700"
              >
                Available Reports
              </Typography>
              <Typography variant="muted" fontClass="satoshi">
                Common reports for freelancers and self-employed
              </Typography>
            </CardHeader>
            <CardContent className="space-y-4">
              <div
                className="p-3 border rounded-md hover:bg-gray-50 cursor-pointer"
                onClick={handleDownload}
              >
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <FileText className="h-5 w-5 text-brand-400 mr-2" />
                    <div>
                      <Typography variant="medium" fontClass="satoshi">
                        Quarterly Summary
                      </Typography>
                      <Typography
                        variant="small"
                        fontClass="satoshi"
                        className="text-gray-500"
                      >
                        Q2 2025
                      </Typography>
                    </div>
                  </div>
                  <Download className="h-4 w-4 text-gray-500" />
                </div>
              </div>

              <div className="p-3 border rounded-md hover:bg-gray-50 cursor-pointer opacity-50 pointer-events-none">
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <FileText className="h-5 w-5 text-brand-400 mr-2" />
                    <div>
                      <Typography variant="medium" fontClass="satoshi">
                        Schedule C Report
                      </Typography>
                      <Typography
                        variant="small"
                        fontClass="satoshi"
                        className="text-gray-500"
                      >
                        Not available yet
                      </Typography>
                    </div>
                  </div>
                  <Download className="h-4 w-4 text-gray-500" />
                </div>
              </div>

              <div className="p-3 border rounded-md hover:bg-gray-50 cursor-pointer opacity-50 pointer-events-none">
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <FileText className="h-5 w-5 text-brand-400 mr-2" />
                    <div>
                      <Typography variant="medium" fontClass="satoshi">
                        Income & Expenses
                      </Typography>
                      <Typography
                        variant="small"
                        fontClass="satoshi"
                        className="text-gray-500"
                      >
                        Not available yet
                      </Typography>
                    </div>
                  </div>
                  <Download className="h-4 w-4 text-gray-500" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Typography
                variant="h4"
                fontClass="satoshi"
                className="text-lg font-medium text-gray-700"
              >
                Tax Calendar
              </Typography>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-brand-50 rounded-lg">
                <div className="flex items-center">
                  <Calendar className="h-5 w-5 text-brand-500 mr-2" />
                  <div>
                    <Typography
                      variant="medium"
                      fontClass="satoshi"
                      className="text-brand-700"
                    >
                      Q2 Payment Due
                    </Typography>
                    <Typography
                      variant="small"
                      fontClass="satoshi"
                      className="text-brand-500"
                    >
                      Quarterly Estimated Tax
                    </Typography>
                  </div>
                </div>
                <Typography variant="medium" fontClass="satoshi">
                  Jun 15, 2025
                </Typography>
              </div>
              <div className="flex justify-between items-center p-3 rounded-lg">
                <div className="flex items-center">
                  <Calendar className="h-5 w-5 text-gray-400 mr-2" />
                  <div>
                    <Typography variant="medium" fontClass="satoshi">
                      Q3 Payment Due
                    </Typography>
                    <Typography
                      variant="small"
                      fontClass="satoshi"
                      className="text-gray-500"
                    >
                      Quarterly Estimated Tax
                    </Typography>
                  </div>
                </div>
                <Typography variant="medium" fontClass="satoshi">
                  Sep 15, 2025
                </Typography>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Typography
                variant="h4"
                fontClass="satoshi"
                className="text-lg font-medium text-gray-700"
              >
                Common Questions
              </Typography>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>
                    <Typography variant="medium" fontClass="satoshi">
                      What tax forms do freelancers need?
                    </Typography>
                  </AccordionTrigger>
                  <AccordionContent>
                    <Typography variant="small" fontClass="satoshi">
                      Freelancers typically need to file Schedule C (Profit or
                      Loss from Business) along with their Form 1040. They may
                      also need Schedule SE for self-employment tax. Quarterly
                      estimated tax payments should be made using Form 1040-ES.
                    </Typography>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger>
                    <Typography variant="medium" fontClass="satoshi">
                      How are quarterly taxes calculated?
                    </Typography>
                  </AccordionTrigger>
                  <AccordionContent>
                    <Typography variant="small" fontClass="satoshi">
                      Quarterly taxes are typically calculated based on your
                      expected annual income, minus deductions, multiplied by
                      your tax rate. The IRS expects you to pay at least 90% of
                      your tax liability through quarterly payments to avoid
                      penalties.
                    </Typography>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger>
                    <Typography variant="medium" fontClass="satoshi">
                      What expenses are tax deductible?
                    </Typography>
                  </AccordionTrigger>
                  <AccordionContent>
                    <Typography variant="small" fontClass="satoshi">
                      Business expenses that are ordinary and necessary for your
                      freelance work are typically deductible. This may include
                      home office, internet, equipment, software, travel, and
                      professional development. Always consult a tax
                      professional for your specific situation.
                    </Typography>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
            <CardFooter>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Typography
                      variant="small"
                      fontClass="satoshi"
                      className="text-gray-500 italic"
                    >
                      * This information is not tax advice. Consult a
                      professional for your specific situation.
                    </Typography>
                  </TooltipTrigger>
                  <TooltipContent>
                    <Typography
                      variant="small"
                      fontClass="satoshi"
                      className="w-80"
                    >
                      The information provided is general in nature and may not
                      apply to your specific circumstances. Always consult with
                      a qualified tax professional before making tax decisions.
                    </Typography>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default Reports
