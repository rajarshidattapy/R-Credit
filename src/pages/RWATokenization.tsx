import { useState } from "react";
import { motion } from "framer-motion";
import { PageLayout } from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { 
  Building2, 
  Sprout, 
  Leaf, 
  Palette, 
  Shield,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  CheckCircle2,
  Coins,
  ArrowRight
} from "lucide-react";

// Mock data types
interface TokenizedAsset {
  id: string;
  name: string;
  description: string;
  assetType: string;
  contractAddress: string;
  totalSupply: number;
  availableSupply: number;
  issuerCredit: "Good" | "At Risk" | "Default";
  tokenizedDate: string;
  price: number;
}

const assetTypes = [
  { value: "real-estate", label: "Real Estate", icon: Building2 },
  { value: "agricultural", label: "Agricultural Commodities", icon: Sprout },
  { value: "carbon-credits", label: "Carbon Credits", icon: Leaf },
  { value: "art", label: "Art & Collectibles", icon: Palette },
];

// Mock initial tokenized assets
const initialAssets: TokenizedAsset[] = [
  {
    id: "1",
    name: "Mumbai Premium Office Space",
    description: "Grade A commercial property in BKC",
    assetType: "real-estate",
    contractAddress: "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb4",
    totalSupply: 1000000,
    availableSupply: 750000,
    issuerCredit: "Good",
    tokenizedDate: "2026-01-15",
    price: 150,
  },
  {
    id: "2",
    name: "Organic Coffee Harvest 2026",
    description: "Premium Arabica beans from Karnataka estates",
    assetType: "agricultural",
    contractAddress: "0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063",
    totalSupply: 500000,
    availableSupply: 320000,
    issuerCredit: "Good",
    tokenizedDate: "2026-01-20",
    price: 75,
  },
  {
    id: "3",
    name: "Solar Farm Carbon Offsets",
    description: "Verified carbon credits from renewable energy",
    assetType: "carbon-credits",
    contractAddress: "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174",
    totalSupply: 2000000,
    availableSupply: 1500000,
    issuerCredit: "At Risk",
    tokenizedDate: "2026-01-10",
    price: 25,
  },
];

