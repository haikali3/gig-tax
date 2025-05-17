import { Container } from './container'
import { Typography } from './typography'

export default function LandingPage() {
  return (
    <Container>
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br relative overflow-hidden">
        {/* Autonomous tax & expense management badge */}
        <div className="flex items-center space-x-2 bg-white/80 border border-gray-200 rounded-full px-4 py-1 shadow-sm backdrop-blur z-10">
          <span className="inline-block w-2 h-2 rounded-full bg-green-500 mr-2"></span>
          <span className="text-sm font-medium text-gray-700">
            Autonomous tax & expense management
          </span>
        </div>

        {/* Headline */}
        <div className="flex flex-col items-center justify-center text-center px-4 mt-10">
          <Typography
            variant="h1"
            fontClass="instrument-serif"
            className="font-normal text-[64px] md:text-[96px] leading-none text-[#2d3342]"
          >
            {' '}
            Take control of your freelance taxes
            <span className="text-shine italic"> effortlessly.</span>
          </Typography>
          <Typography variant="lead" fontClass="satoshi" className="mt-4">
            Say goodbye to spreadsheet chaos and lost receipts. Our platform
            keeps your freelance finances organized, your deductions maximized,
            and your tax season stress-free so you can focus on what inspires
            you.
          </Typography>
          <div className="flex space-x-4 mb-12 mt-10">
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
    </Container>
  )
}
