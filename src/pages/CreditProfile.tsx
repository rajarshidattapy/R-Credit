import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { PageLayout } from "@/components/layout/PageLayout";
import {
  TrendingUp,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Shield,
  History,
  Fingerprint,
  Lock,
  XCircle,
  Hexagon,
} from "lucide-react";

const timelineEvents = [
  {
    id: 1,
    type: "identity",
    title: "Identity Created",
    date: "Jan 15, 2024",
    status: "completed",
    icon: Fingerprint,
  },
  {
    id: 2,
    type: "loan",
    title: "Loan #1 — ₹5,000",
    date: "Jan 20, 2024",
    status: "repaid",
    icon: CheckCircle2,
  },
  {
    id: 3,
    type: "loan",
    title: "Loan #2 — ₹8,000",
    date: "Feb 5, 2024",
    status: "repaid",
    icon: CheckCircle2,
  },
  {
    id: 4,
    type: "loan",
    title: "Loan #3 — ₹10,000",
    date: "Feb 28, 2024",
    status: "active",
    icon: Clock,
  },
];

const creditFactors = [
  { label: "Payment History", value: 85, color: "accent" },
  { label: "Credit Utilization", value: 60, color: "primary" },
  { label: "Account Age", value: 40, color: "info" },
  { label: "Loan Diversity", value: 30, color: "warning" },
];

