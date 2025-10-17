import { useState } from 'react';
import type { ManagerDecision, SubmissionRecord } from '../types';

type ApprovalRequestEmailViewProps = {
  submission: SubmissionRecord | null;
  onDecision: (decision: ManagerDecision) => void;
};

function ApprovalRequestEmailView({
  submission,
  onDecision,
}: ApprovalRequestEmailViewProps) {
  const [managerName, setManagerName] = useState('Alex Johnson');
  const [note, setNote] = useState('');

  if (!submission) {
    return (
      <section className="card message-card">
        <h2>Nothing to Review</h2>
        <p>
          Once an employee submits a request, it will appear here for your
          review and action.
        </p>
      </section>
    );
  }

  const handleDecision = (decision: ManagerDecision['decision']) => {
    const nextDecision: ManagerDecision = {
      decision,
      note: note.trim() ? note.trim() : undefined,
      decidedBy: managerName.trim() || 'Manager',
      decidedAt: new Date().toISOString(),
    };
    onDecision(nextDecision);
  };

  const emailSubject =
    submission.kind === 'holiday'
      ? 'Holiday request awaiting approval'
      : 'Expense claim requires your review';

  const requesterName =
    submission.kind === 'holiday'
      ? submission.payload.employeeName
      : submission.payload.claimantName;

  return (
    <article className="card email-card">
      <header>
        <h2>Approval Request Email (Preview)</h2>
        <p>This is the email sent to the manager asking for a decision.</p>
      </header>

      <section className="email-card__meta">
        <div>
          <span className="meta-label">To</span>
          <input
            type="text"
            value={managerName}
            onChange={(event) => setManagerName(event.target.value)}
          />
        </div>
        <div>
          <span className="meta-label">Subject</span>
          <span>{emailSubject}</span>
        </div>
      </section>

      <section className="email-card__body">
        <p>Hello {managerName || 'there'},</p>
        <p>
          {requesterName} has submitted a{' '}
          {submission.kind === 'holiday' ? 'holiday request' : 'expense claim'}{' '}
          for your review. The key details are below.
        </p>

        {submission.kind === 'holiday' ? (
          <ul>
            <li>
              Dates: {submission.payload.startDate} to{' '}
              {submission.payload.endDate}
            </li>
            <li>Department: {submission.payload.department}</li>
            <li>Notes: {submission.payload.reason || 'None'}</li>
          </ul>
        ) : (
          <ul>
            <li>Date: {submission.payload.expenseDate}</li>
            <li>Category: {submission.payload.category}</li>
            <li>Amount: ${Number(submission.payload.amount || 0).toFixed(2)}</li>
            <li>Notes: {submission.payload.notes || 'None'}</li>
          </ul>
        )}

        <p>
          Please approve or decline the request. An optional note will be shared
          with the submitter.
        </p>

        <label className="form-field form-field--full">
          <span>Optional note to submitter</span>
          <textarea
            rows={3}
            value={note}
            onChange={(event) => setNote(event.target.value)}
            placeholder="Let the submitter know why you approved or declined."
          />
        </label>
      </section>

      <footer className="form-card__footer">
        <button type="button" onClick={() => handleDecision('declined')}>
          Decline
        </button>
        <button
          type="button"
          className="primary"
          onClick={() => handleDecision('approved')}
        >
          Approve
        </button>
      </footer>
    </article>
  );
}

export default ApprovalRequestEmailView;
