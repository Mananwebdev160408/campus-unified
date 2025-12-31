import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  CreditCard,
  Receipt,
  Wallet,
  AlertCircle,
  CheckCircle2,
  Clock,
  Download,
  ChevronRight,
  Award,
  Building,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { cn } from '@/lib/utils';

interface Invoice {
  id: string;
  description: string;
  amount: number;
  dueDate: string;
  status: 'paid' | 'pending' | 'overdue';
  paidDate?: string;
  category: 'tuition' | 'hostel' | 'exam' | 'library' | 'other';
}

interface Scholarship {
  id: string;
  name: string;
  amount: number;
  status: 'active' | 'pending' | 'expired';
  validUntil: string;
  provider: string;
}

const invoices: Invoice[] = [
  { id: 'INV-001', description: 'Tuition Fee - Fall 2024', amount: 45000, dueDate: '2024-01-15', status: 'paid', paidDate: '2024-01-10', category: 'tuition' },
  { id: 'INV-002', description: 'Hostel Fee - Semester 5', amount: 18000, dueDate: '2024-01-20', status: 'pending', category: 'hostel' },
  { id: 'INV-003', description: 'Examination Fee', amount: 2500, dueDate: '2024-01-05', status: 'overdue', category: 'exam' },
  { id: 'INV-004', description: 'Library Fine', amount: 150, dueDate: '2024-01-25', status: 'pending', category: 'library' },
  { id: 'INV-005', description: 'Lab Equipment Fee', amount: 3500, dueDate: '2023-12-15', status: 'paid', paidDate: '2023-12-12', category: 'other' },
];

const scholarships: Scholarship[] = [
  { id: '1', name: 'Merit Scholarship', amount: 25000, status: 'active', validUntil: '2025-06-30', provider: 'University' },
  { id: '2', name: 'State Government Grant', amount: 15000, status: 'pending', validUntil: '2024-12-31', provider: 'State Education Board' },
];

const feeBreakdown = [
  { label: 'Tuition Fee', amount: 45000 },
  { label: 'Development Fee', amount: 5000 },
  { label: 'Laboratory Fee', amount: 8000 },
  { label: 'Library Fee', amount: 2000 },
  { label: 'Sports Fee', amount: 1500 },
  { label: 'Examination Fee', amount: 2500 },
];

