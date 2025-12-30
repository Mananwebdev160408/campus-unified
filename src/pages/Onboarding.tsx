import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  GraduationCap,
  Building2,
  CheckCircle2,
  AlertCircle,
  XCircle,
  Search,
  MapPin,
  Loader2,
  ArrowRight,
  Shield,
  Plus,
  Mail,
  Phone,
  Globe,
  FileText,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import type { VerificationStatus, Organization } from '@/types';

const mockOrganizations: Organization[] = [
  { id: '1', name: 'Stanford University', location: 'Stanford, CA, USA', type: 'university', verified: true },
  { id: '2', name: 'MIT - Massachusetts Institute of Technology', location: 'Cambridge, MA, USA', type: 'university', verified: true },
  { id: '3', name: 'Stanford Community College', location: 'Stanford, CA, USA', type: 'college', verified: true },
];

type OnboardingStep = 'verify' | 'register-university' | 'register-admin';

export function Onboarding() {
  const navigate = useNavigate();
  const [step, setStep] = useState<OnboardingStep>('verify');
  const [orgName, setOrgName] = useState('');
  const [status, setStatus] = useState<VerificationStatus>('idle');
  const [verifiedOrg, setVerifiedOrg] = useState<Organization | null>(null);
  const [possibleMatches, setPossibleMatches] = useState<Organization[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // University registration form state
  const [uniForm, setUniForm] = useState({
    name: '',
    type: 'university',
    location: '',
    address: '',
    website: '',
    email: '',
    phone: '',
    description: '',
  });

  const handleVerify = async () => {
    if (!orgName.trim()) return;
    
    setStatus('loading');
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const query = orgName.toLowerCase();
    const exactMatch = mockOrganizations.find(org => 
      org.name.toLowerCase() === query
    );
    
    if (exactMatch) {
      setVerifiedOrg(exactMatch);
      setStatus('verified');
    } else {
      const matches = mockOrganizations.filter(org =>
        org.name.toLowerCase().includes(query) || query.includes(org.name.toLowerCase().split(' ')[0])
      );
      
      if (matches.length > 0) {
        setPossibleMatches(matches);
        setStatus('possible_match');
      } else {
        setStatus('not_found');
      }
    }
  };

  const handleSelectMatch = (org: Organization) => {
    setVerifiedOrg(org);
    setOrgName(org.name);
    setStatus('verified');
    setPossibleMatches([]);
  };

  const handleContinueToAdmin = () => {
    setStep('register-admin');
  };

  const handleStartUniversityRegistration = () => {
    setUniForm(prev => ({ ...prev, name: orgName }));
    setStep('register-university');
  };

  const handleUniversitySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    toast.success('University registration submitted!', {
      description: 'Your application will be reviewed within 2-3 business days.',
    });
    
    // Create a pending organization
    const newOrg: Organization = {
      id: Date.now().toString(),
      name: uniForm.name,
      location: uniForm.location,
      type: uniForm.type as 'university' | 'college',
      verified: false,
    };
    
    setVerifiedOrg(newOrg);
    setIsSubmitting(false);
    setStep('register-admin');
  };

  const handleAdminRegister = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Registration complete!', {
      description: 'Welcome to UniERP. Redirecting to dashboard...',
    });
    // Navigate to dashboard after registration
    setTimeout(() => navigate('/dashboard'), 1000);
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left Panel - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-primary p-12 flex-col justify-between relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-72 h-72 bg-accent rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-accent rounded-full blur-3xl" />
        </div>
        
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-xl bg-primary-foreground/10 flex items-center justify-center">
              <GraduationCap className="w-7 h-7 text-primary-foreground" />
            </div>
            <span className="text-2xl font-bold text-primary-foreground">UniERP</span>
          </div>
          
          <h1 className="text-4xl font-bold text-primary-foreground leading-tight mb-4">
            Universal College<br />ERP Platform
          </h1>
          <p className="text-primary-foreground/70 text-lg max-w-md">
            Streamline your institution's operations with our comprehensive enterprise resource planning system.
          </p>
        </div>

        <div className="relative z-10 space-y-6">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-primary-foreground/10 flex items-center justify-center shrink-0">
              <Shield className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h3 className="font-semibold text-primary-foreground">Verified Institutions Only</h3>
              <p className="text-primary-foreground/60 text-sm">We verify every institution to ensure authenticity and trust.</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-primary-foreground/10 flex items-center justify-center shrink-0">
              <Building2 className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h3 className="font-semibold text-primary-foreground">Multi-Role Support</h3>
              <p className="text-primary-foreground/60 text-sm">From students to super admins, everyone has their place.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel - Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <AnimatePresence mode="wait">
            {step === 'verify' ? (
              <motion.div
                key="verify"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-8"
              >
                {/* Mobile Logo */}
                <div className="lg:hidden flex items-center gap-3 mb-8">
                  <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
                    <GraduationCap className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <span className="text-xl font-bold text-foreground">UniERP</span>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-foreground">Verify Your Institution</h2>
                  <p className="text-muted-foreground mt-2">
                    Enter your organization name to verify it before registration.
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="relative">
                    <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      placeholder="Enter organization name"
                      value={orgName}
                      onChange={(e) => {
                        setOrgName(e.target.value);
                        if (status !== 'idle' && status !== 'loading') {
                          setStatus('idle');
                          setVerifiedOrg(null);
                          setPossibleMatches([]);
                        }
                      }}
                      className="pl-12 h-12"
                    />
                  </div>

                  <Button
                    onClick={handleVerify}
                    disabled={!orgName.trim() || status === 'loading'}
                    className="w-full h-12"
                    size="lg"
                  >
                    {status === 'loading' ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Verifying...
                      </>
                    ) : (
                      <>
                        <Search className="w-4 h-4" />
                        Verify Organization
                      </>
                    )}
                  </Button>
                </div>

                {/* Status Cards */}
                <AnimatePresence mode="wait">
                  {status === 'verified' && verifiedOrg && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="p-4 rounded-xl bg-success/10 border border-success/20"
                    >
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-success mt-0.5" />
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold text-foreground">{verifiedOrg.name}</h3>
                            <span className="status-badge status-verified">Verified</span>
                          </div>
                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <MapPin className="w-3.5 h-3.5" />
                            {verifiedOrg.location}
                          </div>
                        </div>
                      </div>
                      <Button
                        onClick={handleContinueToAdmin}
                        className="w-full mt-4"
                        variant="default"
                      >
                        Continue & Register
                        <ArrowRight className="w-4 h-4" />
                      </Button>
                    </motion.div>
                  )}

                  {status === 'possible_match' && possibleMatches.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="p-4 rounded-xl bg-warning/10 border border-warning/20"
                    >
                      <div className="flex items-start gap-3 mb-4">
                        <AlertCircle className="w-5 h-5 text-warning mt-0.5" />
                        <div>
                          <h3 className="font-semibold text-foreground">Possible Matches Found</h3>
                          <p className="text-sm text-muted-foreground">
                            Please select your institution from the list below.
                          </p>
                        </div>
                      </div>
                      <div className="space-y-2">
                        {possibleMatches.map((org) => (
                          <button
                            key={org.id}
                            onClick={() => handleSelectMatch(org)}
                            className="w-full p-3 rounded-lg bg-background border border-border hover:border-accent transition-colors text-left"
                          >
                            <p className="font-medium text-foreground">{org.name}</p>
                            <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                              <MapPin className="w-3 h-3" />
                              {org.location}
                            </div>
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {status === 'not_found' && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="p-4 rounded-xl bg-secondary border border-border"
                    >
                      <div className="flex items-start gap-3">
                        <XCircle className="w-5 h-5 text-muted-foreground mt-0.5" />
                        <div className="flex-1">
                          <h3 className="font-semibold text-foreground">Institution Not Found</h3>
                          <p className="text-sm text-muted-foreground mt-1">
                            We couldn't find "{orgName}" in our database. Would you like to register your institution?
                          </p>
                          <div className="flex gap-2 mt-4">
                            <Button 
                              onClick={handleStartUniversityRegistration}
                              className="flex-1"
                            >
                              <Plus className="w-4 h-4 mr-2" />
                              Register University
                            </Button>
                            <Button variant="outline" size="sm">
                              Contact Support
                            </Button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <p className="text-center text-sm text-muted-foreground">
                  Already have an account?{' '}
                  <button onClick={() => navigate('/auth')} className="text-primary font-medium hover:underline">
                    Sign in
                  </button>
                </p>
              </motion.div>
            ) : step === 'register-university' ? (
              <motion.div
                key="register-university"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div>
                  <button
                    onClick={() => setStep('verify')}
                    className="text-sm text-muted-foreground hover:text-foreground mb-4 flex items-center gap-1"
                  >
                    ← Back to verification
                  </button>
                  <h2 className="text-2xl font-bold text-foreground">Register Your University</h2>
                  <p className="text-muted-foreground mt-2">
                    Fill in the details to register your institution on UniERP.
                  </p>
                </div>

                <form onSubmit={handleUniversitySubmit} className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1.5 block">
                      Institution Name *
                    </label>
                    <div className="relative">
                      <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        placeholder="University Name"
                        className="pl-10"
                        value={uniForm.name}
                        onChange={(e) => setUniForm(prev => ({ ...prev, name: e.target.value }))}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-foreground mb-1.5 block">
                        Institution Type *
                      </label>
                      <Select
                        value={uniForm.type}
                        onValueChange={(v) => setUniForm(prev => ({ ...prev, type: v }))}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="university">University</SelectItem>
                          <SelectItem value="college">College</SelectItem>
                          <SelectItem value="institute">Institute</SelectItem>
                          <SelectItem value="academy">Academy</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground mb-1.5 block">
                        City/Location *
                      </label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                          placeholder="City, Country"
                          className="pl-10"
                          value={uniForm.location}
                          onChange={(e) => setUniForm(prev => ({ ...prev, location: e.target.value }))}
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-foreground mb-1.5 block">
                      Full Address *
                    </label>
                    <Textarea
                      placeholder="Complete institutional address"
                      rows={2}
                      value={uniForm.address}
                      onChange={(e) => setUniForm(prev => ({ ...prev, address: e.target.value }))}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-foreground mb-1.5 block">
                        Official Email *
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                          type="email"
                          placeholder="admin@university.edu"
                          className="pl-10"
                          value={uniForm.email}
                          onChange={(e) => setUniForm(prev => ({ ...prev, email: e.target.value }))}
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground mb-1.5 block">
                        Phone Number *
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                          placeholder="+1 (555) 000-0000"
                          className="pl-10"
                          value={uniForm.phone}
                          onChange={(e) => setUniForm(prev => ({ ...prev, phone: e.target.value }))}
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-foreground mb-1.5 block">
                      Website
                    </label>
                    <div className="relative">
                      <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        type="url"
                        placeholder="https://university.edu"
                        className="pl-10"
                        value={uniForm.website}
                        onChange={(e) => setUniForm(prev => ({ ...prev, website: e.target.value }))}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-foreground mb-1.5 block">
                      Brief Description
                    </label>
                    <Textarea
                      placeholder="Tell us about your institution..."
                      rows={3}
                      value={uniForm.description}
                      onChange={(e) => setUniForm(prev => ({ ...prev, description: e.target.value }))}
                    />
                  </div>

                  <div className="bg-secondary/50 rounded-lg p-4 flex items-start gap-3">
                    <FileText className="w-5 h-5 text-muted-foreground mt-0.5" />
                    <div className="text-sm">
                      <p className="font-medium text-foreground">Verification Process</p>
                      <p className="text-muted-foreground">
                        Your registration will be reviewed by our team. You'll receive a confirmation email within 2-3 business days.
                      </p>
                    </div>
                  </div>

                  <Button type="submit" className="w-full h-12" size="lg" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        Submit Registration
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </Button>
                </form>
              </motion.div>
            ) : (
              <motion.div
                key="register-admin"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-8"
              >
                <div>
                  <button
                    onClick={() => setStep('verify')}
                    className="text-sm text-muted-foreground hover:text-foreground mb-4 flex items-center gap-1"
                  >
                    ← Back to verification
                  </button>
                  <h2 className="text-2xl font-bold text-foreground">Create Admin Account</h2>
                  <p className="text-muted-foreground mt-2">
                    Complete your registration for{' '}
                    <span className="font-medium text-foreground">{verifiedOrg?.name}</span>
                    {!verifiedOrg?.verified && (
                      <span className="ml-2 text-xs bg-amber-500/10 text-amber-600 px-2 py-0.5 rounded-full">
                        Pending Verification
                      </span>
                    )}
                  </p>
                </div>

                <form onSubmit={handleAdminRegister} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-foreground mb-1.5 block">
                        First Name
                      </label>
                      <Input placeholder="John" required />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground mb-1.5 block">
                        Last Name
                      </label>
                      <Input placeholder="Doe" required />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1.5 block">
                      Email Address
                    </label>
                    <Input type="email" placeholder="admin@university.edu" required />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1.5 block">
                      Password
                    </label>
                    <Input type="password" placeholder="Create a secure password" required />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1.5 block">
                      Confirm Password
                    </label>
                    <Input type="password" placeholder="Confirm your password" required />
                  </div>

                  <Button type="submit" className="w-full h-12" size="lg">
                    Create Account
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </form>

                <p className="text-center text-xs text-muted-foreground">
                  By creating an account, you agree to our{' '}
                  <button className="text-primary hover:underline">Terms of Service</button>
                  {' '}and{' '}
                  <button className="text-primary hover:underline">Privacy Policy</button>
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

export default Onboarding;
