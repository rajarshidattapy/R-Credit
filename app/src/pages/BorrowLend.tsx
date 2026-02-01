import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { PageLayout } from "@/components/layout/PageLayout";
import {
  CreditCard,
  Lock,
  TrendingUp,
  CheckCircle2,
  ArrowRight,
  Shield,
  Info,
  PiggyBank,
  ShieldCheck,
  AlertTriangle,
  Wallet,
  Percent,
  Users,
  Hexagon,
} from "lucide-react";

const lendingPools = [
  {
    name: "Conservative Pool",
    riskLevel: "Low",
    apr: "8-10%",
    coverage: "100%",
    minDeposit: "₹1,000",
  },
  {
    name: "Balanced Pool",
    riskLevel: "Medium",
    apr: "12-15%",
    coverage: "90%",
    minDeposit: "₹5,000",
  },
  {
    name: "Growth Pool",
    riskLevel: "High",
    apr: "18-24%",
    coverage: "75%",
    minDeposit: "₹10,000",
  },
];

const riskColors: Record<string, string> = {
  Low: "bg-accent/10 text-accent border-accent/30",
  Medium: "bg-warning/10 text-warning border-warning/30",
  High: "bg-destructive/10 text-destructive border-destructive/30",
};

export default function BorrowLend() {
  const [activeTab, setActiveTab] = useState("borrow");
  const [amount, setAmount] = useState([5000]);
  const [duration, setDuration] = useState("30");
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const maxAmount = 10000;
  const interestRate = 12;
  const monthlyInterest = (amount[0] * (interestRate / 100)) / 12;

  const handleConfirm = async () => {
    setIsProcessing(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsProcessing(false);
    setIsSuccess(true);
  };

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
            <div className="flex items-center gap-2 mb-2">
              <Hexagon className="h-5 w-5 text-primary" />
              <span className="text-sm text-primary font-medium">DeFi Protocol</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold mb-2">Borrow & Lend</h1>
            <p className="text-muted-foreground">
              Request loans or earn yield by funding others
            </p>
          </motion.div>

          {/* Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
            <TabsList className="grid w-full max-w-md grid-cols-2 h-14 bg-muted/50 border border-primary/10">
              <TabsTrigger value="borrow" className="gap-2 h-12 text-base data-[state=active]:bg-primary/10 data-[state=active]:text-primary">
                <CreditCard className="h-4 w-4" />
                Borrow
              </TabsTrigger>
              <TabsTrigger value="lend" className="gap-2 h-12 text-base data-[state=active]:bg-primary/10 data-[state=active]:text-primary">
                <PiggyBank className="h-4 w-4" />
                Lend
              </TabsTrigger>
            </TabsList>

            {/* Borrow Tab */}
            <TabsContent value="borrow" className="space-y-8">
              <div className="grid lg:grid-cols-3 gap-8">
                {/* Main Form */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="lg:col-span-2"
                >
                  <Card className="neon-card">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <CreditCard className="h-5 w-5 text-primary" />
                        Borrow Request
                      </CardTitle>
                      <CardDescription>
                        Choose your loan amount and duration
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-8">
                      {/* Amount Slider */}
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <label className="text-sm font-medium">Loan Amount</label>
                          <span className="text-2xl font-bold text-primary text-neon-subtle">
                            ₹{amount[0].toLocaleString()}
                          </span>
                        </div>
                        <Slider
                          value={amount}
                          onValueChange={setAmount}
                          max={maxAmount}
                          min={1000}
                          step={500}
                          className="py-4"
                        />
                        <div className="flex justify-between text-sm text-muted-foreground">
                          <span>₹1,000</span>
                          <span>₹{maxAmount.toLocaleString()}</span>
                        </div>
                      </div>

                      {/* Duration Select */}
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Loan Duration</label>
                        <Select value={duration} onValueChange={setDuration}>
                          <SelectTrigger className="h-12 border-primary/20 focus:border-primary">
                            <SelectValue placeholder="Select duration" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="7">7 Days</SelectItem>
                            <SelectItem value="14">14 Days</SelectItem>
                            <SelectItem value="30">30 Days</SelectItem>
                            <SelectItem value="60">60 Days</SelectItem>
                            <SelectItem value="90">90 Days</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      {/* Credit Info */}
                      <div className="p-4 rounded-xl bg-accent/10 border border-accent/20">
                        <div className="flex items-start gap-3">
                          <TrendingUp className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                          <div>
                            <div className="font-medium text-sm mb-1">
                              Your credit score allows borrowing up to ₹10,000
                            </div>
                            <div className="text-xs text-muted-foreground">
                              Repay on time to increase your limit
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Submit */}
                      <Button
                        onClick={() => setShowConfirmModal(true)}
                        className="w-full h-14 text-lg hero-gradient gap-2 neon-glow cyber-button"
                      >
                        Request Loan
                        <ArrowRight className="h-5 w-5" />
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>

                {/* Summary Sidebar */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="space-y-6"
                >
                  {/* Loan Summary */}
                  <Card className="neon-card">
                    <CardHeader>
                      <CardTitle className="text-lg">Loan Summary</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex justify-between py-2 border-b border-primary/10">
                        <span className="text-muted-foreground">Principal</span>
                        <span className="font-medium">₹{amount[0].toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between py-2 border-b border-primary/10">
                        <span className="text-muted-foreground">Duration</span>
                        <span className="font-medium">{duration} Days</span>
                      </div>
                      <div className="flex justify-between py-2 border-b border-primary/10">
                        <span className="text-muted-foreground">Interest Rate</span>
                        <span className="font-medium">{interestRate}% APR</span>
                      </div>
                      <div className="flex justify-between py-2 border-b border-primary/10">
                        <span className="text-muted-foreground">Est. Interest</span>
                        <span className="font-medium">
                          ₹{(monthlyInterest * (parseInt(duration) / 30)).toFixed(0)}
                        </span>
                      </div>
                      <div className="flex justify-between py-3 text-lg">
                        <span className="font-semibold">Total Repayment</span>
                        <span className="font-bold text-primary text-neon-subtle">
                          ₹{(amount[0] + monthlyInterest * (parseInt(duration) / 30)).toFixed(0)}
                        </span>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Security Notice */}
                  <Card className="vault-gradient text-white overflow-hidden relative">
                    <div className="absolute inset-0 cyber-grid opacity-20" />
                    <CardContent className="p-6 relative">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center backdrop-blur-sm" style={{ boxShadow: "0 0 20px hsla(260, 80%, 50%, 0.3)" }}>
                          <Lock className="h-5 w-5" />
                        </div>
                        <span className="font-semibold">Vault Protected</span>
                      </div>
                      <p className="text-sm text-white/80">
                        Loan funds are deposited to your secure Deposit Wallet. 
                        Even if your wallet is hacked, funds remain protected.
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>
            </TabsContent>

            {/* Lend Tab */}
            <TabsContent value="lend" className="space-y-8">
              {/* Overview Cards */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { title: "Total Deposited", value: "₹2,50,000", icon: Wallet, color: "primary" },
                  { title: "Average APR", value: "14.5%", icon: Percent, color: "accent" },
                  { title: "Default Rate", value: "0.3%", icon: AlertTriangle, color: "warning" },
                  { title: "Insurance Coverage", value: "95%", icon: ShieldCheck, color: "info" },
                ].map((card, index) => (
                  <motion.div
                    key={card.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.05 * index }}
                  >
                    <Card className="metric-card h-full">
                      <CardContent className="p-4 md:p-6">
                        <div
                          className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${
                            card.color === "primary"
                              ? "bg-primary/10 text-primary"
                              : card.color === "accent"
                              ? "bg-accent/10 text-accent"
                              : card.color === "warning"
                              ? "bg-warning/10 text-warning"
                              : "bg-info/10 text-info"
                          }`}
                          style={{ boxShadow: `0 0 15px hsla(${card.color === "primary" ? "200" : card.color === "accent" ? "160" : card.color === "warning" ? "45" : "200"}, 100%, 50%, 0.2)` }}
                        >
                          <card.icon className="h-5 w-5" />
                        </div>
                        <div className="text-2xl md:text-3xl font-bold mb-1">{card.value}</div>
                        <div className="text-xs md:text-sm text-muted-foreground">{card.title}</div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>

              <div className="grid lg:grid-cols-3 gap-8">
                {/* Lending Pools Table */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="lg:col-span-2"
                >
                  <Card className="neon-card">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <PiggyBank className="h-5 w-5 text-primary" />
                        Active Lending Pools
                      </CardTitle>
                      <CardDescription>Choose a pool based on your risk appetite</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="overflow-x-auto">
                        <Table>
                          <TableHeader>
                            <TableRow className="border-primary/10">
                              <TableHead>Pool Name</TableHead>
                              <TableHead>Risk Level</TableHead>
                              <TableHead>APR Range</TableHead>
                              <TableHead>Insurance</TableHead>
                              <TableHead className="text-right">Action</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {lendingPools.map((pool) => (
                              <TableRow key={pool.name} className="group border-primary/10">
                                <TableCell>
                                  <div>
                                    <div className="font-medium">{pool.name}</div>
                                    <div className="text-xs text-muted-foreground">
                                      Min: {pool.minDeposit}
                                    </div>
                                  </div>
                                </TableCell>
                                <TableCell>
                                  <Badge
                                    variant="outline"
                                    className={`${riskColors[pool.riskLevel]} font-medium`}
                                  >
                                    {pool.riskLevel}
                                  </Badge>
                                </TableCell>
                                <TableCell>
                                  <span className="font-semibold text-accent">{pool.apr}</span>
                                </TableCell>
                                <TableCell>
                                  <div className="flex items-center gap-1">
                                    <ShieldCheck className="h-4 w-4 text-info" />
                                    {pool.coverage}
                                  </div>
                                </TableCell>
                                <TableCell className="text-right">
                                  <Button size="sm" className="hero-gradient neon-glow cyber-button">
                                    Deposit
                                  </Button>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

                {/* Explanation Panel */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="space-y-6"
                >
                  {/* How It Works */}
                  <Card className="neon-card">
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Info className="h-5 w-5 text-info" />
                        How Lending Works
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {[
                        { step: 1, title: "Deposit Funds", desc: "Choose a pool and deposit your funds" },
                        { step: 2, title: "Earn Interest", desc: "Borrowers pay interest on their loans" },
                        { step: 3, title: "Insurance Protection", desc: "Fees fund an insurance pool for defaults" },
                      ].map((item) => (
                        <div key={item.step} className="p-4 rounded-xl bg-muted border border-primary/10">
                          <div className="flex items-start gap-3">
                            <div className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm font-bold shrink-0" style={{ boxShadow: "0 0 10px hsla(200, 100%, 60%, 0.3)" }}>
                              {item.step}
                            </div>
                            <div>
                              <h4 className="font-medium text-sm">{item.title}</h4>
                              <p className="text-xs text-muted-foreground">{item.desc}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>

                  {/* Risk Notice */}
                  <Card className="border-warning/30 bg-warning/5">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-3">
                        <AlertTriangle className="h-5 w-5 text-warning shrink-0 mt-0.5" />
                        <div>
                          <h4 className="font-semibold text-sm mb-2">Risk Disclosure</h4>
                          <p className="text-xs text-muted-foreground">
                            Some borrowers may default. Higher returns compensate for risk. 
                            Fees fund an insurance pool to cover potential losses.
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Stats */}
                  <Card className="neon-card">
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Users className="h-5 w-5 text-primary" />
                        Pool Statistics
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex justify-between py-2 border-b border-primary/10">
                        <span className="text-sm text-muted-foreground">Active Lenders</span>
                        <span className="font-medium">1,247</span>
                      </div>
                      <div className="flex justify-between py-2 border-b border-primary/10">
                        <span className="text-sm text-muted-foreground">Total TVL</span>
                        <span className="font-medium">₹15.2 Cr</span>
                      </div>
                      <div className="flex justify-between py-2 border-b border-primary/10">
                        <span className="text-sm text-muted-foreground">Active Loans</span>
                        <span className="font-medium">3,892</span>
                      </div>
                      <div className="flex justify-between py-2">
                        <span className="text-sm text-muted-foreground">Insurance Pool</span>
                        <span className="font-medium text-accent">₹45.6 L</span>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>
            </TabsContent>
          </Tabs>

          {/* Confirmation Modal */}
          <Dialog open={showConfirmModal} onOpenChange={setShowConfirmModal}>
            <DialogContent className="sm:max-w-md border-primary/20">
              {!isSuccess ? (
                <>
                  <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                      <Shield className="h-5 w-5 text-primary" />
                      Confirm Borrow Request
                    </DialogTitle>
                    <DialogDescription>
                      Review your loan details before confirming
                    </DialogDescription>
                  </DialogHeader>

                  <div className="space-y-4 py-4">
                    <div className="p-4 rounded-xl bg-muted space-y-3 border border-primary/10">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Loan Amount</span>
                        <span className="font-semibold">₹{amount[0].toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Interest Rate</span>
                        <span className="font-semibold">{interestRate}% APR</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Duration</span>
                        <span className="font-semibold">{duration} Days</span>
                      </div>
                    </div>

                    <div className="p-4 rounded-xl bg-primary/5 border border-primary/20">
                      <div className="flex items-center gap-2 text-sm mb-2">
                        <Lock className="h-4 w-4 text-primary" />
                        <span className="font-medium">Funds Destination</span>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        <strong className="text-foreground">Deposit Wallet</strong> - Your secure vault
                      </div>
                    </div>

                    <div className="p-4 rounded-xl bg-warning/10 border border-warning/30">
                      <div className="flex items-start gap-2">
                        <Info className="h-4 w-4 text-warning shrink-0 mt-0.5" />
                        <div className="text-sm text-muted-foreground">
                          <strong className="text-foreground">Security Notice:</strong> Funds cannot 
                          be withdrawn to personal wallets without identity verification.
                        </div>
                      </div>
                    </div>
                  </div>

                  <DialogFooter className="gap-2">
                    <Button variant="outline" onClick={() => setShowConfirmModal(false)} className="border-primary/20">
                      Cancel
                    </Button>
                    <Button
                      onClick={handleConfirm}
                      disabled={isProcessing}
                      className="hero-gradient gap-2 neon-glow cyber-button"
                    >
                      {isProcessing ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Processing...
                        </>
                      ) : (
                        <>
                          <CheckCircle2 className="h-4 w-4" />
                          Confirm Borrow
                        </>
                      )}
                    </Button>
                  </DialogFooter>
                </>
              ) : (
                <div className="text-center py-8">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", duration: 0.5 }}
                    className="w-20 h-20 rounded-full bg-accent/10 mx-auto mb-6 flex items-center justify-center border border-accent/30"
                    style={{ boxShadow: "0 0 30px hsla(160, 100%, 50%, 0.3)" }}
                  >
                    <CheckCircle2 className="h-10 w-10 text-accent" />
                  </motion.div>
                  <h3 className="text-xl font-bold mb-2">Loan Approved!</h3>
                  <p className="text-muted-foreground mb-6">
                    ₹{amount[0].toLocaleString()} has been deposited to your Vault
                  </p>
                  <Button
                    onClick={() => {
                      setShowConfirmModal(false);
                      setIsSuccess(false);
                    }}
                    className="hero-gradient neon-glow cyber-button"
                  >
                    View in Vault
                  </Button>
                </div>
              )}
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </PageLayout>
  );
}