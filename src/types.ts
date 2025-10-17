export type HolidayRequestData = {
  employeeName: string;
  department: string;
  startDate: string;
  endDate: string;
  reason: string;
};

export type ExpenseClaimData = {
  claimantName: string;
  expenseDate: string;
  category: string;
  amount: string;
  notes: string;
};

export type SubmissionKind = 'holiday' | 'expense';

export type SubmissionRecord =
  | {
      kind: 'holiday';
      payload: HolidayRequestData;
    }
  | {
      kind: 'expense';
      payload: ExpenseClaimData;
    };

export type ManagerDecision = {
  decision: 'approved' | 'declined';
  note?: string;
  decidedBy: string;
  decidedAt: string;
};