export default function Finance() {
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);

  const totalDue = invoices
    .filter((inv) => inv.status !== 'paid')
    .reduce((sum, inv) => sum + inv.amount, 0);

  const totalPaid = invoices
    .filter((inv) => inv.status === 'paid')
    .reduce((sum, inv) => sum + inv.amount, 0);

  const totalScholarship = scholarships
    .filter((s) => s.status === 'active')
    .reduce((sum, s) => sum + s.amount, 0);

  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'paid':
        return { icon: CheckCircle2, color: 'text-success', bg: 'bg-success/10', label: 'Paid' };
      case 'pending':
        return { icon: Clock, color: 'text-warning', bg: 'bg-warning/10', label: 'Pending' };
      case 'overdue':
        return { icon: AlertCircle, color: 'text-destructive', bg: 'bg-destructive/10', label: 'Overdue' };
      default:
        return { icon: Clock, color: 'text-muted-foreground', bg: 'bg-muted', label: 'Unknown' };
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'tuition':
        return Building;
      case 'hostel':
        return Building;
      case 'exam':
        return Receipt;
      default:
        return Receipt;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Finance & Fees</h1>
        <p className="text-muted-foreground mt-1">Manage your payments and view fee details</p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card-elevated p-5"
        >
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-destructive/10">
              <Wallet className="w-5 h-5 text-destructive" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Due</p>
              <p className="text-2xl font-bold text-destructive">₹{totalDue.toLocaleString()}</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="card-elevated p-5"
        >
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-success/10">
              <CheckCircle2 className="w-5 h-5 text-success" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Paid</p>
              <p className="text-2xl font-bold text-success">₹{totalPaid.toLocaleString()}</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="card-elevated p-5"
        >
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-primary/10">
              <Award className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Scholarship</p>
              <p className="text-2xl font-bold text-primary">₹{totalScholarship.toLocaleString()}</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="card-elevated p-5"
        >
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-warning/10">
              <AlertCircle className="w-5 h-5 text-warning" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Pending Items</p>
              <p className="text-2xl font-bold text-foreground">
                {invoices.filter((i) => i.status !== 'paid').length}
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Invoices List */}
        <div className="lg:col-span-2">
          <div className="card-elevated">
            <div className="p-5 border-b border-border flex items-center justify-between">
              <h2 className="text-lg font-semibold text-foreground">Payment History</h2>
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            </div>
            <div className="divide-y divide-border">
              {invoices.map((invoice, index) => {
                const statusConfig = getStatusConfig(invoice.status);
                const StatusIcon = statusConfig.icon;
                const CategoryIcon = getCategoryIcon(invoice.category);

                return (
                  <motion.div
                    key={invoice.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="p-5 hover:bg-muted/30 transition-colors cursor-pointer"
                    onClick={() => window.location.href = `/finance/${invoice.id}`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className={cn('p-2.5 rounded-xl', statusConfig.bg)}>
                          <CategoryIcon className={cn('w-5 h-5', statusConfig.color)} />
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-0.5">
                            <span className="text-xs text-muted-foreground">{invoice.id}</span>
                            <Badge
                              variant="outline"
                              className={cn('text-xs', statusConfig.color)}
                            >
                              {statusConfig.label}
                            </Badge>
                          </div>
                          <h3 className="font-medium text-foreground">{invoice.description}</h3>
                          <p className="text-sm text-muted-foreground">
                            Due: {invoice.dueDate}
                            {invoice.paidDate && ` • Paid: ${invoice.paidDate}`}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="font-semibold text-foreground">
                          ₹{invoice.amount.toLocaleString()}
                        </span>
                        <ChevronRight className="w-4 h-4 text-muted-foreground" />
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Fee Breakdown */}
          <div className="card-elevated p-5">
            <h3 className="font-semibold text-foreground mb-4">Fee Breakdown (Semester)</h3>
            <div className="space-y-3">
              {feeBreakdown.map((item) => (
                <div key={item.label} className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">{item.label}</span>
                  <span className="text-sm font-medium text-foreground">
                    ₹{item.amount.toLocaleString()}
                  </span>
                </div>
              ))}
              <div className="border-t border-border pt-3 mt-3">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-foreground">Total</span>
                  <span className="font-bold text-foreground">
                    ₹{feeBreakdown.reduce((sum, i) => sum + i.amount, 0).toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Scholarships */}
          <div className="card-elevated p-5">
            <h3 className="font-semibold text-foreground mb-4">Scholarships & Grants</h3>
            <div className="space-y-4">
              {scholarships.map((scholarship) => (
                <div
                  key={scholarship.id}
                  className="p-3 rounded-lg bg-muted/30 border border-border"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h4 className="font-medium text-foreground text-sm">{scholarship.name}</h4>
                      <p className="text-xs text-muted-foreground">{scholarship.provider}</p>
                    </div>
                    <Badge
                      variant={scholarship.status === 'active' ? 'default' : 'secondary'}
                      className="text-xs"
                    >
                      {scholarship.status}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-success">
                      ₹{scholarship.amount.toLocaleString()}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      Valid till {scholarship.validUntil}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Pay */}
          <Dialog>
            <DialogTrigger asChild>
              <Button className="w-full" size="lg">
                <CreditCard className="w-4 h-4 mr-2" />
                Pay Now - ₹{totalDue.toLocaleString()}
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Payment Gateway</DialogTitle>
                <DialogDescription>
                  Complete your payment securely
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="p-4 rounded-lg bg-muted/30 border border-border">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-muted-foreground">Amount to Pay</span>
                    <span className="text-xl font-bold text-foreground">
                      ₹{totalDue.toLocaleString()}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Includes {invoices.filter((i) => i.status !== 'paid').length} pending items
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <Button variant="outline" className="h-16 flex-col gap-1">
                    <CreditCard className="w-5 h-5" />
                    <span className="text-xs">Credit/Debit</span>
                  </Button>
                  <Button variant="outline" className="h-16 flex-col gap-1">
                    <Wallet className="w-5 h-5" />
                    <span className="text-xs">UPI</span>
                  </Button>
                  <Button variant="outline" className="h-16 flex-col gap-1">
                    <Building className="w-5 h-5" />
                    <span className="text-xs">Net Banking</span>
                  </Button>
                  <Button variant="outline" className="h-16 flex-col gap-1">
                    <Receipt className="w-5 h-5" />
                    <span className="text-xs">EMI</span>
                  </Button>
                </div>
                <Button className="w-full">Proceed to Payment</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
}
