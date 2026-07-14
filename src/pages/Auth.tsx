import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, ArrowRight, Loader2, UserX, Shield, Package, Star, Truck, BadgeCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/use-auth";
import { useNavigate } from "react-router";

interface AuthProps {
  redirectAfterAuth?: string;
}

function Auth({ redirectAfterAuth = "/" }: AuthProps) {
  const { isLoading: authLoading, isAuthenticated, signIn } = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState<"signIn" | { email: string }>("signIn");
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [email, setEmail] = useState("");

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      const formData = new FormData();
      formData.set("email", email);
      await signIn("email-otp", formData);
      setStep({ email });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to send code");
    }
    setIsLoading(false);
  };

  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      const formData = new FormData();
      formData.set("email", (step as { email: string }).email);
      formData.set("code", otp);
      await signIn("email-otp", formData);
      navigate(redirectAfterAuth);
    } catch {
      setError("Invalid verification code");
      setOtp("");
    }
    setIsLoading(false);
  };

  const handleGuestLogin = async () => {
    setIsLoading(true);
    setError(null);
    try {
      await signIn("anonymous");
      navigate(redirectAfterAuth);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Guest login failed");
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex">
      {/* Left - Brand Panel */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-gradient-to-br from-primary via-blue-700 to-blue-900 p-12 flex-col justify-between">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/10 rounded-full blur-2xl" />

        <div className="relative">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-white/20 flex items-center justify-center backdrop-blur-sm">
              <Package className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold text-white">
              Soko<span className="font-light text-blue-200">Digital</span>
            </span>
          </div>
        </div>

        <div className="relative space-y-6">
          <h1 className="text-4xl font-bold text-white leading-tight">
            Welcome to<br />
            Africa's Trusted Marketplace
          </h1>
          <p className="text-blue-200 max-w-md text-sm leading-relaxed">
            Join millions of buyers and sellers across Africa.
            Discover amazing products, connect with verified sellers,
            and shop with confidence.
          </p>
          <div className="space-y-3 pt-4">
            {[
              { icon: Star, text: "Personalized shopping recommendations" },
              { icon: BadgeCheck, text: "Verified sellers with real reviews" },
              { icon: Truck, text: "Free delivery on orders over $50" },
              { icon: Shield, text: "Secure payments & buyer protection" },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }}
                  className="flex items-center gap-3 text-sm text-white/80"
                >
                  <div className="h-7 w-7 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                    <Icon className="h-3.5 w-3.5 text-blue-300" />
                  </div>
                  {item.text}
                </motion.div>
              );
            })}
          </div>
        </div>

        <div className="relative text-sm text-white/40">
          &copy; {new Date().getFullYear()} Soko Digital. All rights reserved.
        </div>
      </div>

      {/* Right - Auth Form */}
      <div className="flex-1 flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-sm"
        >
          <div className="lg:hidden flex items-center gap-2 mb-8">
            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
              <Package className="h-4 w-4 text-white" />
            </div>
            <span className="text-lg font-bold">
              Soko<span className="text-primary font-light">Digital</span>
            </span>
          </div>

          <AnimatePresence mode="wait">
            {step === "signIn" ? (
              <motion.div
                key="signin"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
              >
                <h1 className="text-2xl font-bold">Welcome back</h1>
                <p className="text-muted-foreground text-sm mt-2 mb-8">
                  Enter your email to get started
                </p>

                <form onSubmit={handleEmailSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Email address</label>
                    <div className="relative">
                      <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        type="email"
                        placeholder="name@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="h-12 pl-10 rounded-xl border-border/50 bg-muted/30 focus-visible:ring-primary/30"
                        disabled={isLoading}
                        required
                      />
                    </div>
                  </div>

                  {error && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-sm text-destructive bg-destructive/5 rounded-lg px-3 py-2"
                    >
                      {error}
                    </motion.p>
                  )}

                  <Button
                    type="submit"
                    className="w-full h-12 rounded-xl text-sm font-medium gap-2 shadow-lg shadow-primary/20 transition-all duration-200 hover:shadow-xl hover:shadow-primary/30 cursor-pointer"
                    disabled={isLoading || !email}
                  >
                    {isLoading ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <>
                        Continue with Email
                        <ArrowRight className="h-4 w-4" />
                      </>
                    )}
                  </Button>
                </form>

                <div className="relative my-6">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-border/50" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-3 text-muted-foreground">Or</span>
                  </div>
                </div>

                <Button
                  type="button"
                  variant="outline"
                  className="w-full h-12 rounded-xl text-sm font-medium border-border/50 gap-2 cursor-pointer"
                  onClick={handleGuestLogin}
                  disabled={isLoading}
                >
                  <UserX className="h-4 w-4" />
                  Continue as Guest
                </Button>

                <p className="text-xs text-muted-foreground text-center mt-6 leading-relaxed">
                  By continuing, you agree to our{" "}
                  <a href="#" className="underline hover:text-primary transition-colors">Terms</a>
                  {" "}and{" "}
                  <a href="#" className="underline hover:text-primary transition-colors">Privacy Policy</a>
                </p>
              </motion.div>
            ) : (
              <motion.div
                key="otp"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="text-center mb-8">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 15 }}
                    className="h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4"
                  >
                    <Mail className="h-8 w-8 text-primary" />
                  </motion.div>
                  <h1 className="text-2xl font-bold">Check your email</h1>
                  <p className="text-muted-foreground text-sm mt-2">
                    We sent a code to{" "}
                    <span className="font-medium text-foreground">
                      {(step as { email: string }).email}
                    </span>
                  </p>
                </div>

                <form onSubmit={handleOtpSubmit} className="space-y-4">
                  <input
                    type="hidden"
                    name="email"
                    value={(step as { email: string }).email}
                  />
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="flex justify-center gap-2"
                  >
                    {Array.from({ length: 6 }).map((_, i) => (
                      <input
                        key={i}
                        type="text"
                        maxLength={1}
                        value={otp[i] || ""}
                        onChange={(e) => {
                          const val = e.target.value.replace(/\D/g, "");
                          const newOtp = otp.slice(0, i) + val + otp.slice(i + 1);
                          setOtp(newOtp.slice(0, 6));
                          if (val && i < 5) {
                            const next = document.getElementById("otp-" + (i + 1));
                            next?.focus();
                          }
                        }}
                        onKeyDown={(e) => {
                          if (e.key === "Backspace" && !otp[i] && i > 0) {
                            const prev = document.getElementById("otp-" + (i - 1));
                            prev?.focus();
                          }
                        }}
                        id={"otp-" + i}
                        className="h-14 w-12 text-center text-lg font-bold rounded-xl border border-border/50 bg-muted/30 focus:border-primary/50 focus:ring-1 focus:ring-primary/30 outline-none transition-all duration-200"
                        disabled={isLoading}
                      />
                    ))}
                  </motion.div>

                  {error && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-sm text-destructive bg-destructive/5 rounded-lg px-3 py-2 text-center"
                    >
                      {error}
                    </motion.p>
                  )}

                  <Button
                    type="submit"
                    className="w-full h-12 rounded-xl text-sm font-medium shadow-lg transition-all duration-200 hover:shadow-xl cursor-pointer"
                    disabled={isLoading || otp.length !== 6}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Verifying...
                      </>
                    ) : (
                      <>
                        Verify Code
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>

                  <button
                    type="button"
                    onClick={() => {
                      setStep("signIn");
                      setOtp("");
                      setError(null);
                    }}
                    className="w-full text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 cursor-pointer"
                  >
                    Use a different email
                  </button>
                </form>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}

export default function AuthPage(props: AuthProps) {
  return <Auth {...props} />;
}