export default function CreditProfile() {
  return (
    <PageLayout>
      <div className="relative cyber-grid min-h-screen">
        {/* Background Effects */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-20 w-96 h-96 bg-primary/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-40 right-20 w-80 h-80 bg-accent/10 rounded-full blur-[100px]" />
        </div>

        <div className="container px-4 py-8 md:py-12 relative">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <div className="flex items-center gap-2 mb-2">
              <Hexagon className="h-5 w-5 text-primary" />
              <span className="text-sm text-primary font-medium">On-Chain Reputation</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold mb-2">Credit Profile</h1>
            <p className="text-muted-foreground">
              Your on-chain credit history and reputation score
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Credit Score Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <Card className="overflow-hidden neon-card">
                  <div className="hero-gradient text-white p-8 relative">
                    <div className="absolute inset-0 cyber-grid opacity-20" />
                    <div className="relative flex flex-col md:flex-row items-center gap-8">
                      {/* Score Circle */}
                      <div className="relative">
                        <svg className="w-40 h-40 transform -rotate-90">
                          <circle
                            cx="80"
                            cy="80"
                            r="70"
                            fill="none"
                            stroke="rgba(255,255,255,0.2)"
                            strokeWidth="12"
                          />
                          <motion.circle
                            cx="80"
                            cy="80"
                            r="70"
                            fill="none"
                            stroke="url(#scoreGradient)"
                            strokeWidth="12"
                            strokeLinecap="round"
                            initial={{ strokeDasharray: "0 440" }}
                            animate={{ strokeDasharray: "264 440" }}
                            transition={{ duration: 1.5, ease: "easeOut" }}
                            style={{ filter: "drop-shadow(0 0 10px hsla(160, 100%, 50%, 0.5))" }}
                          />
                          <defs>
                            <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                              <stop offset="0%" stopColor="#34d399" />
                              <stop offset="100%" stopColor="#22d3ee" />
                            </linearGradient>
                          </defs>
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                          <span className="text-4xl font-bold text-neon-subtle">650</span>
                          <span className="text-sm text-white/60">out of 850</span>
                        </div>
                      </div>

                      {/* Score Details */}
                      <div className="flex-1 text-center md:text-left">
                        <h2 className="text-2xl font-bold mb-2">Good Standing</h2>
                        <p className="text-white/80 mb-4">
                          Your credit score reflects your repayment history and borrowing behavior.
                        </p>
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/20">
                          <TrendingUp className="h-4 w-4 text-green-300" />
                          <span className="text-sm">+50 pts this month</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <CardContent className="p-6 md:p-8">
                    <h3 className="font-semibold mb-4">Credit Factors</h3>
                    <div className="space-y-4">
                      {creditFactors.map((factor) => (
                        <div key={factor.label} className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>{factor.label}</span>
                            <span className="font-medium">{factor.value}%</span>
                          </div>
                          <div className="h-2 bg-muted rounded-full overflow-hidden">
                            <motion.div
                              className={`h-full rounded-full ${
                                factor.color === "accent"
                                  ? "bg-accent"
                                  : factor.color === "primary"
                                  ? "bg-primary"
                                  : factor.color === "info"
                                  ? "bg-info"
                                  : "bg-warning"
                              }`}
                              initial={{ width: 0 }}
                              animate={{ width: `${factor.value}%` }}
                              transition={{ duration: 1, delay: 0.3 }}
                              style={{ boxShadow: `0 0 10px currentColor` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Credit Timeline */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Card className="neon-card">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <History className="h-5 w-5 text-primary" />
                      Credit Timeline
                    </CardTitle>
                    <CardDescription>Your complete credit history on-chain</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="relative">
                      {/* Timeline Line */}
                      <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-accent to-primary/20" />

                      {/* Timeline Events */}
                      <div className="space-y-6">
                        {timelineEvents.map((event, index) => (
                          <motion.div
                            key={event.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.4, delay: 0.1 * index }}
                            className="relative flex items-start gap-4 pl-4"
                          >
                            {/* Icon */}
                            <div
                              className={`relative z-10 w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${
                                event.status === "completed" || event.status === "repaid"
                                  ? "bg-accent/10 text-accent border border-accent/30"
                                  : event.status === "active"
                                  ? "bg-primary/10 text-primary border border-primary/30"
                                  : "bg-muted text-muted-foreground"
                              }`}
                              style={{ 
                                boxShadow: event.status === "completed" || event.status === "repaid" 
                                  ? "0 0 15px hsla(160, 100%, 50%, 0.3)" 
                                  : event.status === "active"
                                  ? "0 0 15px hsla(200, 100%, 60%, 0.3)"
                                  : "none"
                              }}
                            >
                              <event.icon className="h-5 w-5" />
                            </div>

                            {/* Content */}
                            <div className="flex-1 pb-6">
                              <div className="flex items-center gap-2 mb-1">
                                <h4 className="font-medium">{event.title}</h4>
                                {event.status === "repaid" && (
                                  <span className="text-xs px-2 py-0.5 rounded-full bg-accent/10 text-accent font-medium border border-accent/20">
                                    Repaid ✓
                                  </span>
                                )}
                                {event.status === "active" && (
                                  <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary font-medium border border-primary/20">
                                    Active
                                  </span>
                                )}
                              </div>
                              <p className="text-sm text-muted-foreground">{event.date}</p>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            {/* Sidebar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="space-y-6"
            >
              {/* Strike System */}
              <Card className="neon-card">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5 text-warning" />
                    Strike System
                  </CardTitle>
                  <CardDescription>Defaults reduce future access</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="flex gap-2">
                      {[1, 2, 3].map((strike) => (
                        <div
                          key={strike}
                          className="w-10 h-10 rounded-full border-2 border-muted flex items-center justify-center"
                        >
                          <XCircle className="h-5 w-5 text-muted-foreground/30" />
                        </div>
                      ))}
                    </div>
                    <div className="text-sm">
                      <span className="font-semibold">0 / 3</span>
                      <span className="text-muted-foreground"> defaults</span>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-accent/10 border border-accent/20">
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle2 className="h-4 w-4 text-accent" />
                      <span className="font-medium text-accent">Account Active</span>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-muted border border-primary/10">
                    <p className="text-xs text-muted-foreground">
                      <strong className="text-foreground">Warning:</strong> 3 defaults will lock 
                      this identity for 6 months. Payment history is permanent.
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Identity Card */}
              <Card className="neon-card">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Shield className="h-5 w-5 text-primary" />
                    Identity Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 rounded-xl bg-muted border border-primary/10">
                    <div className="text-sm text-muted-foreground mb-1">Identity Hash</div>
                    <div className="font-mono text-sm hash-display">0xA9F...E21</div>
                  </div>
                  <div className="p-4 rounded-xl bg-muted border border-primary/10">
                    <div className="text-sm text-muted-foreground mb-1">Account Type</div>
                    <div className="flex items-center gap-2">
                      <Fingerprint className="h-4 w-4 text-primary" />
                      <span className="font-medium">Unique Living Identity</span>
                    </div>
                  </div>
                  <div className="p-4 rounded-xl bg-muted border border-primary/10">
                    <div className="text-sm text-muted-foreground mb-1">Device Status</div>
                    <div className="flex items-center gap-2 text-accent">
                      <Lock className="h-4 w-4" />
                      <span className="font-medium">Verified & Bound</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}