export default function RWATokenization() {
  const [selectedAssetType, setSelectedAssetType] = useState<string>("");
  const [assets, setAssets] = useState<TokenizedAsset[]>(initialAssets);
  const [userBalances, setUserBalances] = useState<Record<string, number>>({});
  const [isTokenizing, setIsTokenizing] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState<string | null>(null);

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    totalSupply: "",
  });

  // Mock tokenization
  const handleTokenize = async () => {
    if (!selectedAssetType || !formData.name || !formData.totalSupply) return;

    setIsTokenizing(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));

    const newAsset: TokenizedAsset = {
      id: Date.now().toString(),
      name: formData.name,
      description: formData.description,
      assetType: selectedAssetType,
      contractAddress: `0x${Math.random().toString(16).slice(2, 42)}`,
      totalSupply: parseInt(formData.totalSupply),
      availableSupply: parseInt(formData.totalSupply),
      issuerCredit: "Good",
      tokenizedDate: new Date().toISOString().split("T")[0],
      price: Math.floor(Math.random() * 200) + 50,
    };

    setAssets([newAsset, ...assets]);
    setFormData({ name: "", description: "", totalSupply: "" });
    setSelectedAssetType("");
    setIsTokenizing(false);
  };

  // Mock trading
  const handleBuy = (assetId: string, amount: number) => {
    setAssets((prev) =>
      prev.map((asset) =>
        asset.id === assetId
          ? { ...asset, availableSupply: Math.max(0, asset.availableSupply - amount) }
          : asset
      )
    );
    setUserBalances((prev) => ({
      ...prev,
      [assetId]: (prev[assetId] || 0) + amount,
    }));
  };

  const handleSell = (assetId: string, amount: number) => {
    const currentBalance = userBalances[assetId] || 0;
    if (currentBalance < amount) return;

    setAssets((prev) =>
      prev.map((asset) =>
        asset.id === assetId
          ? { ...asset, availableSupply: asset.availableSupply + amount }
          : asset
      )
    );
    setUserBalances((prev) => ({
      ...prev,
      [assetId]: currentBalance - amount,
    }));
  };

  const getCreditBadge = (credit: string) => {
    switch (credit) {
      case "Good":
        return (
          <Badge className="bg-green-500/10 text-green-400 border-green-500/20">
            <CheckCircle2 className="h-3 w-3 mr-1" />
            Good Standing
          </Badge>
        );
      case "At Risk":
        return (
          <Badge className="bg-yellow-500/10 text-yellow-400 border-yellow-500/20">
            <AlertTriangle className="h-3 w-3 mr-1" />
            At Risk
          </Badge>
        );
      case "Default":
        return (
          <Badge className="bg-red-500/10 text-red-400 border-red-500/20">
            <TrendingDown className="h-3 w-3 mr-1" />
            Default
          </Badge>
        );
      default:
        return null;
    }
  };

  const getAssetIcon = (type: string) => {
    const assetType = assetTypes.find((at) => at.value === type);
    return assetType ? assetType.icon : Building2;
  };

  return (
    <PageLayout>
      <div className="min-h-screen py-8 cyber-grid">
        <div className="container px-4">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 rounded-xl hero-gradient flex items-center justify-center neon-glow">
                <Building2 className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold">RWA Tokenization</h1>
                <p className="text-muted-foreground">
                  Tokenize real-world assets with credit-aware infrastructure
                </p>
              </div>
            </div>
            
            {/* Info Banner */}
            <div className="mt-4 p-4 rounded-xl bg-gradient-to-r from-primary/10 to-purple-500/10 border border-primary/20">
              <div className="flex gap-3">
                <Shield className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <div className="text-sm space-y-1">
                  <p className="text-foreground font-medium">Accountability by Design</p>
                  <p className="text-muted-foreground text-xs">
                    Unlike traditional RWA platforms, every asset here is cryptographically linked to the issuer's verified identity (via PAN + device binding). 
                    CreditCoin tracks obligations on-chain—if an issuer defaults, their credit score plummets across all assets, protecting investors through enforced transparency.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Left Column - Tokenization Form */}
            <div className="lg:col-span-1 space-y-6">
              {/* Asset Type Selector */}
              <Card className="neon-card glow-border">
                <CardHeader>
                  <CardTitle className="text-lg">Create New Token</CardTitle>
                  <CardDescription>Tokenize a real-world asset</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Asset Type</Label>
                    <Select value={selectedAssetType} onValueChange={setSelectedAssetType}>
                      <SelectTrigger className="border-primary/20">
                        <SelectValue placeholder="Select asset type" />
                      </SelectTrigger>
                      <SelectContent>
                        {assetTypes.map((type) => {
                          const Icon = type.icon;
                          return (
                            <SelectItem key={type.value} value={type.value}>
                              <div className="flex items-center gap-2">
                                <Icon className="h-4 w-4" />
                                {type.label}
                              </div>
                            </SelectItem>
                          );
                        })}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="asset-name">Asset Name</Label>
                    <Input
                      id="asset-name"
                      placeholder="e.g., Mumbai Office Tower"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="border-primary/20"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      placeholder="Describe the asset..."
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      className="border-primary/20 resize-none"
                      rows={3}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="supply">Total Supply (Tokens)</Label>
                    <Input
                      id="supply"
                      type="number"
                      placeholder="1000000"
                      value={formData.totalSupply}
                      onChange={(e) => setFormData({ ...formData, totalSupply: e.target.value })}
                      className="border-primary/20"
                    />
                  </div>

                  <div className="space-y-2 p-3 rounded-lg bg-primary/5 border border-primary/20">
                    <div className="flex gap-2 text-sm">
                      <Shield className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                      <div className="text-muted-foreground">
                        <strong className="text-foreground">ZK-Verified Issuer:</strong> Your PAN identity is cryptographically bound to this token
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground pl-6">
                      Every asset you issue is permanently linked to your on-chain credit history. Default on obligations? Investors see it instantly.
                    </p>
                  </div>

                  <Button
                    onClick={handleTokenize}
                    disabled={!selectedAssetType || !formData.name || !formData.totalSupply || isTokenizing}
                    className="w-full hero-gradient gap-2 neon-glow cyber-button"
                  >
                    {isTokenizing ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Tokenizing...
                      </>
                    ) : (
                      <>
                        Tokenize Asset
                        <ArrowRight className="h-4 w-4" />
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>

              {/* Credit Awareness Panel */}
              <Card className="neon-card glow-border bg-gradient-to-br from-primary/5 to-purple-500/5">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Shield className="h-5 w-5 text-primary" />
                    Credit-Aware Infrastructure
                  </CardTitle>
                  <CardDescription className="text-xs">
                    How ZK Identity + CreditCoin enforce accountability
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3 text-sm">
                    <p className="text-muted-foreground">
                      <strong className="text-foreground">This asset is credit-ready</strong> because issuer obligations are permanently bound to their immutable credit history.
                    </p>
                    
                    <div className="p-2 rounded bg-background/50 text-xs space-y-1">
                      <p className="text-muted-foreground">
                        <strong className="text-foreground">Behind the scenes:</strong> When you tokenize an asset, a zero-knowledge proof links it to your PAN-verified identity without exposing personal data. CreditCoin records every obligation. Miss a payment? Your credit score drops across <em>all</em> your issued assets.
                      </p>
                    </div>
                    
                    <div className="pt-3 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">On-time Payments</span>
                        <span className="font-medium text-green-400">95%</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Total Loans Issued</span>
                        <span className="font-medium">12</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Active Since</span>
                        <span className="font-medium">Jan 2025</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Credit Score</span>
                        <span className="font-medium text-primary">742</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                    <div className="flex gap-2 text-sm text-green-400">
                      <CheckCircle2 className="h-4 w-4 shrink-0 mt-0.5" />
                      <span>Issuer verified via PAN + Device binding</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Assets List and Trading */}
            <div className="lg:col-span-2 space-y-6">
              {/* Tokenized Assets List */}
              <Card className="neon-card glow-border">
                <CardHeader>
                  <CardTitle>Tokenized Assets</CardTitle>
                  <CardDescription>
                    {assets.length} asset{assets.length !== 1 ? "s" : ""} available for trading
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {assets.length === 0 ? (
                      <div className="text-center py-12 text-muted-foreground">
                        <Building2 className="h-12 w-12 mx-auto mb-3 opacity-20" />
                        <p>No tokenized assets yet. Create your first one!</p>
                      </div>
                    ) : (
                      assets.map((asset) => {
                        const Icon = getAssetIcon(asset.assetType);
                        const userBalance = userBalances[asset.id] || 0;
                        const isSelected = selectedAsset === asset.id;

                        return (
                          <Card
                            key={asset.id}
                            className={`cursor-pointer transition-all ${
                              isSelected ? "border-primary/50 bg-primary/5" : "border-border/50"
                            }`}
                            onClick={() => setSelectedAsset(isSelected ? null : asset.id)}
                          >
                            <CardContent className="p-4">
                              <div className="flex items-start gap-4">
                                <div className="w-12 h-12 rounded-lg hero-gradient flex items-center justify-center shrink-0">
                                  <Icon className="h-6 w-6 text-white" />
                                </div>

                                <div className="flex-1 min-w-0">
                                  <div className="flex items-start justify-between gap-4 mb-2">
                                    <div>
                                      <h3 className="font-semibold text-lg">{asset.name}</h3>
                                      <p className="text-sm text-muted-foreground line-clamp-1">
                                        {asset.description}
                                      </p>
                                    </div>
                                    {getCreditBadge(asset.issuerCredit)}
                                  </div>

                                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm mb-3">
                                    <div>
                                      <span className="text-muted-foreground block text-xs">Contract</span>
                                      <span className="font-mono text-xs">
                                        {asset.contractAddress.slice(0, 6)}...
                                        {asset.contractAddress.slice(-4)}
                                      </span>
                                    </div>
                                    <div>
                                      <span className="text-muted-foreground block text-xs">Price</span>
                                      <span className="font-medium">₹{asset.price}</span>
                                    </div>
                                    <div>
                                      <span className="text-muted-foreground block text-xs">Available</span>
                                      <span className="font-medium">
                                        {asset.availableSupply.toLocaleString()} / {asset.totalSupply.toLocaleString()}
                                      </span>
                                    </div>
                                    <div>
                                      <span className="text-muted-foreground block text-xs">Your Balance</span>
                                      <span className="font-medium text-primary">
                                        {userBalance.toLocaleString()}
                                      </span>
                                    </div>
                                  </div>

                                  {/* Trading Controls */}
                                  {isSelected && (
                                    <motion.div
                                      initial={{ opacity: 0, height: 0 }}
                                      animate={{ opacity: 1, height: "auto" }}
                                      exit={{ opacity: 0, height: 0 }}
                                      className="pt-3 border-t border-border/50"
                                    >
                                      <div className="flex gap-2">
                                        <Button
                                          size="sm"
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            handleBuy(asset.id, 100);
                                          }}
                                          disabled={asset.availableSupply < 100}
                                          className="flex-1 bg-green-500/10 hover:bg-green-500/20 text-green-400 border border-green-500/20"
                                        >
                                          <TrendingUp className="h-4 w-4 mr-1" />
                                          Buy 100 Tokens
                                        </Button>
                                        <Button
                                          size="sm"
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            handleSell(asset.id, 100);
                                          }}
                                          disabled={userBalance < 100}
                                          className="flex-1 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20"
                                        >
                                          <TrendingDown className="h-4 w-4 mr-1" />
                                          Sell 100 Tokens
                                        </Button>
                                      </div>
                                      <div className="space-y-1 mt-2">
                                        <p className="text-xs text-muted-foreground text-center">
                                          Simulated trading • No real blockchain transaction
                                        </p>
                                        <p className="text-xs text-muted-foreground/70 text-center">
                                          In production: Issuer defaults trigger automatic credit score updates for all their assets
                                        </p>
                                      </div>
                                    </motion.div>
                                  )}
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        );
                      })
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Portfolio Summary */}
              {Object.keys(userBalances).length > 0 && (
                <Card className="neon-card glow-border bg-gradient-to-br from-primary/5 to-transparent">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Coins className="h-5 w-5 text-primary" />
                      Your Portfolio
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {Object.entries(userBalances)
                        .filter(([_, balance]) => balance > 0)
                        .map(([assetId, balance]) => {
                          const asset = assets.find((a) => a.id === assetId);
                          if (!asset) return null;

                          return (
                            <div key={assetId} className="p-3 rounded-lg bg-muted/50 border border-border/50">
                              <p className="text-xs text-muted-foreground mb-1">{asset.name}</p>
                              <p className="text-xl font-bold text-primary">{balance.toLocaleString()}</p>
                              <p className="text-xs text-muted-foreground">tokens</p>
                            </div>
                          );
                        })}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* How It Works Section */}
              <Card className="neon-card glow-border border-primary/20">
                <CardHeader>
                  <CardTitle className="text-lg">How Accountability Works</CardTitle>
                  <CardDescription>The mechanics behind credit-aware RWA</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4 text-sm">
                    <div className="flex gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                        <span className="text-primary font-bold">1</span>
                      </div>
                      <div>
                        <h4 className="font-medium text-foreground mb-1">Identity Binding (ZK Proof)</h4>
                        <p className="text-muted-foreground text-xs">
                          Your PAN + device creates a unique cryptographic identity. No one can issue tokens anonymously—every asset traces back to a verified person.
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                        <span className="text-primary font-bold">2</span>
                      </div>
                      <div>
                        <h4 className="font-medium text-foreground mb-1">Obligation Recording (CreditCoin)</h4>
                        <p className="text-muted-foreground text-xs">
                          Each tokenized asset creates obligations (dividends, buybacks, yields). CreditCoin records these on-chain as loan-like commitments.
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                        <span className="text-primary font-bold">3</span>
                      </div>
                      <div>
                        <h4 className="font-medium text-foreground mb-1">Automatic Reputation Updates</h4>
                        <p className="text-muted-foreground text-xs">
                          Miss a payment? Your credit score drops instantly across <strong>all</strong> your issued assets. Future investors see your full history before buying.
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <div className="w-8 h-8 rounded-full bg-green-500/10 flex items-center justify-center shrink-0">
                        <CheckCircle2 className="h-4 w-4 text-green-400" />
                      </div>
                      <div>
                        <h4 className="font-medium text-foreground mb-1">Result: Self-Enforcing Accountability</h4>
                        <p className="text-muted-foreground text-xs">
                          Bad actors can't hide behind corporate veils or new accounts. One identity = one permanent reputation. This makes RWA markets safer for everyone.
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
