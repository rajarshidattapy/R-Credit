import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { PageLayout } from "@/components/layout/PageLayout";
import { Aurora } from "@appletosolutions/reactbits";
import { 
  Shield, 
  Fingerprint, 
  TrendingUp, 
  Lock, 
  ArrowRight, 
  CheckCircle2,
  Sparkles,
  UserPlus,
  LogIn,
  Wallet,
  Zap,
  Hexagon
} from "lucide-react";

const features = [
  {
    icon: Fingerprint,
    title: "Verify Once",
    description: "PAN + device binding creates a unique identity. One identity per human, forever.",
    highlight: "Zero-Knowledge Proof",
  },
  {
    icon: TrendingUp,
    title: "Build Credit",
    description: "Repay loans to grow your credit score. Your reputation unlocks better rates.",
    highlight: "On-Chain History",
  },
  {
    icon: Lock,
    title: "Borrow Securely",
    description: "Funds go to a protected Deposit Wallet. Hacks don't steal your money.",
    highlight: "Vault Protected",
  },
];

export default function Landing() {
  return (
    <PageLayout>
      {/* Hero Section */}
      <section className="relative overflow-hidden min-h-[calc(100vh-4rem)] flex items-center">
        {/* Aurora 3D Background */}
        <div className="absolute inset-0 z-0">
          <Aurora
            colorStops={["#00d4ff", "#9233ea", "#ec4899", "#06b6d4", "#8b5cf6"]}
            amplitude={1.5}
            blend={0.6}
            speed={0.3}
          />
        </div>

        {/* Dark Overlay for readability */}
        <div className="absolute inset-0 bg-background/70 backdrop-blur-[2px] z-[1]" />

        {/* Cyber Grid Overlay */}
        <div className="absolute inset-0 cyber-grid z-[2] opacity-30" />

        {/* Floating Hexagons */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-[2]">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-primary/10"
              initial={{ 
                x: `${10 + i * 15}%`, 
                y: `${10 + i * 12}%`,
                rotate: 0 
              }}
              animate={{ 
                y: [`${10 + i * 12}%`, `${5 + i * 12}%`, `${10 + i * 12}%`],
                rotate: 360 
              }}
              transition={{ 
                duration: 15 + i * 2,
                repeat: Infinity,
                ease: "linear"
              }}
            >
              <Hexagon size={40 + i * 15} strokeWidth={1} />
            </motion.div>
          ))}
        </div>
        
        <div className="container px-4 py-16 md:py-20 relative z-[3]">
          <div className="max-w-4xl mx-auto text-center">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 mb-8 backdrop-blur-sm"
            >
              <Zap className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-primary">Decentralized Trust Protocol</span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6"
            >
              Credit without Collateral.{" "}
              <span className="text-gradient-hero">Built on Identity.</span>
            </motion.h1>

            {/* Subtext */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-12"
            >
              Borrow using your reputation. Not your wallet balance.
              Build credit on-chain, access funds securely.
            </motion.p>

            {/* User Type Selection Cards */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto"
            >
              {/* New User Card */}
              <Link to="/verify">
                <Card className="group relative overflow-hidden neon-card glow-border transition-all duration-300 hover:-translate-y-2 cursor-pointer h-full">
                  <div className="absolute inset-0 hero-gradient opacity-0 group-hover:opacity-5 transition-opacity" />
                  <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
                  <CardContent className="p-8 text-center relative">
                    <motion.div 
                      className="w-16 h-16 rounded-2xl hero-gradient mx-auto mb-4 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform neon-glow"
                      whileHover={{ rotate: 5 }}
                    >
                      <UserPlus className="h-8 w-8 text-white" />
                    </motion.div>
                    <h3 className="text-xl font-bold mb-2">New User</h3>
                    <p className="text-muted-foreground text-sm mb-4">
                      Create your identity with PAN verification and device binding
                    </p>
                    <div className="flex items-center justify-center gap-2 text-primary font-medium">
                      Start KYC
                      <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </CardContent>
                </Card>
              </Link>

              {/* Existing User Card */}
              <Link to="/dashboard">
                <Card className="group relative overflow-hidden neon-card glow-border transition-all duration-300 hover:-translate-y-2 cursor-pointer h-full">
                  <div className="absolute inset-0 vault-gradient opacity-0 group-hover:opacity-5 transition-opacity" />
                  <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />
                  <CardContent className="p-8 text-center relative">
                    <motion.div 
                      className="w-16 h-16 rounded-2xl vault-gradient mx-auto mb-4 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform"
                      style={{ boxShadow: "0 0 30px hsla(260, 80%, 50%, 0.3)" }}
                      whileHover={{ rotate: -5 }}
                    >
                      <LogIn className="h-8 w-8 text-white" />
                    </motion.div>
                    <h3 className="text-xl font-bold mb-2">Existing User</h3>
                    <p className="text-muted-foreground text-sm mb-4">
                      Already verified? Access your dashboard and continue
                    </p>
                    <div className="flex items-center justify-center gap-2 text-accent font-medium">
                      Go to Dashboard
                      <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>

            {/* Security Note */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-8 inline-flex items-center gap-2 text-sm text-muted-foreground px-4 py-2 rounded-full bg-muted/50 border border-border backdrop-blur-sm"
            >
              <Shield className="h-4 w-4 text-primary" />
              <span>Your identity is stored as a hash on-chain. No personal data exposed.</span>
            </motion.div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 md:py-32 relative">
        <div className="absolute inset-0 cyber-grid opacity-50" />
        <div className="container px-4 relative">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-4">
                <Sparkles className="h-4 w-4" />
                Protocol Flow
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Three simple steps to access credit without traditional collateral
              </p>
            </motion.div>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="relative h-full overflow-hidden neon-card group transition-all duration-300 hover:-translate-y-2">
                  <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
                  <CardContent className="p-8">
                    {/* Step Number */}
                    <div className="absolute top-4 right-4 text-6xl font-bold text-primary/10">
                      {index + 1}
                    </div>
                    
                    {/* Icon */}
                    <div className="relative mb-6">
                      <div className="w-14 h-14 rounded-2xl hero-gradient flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform neon-glow">
                        <feature.icon className="h-7 w-7 text-white" />
                      </div>
                    </div>

                    {/* Content */}
                    <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                    <p className="text-muted-foreground mb-4">{feature.description}</p>
                    
                    {/* Highlight */}
                    <div className="inline-flex items-center gap-1.5 text-sm font-medium text-accent">
                      <CheckCircle2 className="h-4 w-4" />
                      {feature.highlight}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Security Banner */}
      <section className="py-20 md:py-32">
        <div className="container px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative overflow-hidden rounded-3xl hero-gradient p-10 md:p-16 text-white"
          >
            {/* Cyber effects */}
            <div className="absolute inset-0 cyber-grid opacity-20" />
            <div className="absolute top-0 left-0 w-64 h-64 bg-white/5 rounded-full -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/5 rounded-full translate-x-1/3 translate-y-1/3" />
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
            
            <div className="relative grid md:grid-cols-2 gap-8 items-center">
              <div>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm mb-6 border border-white/20">
                  <Wallet className="h-4 w-4" />
                  <span className="text-sm font-medium">Deposit Wallet Security</span>
                </div>
                
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  Why hackers can't steal your borrowed funds
                </h2>
                
                <ul className="space-y-4">
                  {[
                    "Borrowed money goes to Deposit Wallet, not your personal wallet",
                    "Private key of Deposit Wallet is never shared",
                    "Even if your account is hacked, funds stay protected",
                    "Withdrawals require identity verification + device binding",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-white/80 mt-0.5 shrink-0" />
                      <span className="text-white/90">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="relative">
                {/* Vault Visual */}
                <div className="p-8 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center neon-glow">
                      <Lock className="h-6 w-6" />
                    </div>
                    <div>
                      <div className="font-semibold">Deposit Wallet</div>
                      <div className="text-sm text-white/60">Predetermined & Secure</div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="p-3 rounded-xl bg-white/10 border border-white/10">
                      <div className="text-xs text-white/60 mb-1">Your Credit Score</div>
                      <div className="text-2xl font-bold">Determines Limit</div>
                    </div>
                    <div className="p-3 rounded-xl bg-white/10 border border-white/10">
                      <div className="text-xs text-white/60 mb-1">Everyone Starts At</div>
                      <div className="text-2xl font-bold">Score: 0</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </PageLayout>
  );
}
