import { useState } from "react";
import { guiXacNhan } from "../api";
import SectionDeco from "./SectionDeco";

const initialForm = {
  name: "",
  attending: "yes",
  guests: 1,
  message: "",
};

function RsvpForm({ text, onSubmitted }) {
  const [form, setForm] = useState(initialForm);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [sending, setSending] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setSending(true);
    try {
      await guiXacNhan(form);
      setSubmitted(true);
      onSubmitted?.();
    } catch {
      setError(text.error);
    } finally {
      setSending(false);
    }
  };

  if (submitted) {
    return (
      <section className="section rsvp">
        <SectionDeco />
        <h2 className="section__title">{text.thanksTitle}</h2>
        <p className="rsvp__thanks">
          {text.thanksBefore} <strong>{form.name}</strong> {text.thanksAfter}
          <br />
          {text.thanksNote}
        </p>
      </section>
    );
  }

  return (
    <section className="section rsvp">
      <SectionDeco />
      <h2 className="section__title">{text.title}</h2>
      <form className="rsvp__form" onSubmit={handleSubmit}>
        <label className="rsvp__field">
          <span>{text.name}</span>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder={text.namePlaceholder}
            required
          />
        </label>

        <label className="rsvp__field">
          <span>{text.attending}</span>
          <select
            name="attending"
            value={form.attending}
            onChange={handleChange}
          >
            <option value="yes">{text.optionYes}</option>
            <option value="maybe">{text.optionMaybe}</option>
            <option value="no">{text.optionNo}</option>
          </select>
        </label>

        <label className="rsvp__field">
          <span>{text.guests}</span>
          <input
            type="number"
            name="guests"
            min="1"
            max="10"
            value={form.guests}
            onChange={handleChange}
          />
        </label>

        <label className="rsvp__field">
          <span>{text.message}</span>
          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            placeholder={text.messagePlaceholder}
            rows={4}
          />
        </label>

        {error && <p className="rsvp__error">{error}</p>}

        <button type="submit" className="rsvp__submit" disabled={sending}>
          {sending ? text.sending : text.submit}
        </button>
      </form>
    </section>
  );
}

export default RsvpForm;
