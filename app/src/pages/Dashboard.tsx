import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PageLayout } from "@/components/layout/PageLayout";
import {
  TrendingUp,
  Wallet,
  CreditCard,
  Lock,
  ArrowRight,
  Shield,
  AlertCircle,
  History,
  Zap,
  Hexagon,
} from "lucide-react";

const summaryCards = [
  {
    title: "Credit Score",
    value: "0",
    label: "New Borrower",
    icon: TrendingUp,
    color: "primary",
    trend: null,
  },
  {
    title: "Borrow Limit",
    value: "₹10,000",
    label: "Based on score",
    icon: CreditCard,
    color: "accent",
    trend: null,
  },
  {
    title: "Active Loans",
    value: "0",
    label: "No active loans",
    icon: History,
    color: "info",
    trend: null,
  },
  {
    title: "Vault Balance",
    value: "₹0",
    label: "Deposit Wallet",
    icon: Lock,
    color: "warning",
    trend: null,
  },
];

const quickActions = [
  {
    title: "Request a Loan",
    description: "Borrow up to ₹10,000 based on your credit score",
    href: "/borrow-lend",
    icon: CreditCard,
    primary: true,
  },
  {
    title: "View Vault",
    description: "Check your protected Deposit Wallet",
    href: "/vault",
    icon: Lock,
    primary: false,
  },
  {
    title: "Credit Profile",
    description: "View your credit history and score",
    href: "/credit-profile",
    icon: TrendingUp,
    primary: false,
  },
];

export default function Dashboard() {
  return (
    <PageLayout>
      <div className="relative cyber-grid min-h-screen">
        {/* Background Effects */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 right-20 w-96 h-96 bg-primary/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-40 left-10 w-80 h-80 bg-purple-500/10 rounded-full blur-[100px]" />
        </div>

        <div className="container px-4 py-8 md:py-12 relative">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl hero-gradient flex items-center justify-center neon-glow">
                <Zap className="h-5 w-5 text-white" />
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold">Welcome back</h1>
                <p className="text-muted-foreground">Here's your R-Credit overview</p>
              </div>
            </div>
          </motion.div>

          {/* Info Banner */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-8"
          >
            <div className="p-4 md:p-6 rounded-2xl hero-gradient text-white relative overflow-hidden neon-glow">
              <div className="absolute inset-0 cyber-grid opacity-20" />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent shimmer" />
              <div className="relative flex items-start gap-4">
                <div className="shrink-0 w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center backdrop-blur-sm">
                  <Shield className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Your identity is permanent</h3>
                  <p className="text-white/80 text-sm">
                    Credit history follows you across wallets and chains. Build trust to unlock better rates.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Summary Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {summaryCards.map((card, index) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 + index * 0.05 }}
              >
                <Card className="metric-card h-full">
                  <CardContent className="p-4 md:p-6">
                    <div className="flex items-start justify-between mb-3">
                      <div
                        className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                          card.color === "primary"
                            ? "bg-primary/10 text-primary"
                            : card.color === "accent"
                            ? "bg-accent/10 text-accent"
                            : card.color === "info"
                            ? "bg-info/10 text-info"
                            : "bg-warning/10 text-warning"
                        }`}
                        style={{ boxShadow: `0 0 15px hsla(${card.color === "primary" ? "200" : card.color === "accent" ? "160" : card.color === "info" ? "200" : "45"}, 100%, 50%, 0.2)` }}
                      >
                        <card.icon className="h-5 w-5" />
                      </div>
                    </div>
                    <div className="text-2xl md:text-3xl font-bold mb-1">{card.value}</div>
                    <div className="text-xs md:text-sm text-muted-foreground">{card.label}</div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Hexagon className="h-5 w-5 text-primary" />
              Quick Actions
            </h2>
            <div className="grid md:grid-cols-3 gap-4">
              {quickActions.map((action, index) => (
                <Link key={action.title} to={action.href}>
                  <Card
                    className={`h-full neon-card transition-all duration-300 hover:-translate-y-1 cursor-pointer ${
                      action.primary
                        ? "border-primary/30"
                        : ""
                    }`}
                  >
                    <CardContent className="p-6">
                      <div
                        className={`w-12 h-12 rounded-xl mb-4 flex items-center justify-center ${
                          action.primary
                            ? "hero-gradient text-white neon-glow"
                            : "bg-muted text-muted-foreground"
                        }`}
                      >
                        <action.icon className="h-6 w-6" />
                      </div>
                      <h3 className="font-semibold mb-1">{action.title}</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        {action.description}
                      </p>
                      <div className="flex items-center gap-1 text-sm font-medium text-primary">
                        Get Started
                        <ArrowRight className="h-4 w-4" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </motion.div>

          {/* Empty State Notice */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-8"
          >
            <Card className="border-dashed border-2 border-primary/20">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 rounded-2xl bg-primary/10 mx-auto mb-4 flex items-center justify-center" style={{ boxShadow: "0 0 30px hsla(200, 100%, 60%, 0.2)" }}>
                  <AlertCircle className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">No loan history yet</h3>
                <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                  Start your credit journey by taking your first loan. Repay on time to build your credit score.
                </p>
                <Button asChild className="hero-gradient gap-2 neon-glow cyber-button">
                  <Link to="/borrow-lend">
                    <CreditCard className="h-4 w-4" />
                    Request Your First Loan
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </PageLayout>
  );
}