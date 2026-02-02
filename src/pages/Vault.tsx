import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PageLayout } from "@/components/layout/PageLayout";
import {
  Lock,
  Shield,
  ArrowRight,
  Fingerprint,
  CheckCircle2,
  AlertTriangle,
  Coins,
  ArrowDownRight,
  ArrowUpRight,
  Info,
  Hexagon,
} from "lucide-react";

export default function Vault() {
  return (
    <PageLayout>
      <div className="relative cyber-grid min-h-screen">
        {/* Background Effects */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-40 right-20 w-96 h-96 bg-purple-500/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-20 left-20 w-80 h-80 bg-primary/10 rounded-full blur-[100px]" />
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
              <span className="text-sm text-primary font-medium">Secure Storage</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold mb-2">Deposit Wallet (Vault)</h1>
            <p className="text-muted-foreground">
              Your protected funds that can only be accessed with identity verification
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Vault Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="lg:col-span-2"
            >
              <Card className="overflow-hidden neon-card">
                <div className="vault-gradient text-white p-8 relative">
                  <div className="absolute inset-0 cyber-grid opacity-20" />
                  <div className="relative flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center backdrop-blur-sm" style={{ boxShadow: "0 0 30px hsla(260, 80%, 50%, 0.3)" }}>
                        <Lock className="h-7 w-7" />
                      </div>
                      <div>
                        <h2 className="text-xl font-semibold">Deposit Wallet</h2>
                        <p className="text-white/60 text-sm">ZK-Verified Access Only</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-500/20 border border-green-400/30 backdrop-blur-sm">
                      <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                      <span className="text-sm font-medium text-green-300">Secured</span>
                    </div>
                  </div>

                  <div className="relative grid grid-cols-2 gap-4 mb-6">
                    <div className="p-4 rounded-xl bg-white/10 backdrop-blur-sm border border-white/10">
                      <div className="text-sm text-white/60 mb-1">Vault Balance</div>
                      <div className="text-3xl font-bold">₹0</div>
                    </div>
                    <div className="p-4 rounded-xl bg-white/10 backdrop-blur-sm border border-white/10">
                      <div className="text-sm text-white/60 mb-1">Pending Deposits</div>
                      <div className="text-3xl font-bold">₹0</div>
                    </div>
                  </div>

                  <div className="relative p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
                    <div className="flex items-center gap-2 text-sm text-white/80">
                      <Info className="h-4 w-4" />
                      Vault Address
                    </div>
                    <div className="font-mono text-sm mt-2 bg-white/10 rounded-lg px-3 py-2 border border-white/10">
                      0x7F5E...8A3D
                    </div>
                  </div>
                </div>

                <CardContent className="p-6 md:p-8">
                  <h3 className="font-semibold mb-4 flex items-center gap-2">
                    <Shield className="h-5 w-5 text-primary" />
                    Security Status
                  </h3>

                  <div className="grid sm:grid-cols-2 gap-4 mb-8">
                    <div className="p-4 rounded-xl bg-muted border border-primary/10">
                      <div className="flex items-center gap-2 mb-2">
                        <Lock className="h-4 w-4 text-accent" />
                        <span className="font-medium">Access Type</span>
                      </div>
                      <span className="text-sm text-muted-foreground">Identity Bound</span>
                    </div>
                    <div className="p-4 rounded-xl bg-muted border border-primary/10">
                      <div className="flex items-center gap-2 mb-2">
                        <Fingerprint className="h-4 w-4 text-accent" />
                        <span className="font-medium">Device Status</span>
                      </div>
                      <span className="text-sm text-muted-foreground">Verified & Bound</span>
                    </div>
                  </div>

                  {/* Funds Flow Visualization */}
                  <h3 className="font-semibold mb-4">Funds Flow</h3>
                  <div className="relative p-6 rounded-xl bg-muted/50 border border-primary/10">
                    <div className="flex items-center justify-between gap-4 flex-wrap">
                      {/* Lender Pool */}
                      <div className="flex flex-col items-center gap-2">
                        <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center border border-primary/20" style={{ boxShadow: "0 0 20px hsla(200, 100%, 60%, 0.2)" }}>
                          <Coins className="h-8 w-8 text-primary" />
                        </div>
                        <span className="text-sm font-medium">Lender Pool</span>
                      </div>

                      {/* Arrow */}
                      <div className="flex-1 min-w-[60px] max-w-[120px] relative">
                        <div className="h-1 bg-gradient-to-r from-primary to-accent rounded-full overflow-hidden">
                          <div className="h-full w-1/3 bg-white/50 data-stream" />
                        </div>
                        <ArrowRight className="absolute top-1/2 right-0 -translate-y-1/2 h-5 w-5 text-accent" />
                      </div>

                      {/* Deposit Wallet */}
                      <div className="flex flex-col items-center gap-2">
                        <div className="w-16 h-16 rounded-2xl vault-gradient flex items-center justify-center relative" style={{ boxShadow: "0 0 30px hsla(260, 80%, 50%, 0.3)" }}>
                          <Lock className="h-8 w-8 text-white" />
                          <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-green-500 flex items-center justify-center">
                            <CheckCircle2 className="h-3 w-3 text-white" />
                          </div>
                        </div>
                        <span className="text-sm font-medium">Deposit Wallet</span>
                      </div>

                      {/* Arrow */}
                      <div className="flex-1 min-w-[60px] max-w-[120px] relative">
                        <div className="h-1 bg-gradient-to-r from-accent to-info rounded-full overflow-hidden">
                          <div className="h-full w-1/3 bg-white/50 data-stream" />
                        </div>
                        <ArrowRight className="absolute top-1/2 right-0 -translate-y-1/2 h-5 w-5 text-info" />
                      </div>

                      {/* DeFi Use */}
                      <div className="flex flex-col items-center gap-2">
                        <div className="w-16 h-16 rounded-2xl bg-info/10 flex items-center justify-center border-2 border-dashed border-info/30">
                          <span className="text-xs font-medium text-info text-center">Controlled<br/>DeFi Use</span>
                        </div>
                        <span className="text-sm font-medium text-muted-foreground">Protected</span>
                      </div>
                    </div>
                  </div>

                  {/* Tooltip */}
                  <div className="mt-4 p-4 rounded-xl bg-accent/10 border border-accent/20">
                    <div className="flex items-start gap-3">
                      <Shield className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                      <p className="text-sm text-muted-foreground">
                        <strong className="text-foreground">Protected Funds:</strong> Even if your 
                        borrow wallet is hacked, funds stay protected here. Withdrawals require 
                        identity proof + device verification.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Sidebar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="space-y-6"
            >
              {/* Withdraw Card */}
              <Card className="neon-card">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <ArrowUpRight className="h-5 w-5 text-primary" />
                    Withdraw Funds
                  </CardTitle>
                  <CardDescription>
                    Transfer funds to your linked account
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button className="w-full h-12 hero-gradient gap-2 neon-glow cyber-button" disabled>
                    <Fingerprint className="h-5 w-5" />
                    Withdraw to Linked Account
                  </Button>
                  <p className="text-xs text-muted-foreground text-center">
                    Requires identity proof + device verification
                  </p>
                </CardContent>
              </Card>

              {/* Recent Activity */}
              <Card className="neon-card">
                <CardHeader>
                  <CardTitle className="text-lg">Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col items-center py-8 text-center">
                    <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-3 border border-primary/10">
                      <ArrowDownRight className="h-6 w-6 text-muted-foreground" />
                    </div>
                    <p className="text-sm text-muted-foreground">No recent transactions</p>
                  </div>
                </CardContent>
              </Card>

              {/* Security Notice */}
              <Card className="border-warning/30 bg-warning/5">
                <CardContent className="p-6">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="h-5 w-5 text-warning shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-sm mb-1">Important Security Note</h4>
                      <p className="text-xs text-muted-foreground">
                        Never share your device or identity credentials. 
                        R-Credit will never ask for your private keys.
                      </p>
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