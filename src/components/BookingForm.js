import { useState, useEffect, useCallback } from "react";
import { SelectField } from "./SelectField";
import { InputField } from "./InputField";


const initialState = {
  date: "",
  time: "",
  guests: 1,
  occasion: "Birthday",
};

const times = ["17:00", "18:00", "19:00", "20:00", "21:00", "22:00"];
const occasions = ["Birthday", "Anniversary", "Other"];
const GUESTS_MIN = 1;
const GUESTS_MAX = 10;







function BookingForm() {
  const [form, setForm] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const validate = useCallback(() => {
    const errs = {};
    if (!form.date) errs.date = "Date is required.";
    if (!form.time) errs.time = "Time is required.";
    if (!form.guests || form.guests < GUESTS_MIN || form.guests > GUESTS_MAX)
      errs.guests = `Number of guests must be between ${GUESTS_MIN} and ${GUESTS_MAX}.`;
    return errs;
  }, [form]);

  useEffect(() => {
    if (submitted) return;
    setErrors(validate());
  }, [form, validate, submitted]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "guests" ? Math.min(Math.max(Number(value), GUESTS_MIN), GUESTS_MAX) : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length === 0) {
      setSubmitted(true);
    }
  };

  if (submitted) {
    return (
      <div role="status" aria-live="polite">
        Thank you! Your booking is confirmed.
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} aria-label="Table Booking Form" style={{ maxWidth: 440 }}>
      <InputField
        id="date"
        label="Date"
        type="date"
        name="date"
        value={form.date}
        onChange={handleChange}
        error={errors.date}
        required
      />
      <SelectField
        id="time"
        label="Time"
        name="time"
        value={form.time}
        onChange={handleChange}
        options={times}
        error={errors.time}
        required
      />
      <InputField
        id="guests"
        label="Number of guests"
        type="number"
        name="guests"
        value={form.guests}
        onChange={handleChange}
        min={GUESTS_MIN}
        max={GUESTS_MAX}
        error={errors.guests}
        required
      />
      <SelectField
        id="occasion"
        label="Occasion"
        name="occasion"
        value={form.occasion}
        onChange={handleChange}
        options={occasions}
      />
      <button type="submit">Book Table</button>
    </form>
  );
}

export default BookingForm;
