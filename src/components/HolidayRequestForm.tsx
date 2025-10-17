import { FormEvent, useState } from 'react';
import type { HolidayRequestData } from '../types';

type HolidayRequestFormProps = {
  initialValues?: HolidayRequestData | null;
  onSubmit: (data: HolidayRequestData) => void;
};

const defaultValues: HolidayRequestData = {
  employeeName: '',
  department: '',
  startDate: '',
  endDate: '',
  reason: '',
};

function HolidayRequestForm({
  initialValues = null,
  onSubmit,
}: HolidayRequestFormProps) {
  const [form, setForm] = useState<HolidayRequestData>(
    initialValues ?? defaultValues,
  );

  const handleChange = <Field extends keyof HolidayRequestData>(
    field: Field,
    value: HolidayRequestData[Field],
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
        <h2>Holiday Request Form</h2>
        <p>
          Provide the details for your upcoming time off. Your request will be
          routed to your manager for review.
        </p>
      </header>

      <div className="form-grid">
        <label className="form-field">
          <span>Employee name</span>
          <input
            required
            type="text"
            value={form.employeeName}
            onChange={(event) => handleChange('employeeName', event.target.value)}
            placeholder="Jane Doe"
          />
        </label>

        <label className="form-field">
          <span>Department</span>
          <input
            required
            type="text"
            value={form.department}
            onChange={(event) => handleChange('department', event.target.value)}
            placeholder="Customer Success"
          />
        </label>

        <label className="form-field">
          <span>Start date</span>
          <input
            required
            type="date"
            value={form.startDate}
            onChange={(event) => handleChange('startDate', event.target.value)}
          />
        </label>

        <label className="form-field">
          <span>End date</span>
          <input
            required
            type="date"
            value={form.endDate}
            min={form.startDate || undefined}
            onChange={(event) => handleChange('endDate', event.target.value)}
          />
        </label>

        <label className="form-field form-field--full">
          <span>Reason / coverage notes</span>
          <textarea
            required
            rows={4}
            value={form.reason}
            onChange={(event) => handleChange('reason', event.target.value)}
            placeholder="Provide context for your time away."
          />
        </label>
      </div>

      <footer className="form-card__footer">
        <button type="submit" className="primary">
          Submit request
        </button>
      </footer>
    </form>
  );
}

export default HolidayRequestForm;
