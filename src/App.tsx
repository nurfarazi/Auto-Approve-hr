import { useMemo, useState } from 'react';
import './App.css';
import ActionConfirmationPage from './components/ActionConfirmationPage';
import ApprovalRequestEmailView from './components/ApprovalRequestEmailView';
import ExpenseClaimForm from './components/ExpenseClaimForm';
import FinalNotificationEmailView from './components/FinalNotificationEmailView';
import HolidayRequestForm from './components/HolidayRequestForm';
import SubmissionConfirmationPage from './components/SubmissionConfirmationPage';
import type {
  ExpenseClaimData,
  HolidayRequestData,
  ManagerDecision,
  SubmissionRecord,
} from './types';

type Portal = 'employee' | 'manager';

type EmployeeView =
  | 'holidayForm'
  | 'expenseForm'
  | 'submissionConfirmation'
  | 'finalNotification';

type ManagerView = 'approvalEmail' | 'actionConfirmation';

const employeeViews: Array<{ key: EmployeeView; label: string }> = [
  { key: 'holidayForm', label: 'Holiday Request Form' },
  { key: 'expenseForm', label: 'Expense Claim Form' },
  { key: 'submissionConfirmation', label: 'Submission Confirmation' },
  { key: 'finalNotification', label: 'Final Notification Email' },
];

const managerViews: Array<{ key: ManagerView; label: string }> = [
  { key: 'approvalEmail', label: 'Approval Request Email' },
  { key: 'actionConfirmation', label: 'Action Confirmation Page' },
];

function App() {
  const [portal, setPortal] = useState<Portal>('employee');
  const [employeeView, setEmployeeView] =
    useState<EmployeeView>('holidayForm');
  const [managerView, setManagerView] =
    useState<ManagerView>('approvalEmail');
  const [lastSubmission, setLastSubmission] = useState<SubmissionRecord | null>(
    null,
  );
  const [managerDecision, setManagerDecision] =
    useState<ManagerDecision | null>(null);

  const submitterName = useMemo(() => {
    if (!lastSubmission) {
      return '';
    }
    return lastSubmission.kind === 'holiday'
      ? lastSubmission.payload.employeeName
      : lastSubmission.payload.claimantName;
  }, [lastSubmission]);

  const canShowConfirmation = Boolean(lastSubmission);
  const canShowFinal = Boolean(lastSubmission);
  const canShowManagerConfirmation = Boolean(managerDecision);

  const handleHolidaySubmit = (data: HolidayRequestData) => {
    const record: SubmissionRecord = { kind: 'holiday', payload: data };
    setLastSubmission(record);
    setManagerDecision(null);
    setEmployeeView('submissionConfirmation');
    setManagerView('approvalEmail');
  };

  const handleExpenseSubmit = (data: ExpenseClaimData) => {
    const record: SubmissionRecord = { kind: 'expense', payload: data };
    setLastSubmission(record);
    setManagerDecision(null);
    setEmployeeView('submissionConfirmation');
    setManagerView('approvalEmail');
  };

  const handleViewFinalNotification = () => {
    setEmployeeView('finalNotification');
  };

  const handleStartNewSubmission = () => {
    setEmployeeView('holidayForm');
  };

  const handleManagerDecision = (decision: ManagerDecision) => {
    setManagerDecision(decision);
    setManagerView('actionConfirmation');
    setEmployeeView('finalNotification');
  };

  const handleBackToApprovals = () => {
    setManagerView('approvalEmail');
  };

  return (
    <div className="app-shell">
      <header className="app-header">
        <h1>Auto-Approve Workflow Sandbox</h1>
        <p>
          Explore the employee submission and manager approval journey in a
          single-page prototype.
        </p>
        <nav className="portal-toggle">
          <button
            type="button"
            className={portal === 'employee' ? 'active' : ''}
            onClick={() => setPortal('employee')}
          >
            Employee views
          </button>
          <button
            type="button"
            className={portal === 'manager' ? 'active' : ''}
            onClick={() => setPortal('manager')}
          >
            Manager views
          </button>
        </nav>
      </header>

      <main>
        {portal === 'employee' ? (
          <>
            <nav className="view-tabs">
              {employeeViews.map(({ key, label }) => (
                <button
                  type="button"
                  key={key}
                  className={
                    employeeView === key ? 'tab active' : 'tab'
                  }
                  onClick={() => setEmployeeView(key)}
                  disabled={
                    (key === 'submissionConfirmation' && !canShowConfirmation) ||
                    (key === 'finalNotification' && !canShowFinal)
                  }
                >
                  {label}
                </button>
              ))}
            </nav>

            {employeeView === 'holidayForm' ? (
              <HolidayRequestForm
                initialValues={
                  lastSubmission?.kind === 'holiday'
                    ? lastSubmission.payload
                    : null
                }
                onSubmit={handleHolidaySubmit}
              />
            ) : null}

            {employeeView === 'expenseForm' ? (
              <ExpenseClaimForm
                initialValues={
                  lastSubmission?.kind === 'expense'
                    ? lastSubmission.payload
                    : null
                }
                onSubmit={handleExpenseSubmit}
              />
            ) : null}

            {employeeView === 'submissionConfirmation' ? (
              <SubmissionConfirmationPage
                submission={lastSubmission}
                onStartNew={handleStartNewSubmission}
                onViewFinalNotification={handleViewFinalNotification}
              />
            ) : null}

            {employeeView === 'finalNotification' ? (
              <FinalNotificationEmailView
                submission={lastSubmission}
                managerDecision={managerDecision}
                onStartNew={handleStartNewSubmission}
              />
            ) : null}
          </>
        ) : (
          <>
            <nav className="view-tabs">
              {managerViews.map(({ key, label }) => (
                <button
                  type="button"
                  key={key}
                  className={managerView === key ? 'tab active' : 'tab'}
                  onClick={() => setManagerView(key)}
                  disabled={key === 'actionConfirmation' && !canShowManagerConfirmation}
                >
                  {label}
                </button>
              ))}
            </nav>

            {managerView === 'approvalEmail' ? (
              <ApprovalRequestEmailView
                submission={lastSubmission}
                onDecision={handleManagerDecision}
              />
            ) : null}

            {managerView === 'actionConfirmation' ? (
              <ActionConfirmationPage
                decision={managerDecision}
                submission={lastSubmission}
                onBackToApprovals={handleBackToApprovals}
              />
            ) : null}
          </>
        )}
      </main>

      <footer className="app-footer">
        <p>
          Current submitter:{' '}
          <strong>{submitterName || '- no submission recorded -'}</strong>
        </p>
      </footer>
    </div>
  );
}

export default App;
