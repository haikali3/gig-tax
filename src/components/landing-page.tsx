import { Typography } from './typography'

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-white to-[#f7fafd] relative overflow-hidden">
      {/* Autonomous tax & expense management badge */}
      <div className="absolute top-8 left-1/2 -translate-x-1/2 flex items-center space-x-2 bg-white/80 border border-gray-200 rounded-full px-4 py-1 shadow-sm backdrop-blur z-10">
        <span className="inline-block w-2 h-2 rounded-full bg-green-500 mr-2"></span>
        <span className="text-xs font-medium text-gray-700">
          Autonomous tax & expense management
        </span>
      </div>

      {/* Headline */}
      <div className="flex flex-col items-center justify-center text-center px-4">
        <Typography variant="h1">
          From Receipts to{' '}
          <span className="italic text-gray-500 font-normal">Tax Filing</span>
        </Typography>
        <Typography variant="p">
          Effortlessly track your freelance expenses, organize receipts, and get
          ready for tax season. Stay compliant and maximize your deductions
          without the headache.
        </Typography>
        <div className="flex space-x-4 mb-12">
          <a
            href="#get-started"
            className="px-6 py-3 rounded-lg bg-black text-white font-semibold shadow hover:bg-gray-900 transition"
          >
            Start Tracking Free
          </a>
          <a
            href="#get-demo"
            className="px-6 py-3 rounded-lg bg-white border border-gray-300 text-gray-900 font-semibold shadow hover:bg-gray-50 transition"
          >
            See How It Works
          </a>
        </div>
      </div>

      {/* Integrations */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center">
        <span className="text-sm text-gray-400 mb-2">
          Integrates with your favorite tools
        </span>
        <div className="flex space-x-6 text-gray-300 font-medium text-base">
          <span className="text-gray-400">GitHub</span>
          <span className="text-gray-400">PostgreSQL</span>
          <span className="text-gray-400">Sentry</span>
          <span className="text-gray-400">Linear</span>
          <span className="text-gray-400">AWS</span>
          <span className="text-gray-400">Jira</span>
          <span className="text-gray-400">Datadog</span>
        </div>
      </div>
    </div>
  )
}
