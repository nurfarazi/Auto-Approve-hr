import type { SubmissionRecord } from '../types';

type SubmissionConfirmationPageProps = {
  submission: SubmissionRecord | null;
  onViewFinalNotification: () => void;
  onStartNew: () => void;
};

function SubmissionConfirmationPage({
  submission,
  onViewFinalNotification,
  onStartNew,
}: SubmissionConfirmationPageProps) {
  if (!submission) {
    return (
      <section className="card message-card">
        <h2>No Submission Yet</h2>
        <p>Select a form to get started, then submit it to see the confirmation.</p>
      </section>
    );
  }

  const { kind } = submission;

  return (
    <section className="card message-card">
      <h2>Submission Received</h2>
      <p>
        Thanks for sending your {kind === 'holiday' ? 'holiday request' : 'expense claim'}.
        We&apos;ve packaged the details below and will notify you when your manager
        acts on it.
      </p>

      {kind === 'holiday' ? (
        <div className="summary">
          <h3>Holiday summary</h3>
          <dl>
            <div>
              <dt>Employee</dt>
              <dd>{submission.payload.employeeName}</dd>
            </div>
            <div>
              <dt>Department</dt>
              <dd>{submission.payload.department}</dd>
            </div>
            <div>
              <dt>Dates</dt>
              <dd>
                {submission.payload.startDate} to {submission.payload.endDate}
              </dd>
            </div>
            <div>
              <dt>Notes</dt>
              <dd>{submission.payload.reason || 'None'}</dd>
            </div>
          </dl>
        </div>
      ) : (
        <div className="summary">
          <h3>Expense summary</h3>
          <dl>
            <div>
              <dt>Claimant</dt>
              <dd>{submission.payload.claimantName}</dd>
            </div>
            <div>
              <dt>Date</dt>
              <dd>{submission.payload.expenseDate}</dd>
            </div>
            <div>
              <dt>Category</dt>
              <dd>{submission.payload.category}</dd>
            </div>
            <div>
              <dt>Amount</dt>
              <dd>${Number(submission.payload.amount || 0).toFixed(2)}</dd>
            </div>
            <div>
              <dt>Notes</dt>
              <dd>{submission.payload.notes || 'None'}</dd>
            </div>
          </dl>
        </div>
      )}

      <footer className="form-card__footer">
        <button type="button" onClick={onStartNew}>
          Submit another form
        </button>
        <button type="button" className="primary" onClick={onViewFinalNotification}>
          View final notification email
        </button>
      </footer>
    </section>
  );
}

export default SubmissionConfirmationPage;
