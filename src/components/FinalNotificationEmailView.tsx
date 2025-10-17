import type { ManagerDecision, SubmissionRecord } from '../types';

type FinalNotificationEmailViewProps = {
  submission: SubmissionRecord | null;
  managerDecision: ManagerDecision | null;
  onStartNew: () => void;
};

function FinalNotificationEmailView({
  submission,
  managerDecision,
  onStartNew,
}: FinalNotificationEmailViewProps) {
  if (!submission) {
    return (
      <section className="card message-card">
        <h2>No Submission Yet</h2>
        <p>
          Submit a holiday request or expense claim to generate the final
          notification that your employee receives.
        </p>
      </section>
    );
  }

  const { kind } = submission;
  const subject =
    kind === 'holiday'
      ? 'Your holiday request update'
      : 'Expense claim decision';

  const primaryMessage =
    managerDecision?.decision === 'approved'
      ? 'Good news: your manager has approved your request.'
      : managerDecision?.decision === 'declined'
        ? 'Your manager has reviewed your request but was unable to approve it.'
        : 'We have received your submission and will notify you once your manager responds.';

  return (
    <article className="card email-card">
      <header>
        <h2>Final Notification Email (Preview)</h2>
        <p>
          This is the message the submitter receives after the workflow
          completes.
        </p>
      </header>

      <section className="email-card__meta">
        <div>
          <span className="meta-label">To</span>
          <span>
            {kind === 'holiday'
              ? submission.payload.employeeName
              : submission.payload.claimantName}
          </span>
        </div>
        <div>
          <span className="meta-label">Subject</span>
          <span>{subject}</span>
        </div>
      </section>

      <section className="email-card__body">
        <p>{primaryMessage}</p>

        {managerDecision?.note ? (
          <blockquote>
            <strong>Manager note:</strong> {managerDecision.note}
          </blockquote>
        ) : null}

        <p>Submission details:</p>
        {kind === 'holiday' ? (
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
          If anything looks incorrect, reply directly to this message so your
          manager can follow up with you.
        </p>
      </section>

      <footer className="form-card__footer">
        <button type="button" onClick={onStartNew}>
          Start a new submission
        </button>
      </footer>
    </article>
  );
}

export default FinalNotificationEmailView;
