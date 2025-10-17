import type { ManagerDecision, SubmissionRecord } from '../types';

type ActionConfirmationPageProps = {
  decision: ManagerDecision | null;
  submission: SubmissionRecord | null;
  onBackToApprovals: () => void;
};

function ActionConfirmationPage({
  decision,
  submission,
  onBackToApprovals,
}: ActionConfirmationPageProps) {
  if (!decision) {
    return (
      <section className="card message-card">
        <h2>No Action Recorded</h2>
        <p>
          Approve or decline a request to see the confirmation the manager view
          shows after taking action.
        </p>
      </section>
    );
  }

  const submitterName =
    submission?.kind === 'holiday'
      ? submission.payload.employeeName
      : submission?.payload.claimantName ?? 'the submitter';

  return (
    <section className="card message-card">
      <h2>Action Recorded</h2>
      <p>
        <strong>{decision.decidedBy}</strong> {decision.decision} the request for{' '}
        {submitterName} on{' '}
        {new Date(decision.decidedAt).toLocaleString(undefined, {
          dateStyle: 'medium',
          timeStyle: 'short',
        })}
        .
      </p>
      {decision.note ? (
        <p>
          <strong>Shared note:</strong> {decision.note}
        </p>
      ) : null}
      <p>
        The final notification email is ready for the employee. You can return
        to the approval queue to review other requests.
      </p>

      <footer className="form-card__footer">
        <button type="button" onClick={onBackToApprovals}>
          Back to approval requests
        </button>
      </footer>
    </section>
  );
}

export default ActionConfirmationPage;
