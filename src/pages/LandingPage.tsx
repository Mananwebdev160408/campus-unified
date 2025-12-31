import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  GraduationCap,
  Users,
  BookOpen,
  ClipboardCheck,
  Briefcase,
  Shield,
  BarChart3,
  FileText,
  CheckCircle,
  ArrowRight,
  Play,
  Star,
  Zap,
  Globe,
  Lock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import heroDashboard from "@/assets/hero-dashboard.jpg";
import ThemeToggler from "@/components/ThemeToggler";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center">
                <GraduationCap className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold text-foreground">UniFlow</span>
            </div>
            <div className="hidden md:flex items-center gap-8">
              <a
                href="#features"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Features
              </a>
              <a
                href="#how-it-works"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                How it Works
              </a>
              <a
                href="#testimonials"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Testimonials
              </a>
            </div>
            <div className="flex items-center gap-3">
              <ThemeToggler />
              <Button variant="ghost" size="sm" asChild>
                <Link to="/onboarding">Sign In</Link>
              </Button>
              <Button size="sm" asChild>
                <Link to="/onboarding">Get Started</Link>
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-20 left-1/4 w-96 h-96 bg-accent/20 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-1/4 w-80 h-80 bg-primary/10 rounded-full blur-3xl" />
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="max-w-7xl mx-auto text-center"
        >
          <motion.h1
            variants={item}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight max-w-4xl mx-auto"
          >
            The Complete ERP Solution for
            <span className="text-gradient"> Modern Education</span>
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto"
          >
            Streamline student management, academics, placements, and
            administration with our comprehensive platform designed for
            universities and colleges.
          </motion.p>

          <motion.div
            variants={item}
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button size="xl" variant="gradient" asChild>
              <Link to="/onboarding">
                Get Started
                <ArrowRight className="w-4 h-4 mr-2" />
              </Link>
            </Button>
            <Button size="xl" variant="outline" className="gap-2">
              <Globe className="w-4 h-4" />
              Live Demo
            </Button>
          </motion.div>

          <motion.div
            variants={item}
            className="mt-12 flex items-center justify-center gap-8 text-sm text-muted-foreground"
          >
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-success" />
              No credit card required
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-success" />
              14-day free trial
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-success" />
              Cancel anytime
            </div>
          </motion.div>
        </motion.div>

        {/* Dashboard Preview */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="mt-16 max-w-6xl mx-auto"
        >
          <div className="relative rounded-2xl border border-border bg-card p-2 shadow-xl">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 flex items-center gap-2 px-4 py-2 rounded-full bg-card border border-border shadow-lg">
              <div className="w-3 h-3 rounded-full bg-destructive" />
              <div className="w-3 h-3 rounded-full bg-warning" />
              <div className="w-3 h-3 rounded-full bg-success" />
            </div>
            <img
              src={heroDashboard}
              alt="UniFlow Dashboard Preview"
              className="rounded-xl w-full object-cover"
            />
            <div className="absolute inset-0 rounded-xl bg-gradient-to-t from-card via-transparent to-transparent" />
          </div>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="py-16 border-y border-border bg-secondary/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: "500+", label: "Institutions" },
              { value: "2M+", label: "Students Managed" },
              { value: "99.9%", label: "Uptime" },
              { value: "50+", label: "Countries" },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <p className="text-3xl sm:text-4xl font-bold text-foreground">
                  {stat.value}
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-sm font-medium text-accent">Features</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mt-2">
              Everything You Need to Manage Education
            </h2>
            <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
              From admissions to placements, our platform covers every aspect of
              institutional management.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: Users,
                title: "Student Information System",
                description:
                  "Comprehensive student profiles with academic history, documents, and attendance tracking.",
                color: "bg-accent/10 text-accent",
              },
              {
                icon: BookOpen,
                title: "Academic Management",
                description:
                  "Course catalog, timetable scheduling, curriculum management, and examination handling.",
                color: "bg-success/10 text-success",
              },
              {
                icon: ClipboardCheck,
                title: "Attendance Tracking",
                description:
                  "Biometric & QR-based attendance with threshold alerts and detailed reports.",
                color: "bg-warning/10 text-warning",
              },
              {
                icon: BarChart3,
                title: "Examinations & Grades",
                description:
                  "Gradebook management, GPA calculations, and secure transcript generation.",
                color: "bg-primary/10 text-primary",
              },
              {
                icon: Briefcase,
                title: "Placement Portal",
                description:
                  "Job postings, AI-powered resume analyzer, and recruiter management.",
                color: "bg-destructive/10 text-destructive",
              },
              {
                icon: FileText,
                title: "Resume Builder",
                description:
                  "Auto-generate verified resumes with QR codes for recruiter verification.",
                color: "bg-accent/10 text-accent",
              },
            ].map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="card-interactive p-6"
              >
                <div
                  className={`w-12 h-12 rounded-xl ${feature.color} flex items-center justify-center mb-4`}
                >
                  <feature.icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section
        id="how-it-works"
        className="py-24 px-4 sm:px-6 lg:px-8 bg-secondary/30"
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-sm font-medium text-accent">
              How it Works
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mt-2">
              Get Started in Minutes
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Verify Your Institution",
                description:
                  "Enter your organization name and get verified instantly through our automated system.",
              },
              {
                step: "02",
                title: "Set Up Your Portal",
                description:
                  "Configure departments, courses, and user roles. Import existing student data easily.",
              },
              {
                step: "03",
                title: "Go Live",
                description:
                  "Invite students, faculty, and staff. Start managing your institution efficiently.",
              },
            ].map((step, i) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.15 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="text-6xl font-bold text-accent/20 mb-4">
                  {step.step}
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  {step.title}
                </h3>
                <p className="text-muted-foreground">{step.description}</p>
                {i < 2 && (
                  <div className="hidden md:block absolute top-8 right-0 w-1/2 h-px bg-border" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between w-1/3 items-center">
          <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className=" px-10 flex flex-col gap-3 mb-7 justify-center text-left "
          >
            <h1 className="text-7xl font-bold  text-accent">
              Testimonials
            </h1>
            <h2 className="text-2xl sm:text-4xl font-bold text-foreground mt-2">
              Loved by Institutions Worldwide
            </h2>
          </motion.div>

          {/* <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                quote:
                  "UniFlow transformed how we manage our 5,000+ students. The placement module alone increased our placement rate by 40%.",
                author: "Dr. Sarah Chen",
                role: "Dean, Stanford Tech Institute",
                rating: 5,
              },
              {
                quote:
                  "The most intuitive ERP we've ever used. Our faculty adopted it within days, not months like previous systems.",
                author: "Prof. James Wilson",
                role: "HOD, Cambridge Business School",
                rating: 5,
              },
              {
                quote:
                  "Attendance tracking, fee management, and academic records - all in one place. It's exactly what modern education needs.",
                author: "Dr. Priya Sharma",
                role: "Registrar, Delhi University",
                rating: 5,
              },
            ].map((testimonial, i) => (
              <motion.div
                key={testimonial.author}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="card-elevated p-6"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, j) => (
                    <Star
                      key={j}
                      className="w-4 h-4 fill-warning text-warning"
                    />
                  ))}
                </div>
                <p className="text-foreground mb-6">"{testimonial.quote}"</p>
                <div>
                  <p className="font-semibold text-foreground">
                    {testimonial.author}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {testimonial.role}
                  </p>
                </div>
              </motion.div>
            ))}
          </div> */}
          <div>
            
          </div>
        </div>
        <div className="flex-1 border" >

        </div>
        </div>
      </section>

      {/* Security Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-primary text-primary-foreground">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="text-sm font-medium text-primary-foreground/70">
                Security First
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold mt-2 mb-6">
                Enterprise-Grade Security for Your Institution
              </h2>
              <p className="text-primary-foreground/70 mb-8">
                Your data is protected with military-grade encryption, regular
                backups, and compliance with global education data standards.
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  { icon: Shield, text: "SOC 2 Compliant" },
                  { icon: Lock, text: "End-to-End Encryption" },
                  { icon: Globe, text: "GDPR Ready" },
                  { icon: CheckCircle, text: "99.9% Uptime SLA" },
                ].map((item) => (
                  <div key={item.text} className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary-foreground/10 flex items-center justify-center">
                      <item.icon className="w-5 h-5" />
                    </div>
                    <span className="font-medium">{item.text}</span>
                  </div>
                ))}
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="aspect-square rounded-2xl bg-primary-foreground/5 border border-primary-foreground/10 flex items-center justify-center">
                <Shield className="w-32 h-32 text-primary-foreground/20" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      

      {/* Footer */}
      <footer className="border-t border-border py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center">
                  <GraduationCap className="w-5 h-5 text-primary-foreground" />
                </div>
                <span className="text-xl font-bold text-foreground">
                  UniERP
                </span>
              </div>
              <p className="text-sm text-muted-foreground">
                The complete ERP solution for modern educational institutions.
              </p>
            </div>
            {[
              {
                title: "Product",
                links: ["Features", "Pricing", "Security"],
              },
              {
                title: "Company",
                links: ["About", "Blog", "Careers", "Contact"],
              },
              {
                title: "Legal",
                links: ["Privacy", "Terms", "GDPR", "Cookies"],
              },
            ].map((col) => (
              <div key={col.title}>
                <h4 className="font-semibold text-foreground mb-4">
                  {col.title}
                </h4>
                <ul className="space-y-2">
                  {col.links.map((link) => (
                    <li key={link}>
                      <a
                        href={"#"}
                        className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">
              © 2024 UniERP. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              <a
                href="#"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Twitter
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                LinkedIn
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                GitHub
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;
