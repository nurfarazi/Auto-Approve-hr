import { FormEvent, useState } from 'react';
import type { ExpenseClaimData } from '../types';

type ExpenseClaimFormProps = {
  initialValues?: ExpenseClaimData | null;
  onSubmit: (data: ExpenseClaimData) => void;
};

const defaultValues: ExpenseClaimData = {
  claimantName: '',
  expenseDate: '',
  category: '',
  amount: '',
  notes: '',
};

function ExpenseClaimForm({
  initialValues = null,
  onSubmit,
}: ExpenseClaimFormProps) {
  const [form, setForm] = useState<ExpenseClaimData>(
    initialValues ?? defaultValues,
  );

  const handleChange = <Field extends keyof ExpenseClaimData>(
    field: Field,
    value: ExpenseClaimData[Field],
  ) => {
    setForm((previous) => ({
      ...previous,
      [field]: value,
    }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit(form);
  };

  return (
    <form className="card form-card" onSubmit={handleSubmit}>
      <header className="form-card__header">
        <h2>Expense Claim Form</h2>
        <p>
          Submit reimbursable expenses for manager approval and Finance
          processing.
        </p>
      </header>

      <div className="form-grid">
        <label className="form-field">
          <span>Claimant name</span>
          <input
            required
            type="text"
            value={form.claimantName}
            onChange={(event) =>
              handleChange('claimantName', event.target.value)
            }
            placeholder="John Smith"
          />
        </label>

        <label className="form-field">
          <span>Expense date</span>
          <input
            required
            type="date"
            value={form.expenseDate}
            onChange={(event) =>
              handleChange('expenseDate', event.target.value)
            }
          />
        </label>

        <label className="form-field">
          <span>Category</span>
          <select
            required
            value={form.category}
            onChange={(event) => handleChange('category', event.target.value)}
          >
            <option value="">Choose a category</option>
            <option value="travel">Travel</option>
            <option value="meals">Meals &amp; Entertainment</option>
            <option value="office">Office Supplies</option>
            <option value="other">Other</option>
          </select>
        </label>

        <label className="form-field">
          <span>Amount</span>
          <input
            required
            min="0"
            step="0.01"
            type="number"
            value={form.amount}
            onChange={(event) => handleChange('amount', event.target.value)}
            placeholder="0.00"
          />
        </label>

        <label className="form-field form-field--full">
          <span>Supporting details</span>
          <textarea
            rows={4}
            value={form.notes}
            onChange={(event) => handleChange('notes', event.target.value)}
            placeholder="Break down the expense and provide any extra context."
          />
        </label>
      </div>

      <footer className="form-card__footer">
        <button type="submit" className="primary">
          Submit claim
        </button>
      </footer>
    </form>
  );
}

export default ExpenseClaimForm;
