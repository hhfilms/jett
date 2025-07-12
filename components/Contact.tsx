"use client";
import {useState} from "react";
import {Send, Loader} from "lucide-react";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [isSending, setIsSending] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);
    setStatusMessage("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        console.error("Server error:", data.error || "Unknown error");
        setStatusMessage("There was an error sending your message.");
      } else {
        console.log("Email sent successfully!");
        setStatusMessage("Message sent successfully!");
        setFormData({name: "", email: "", subject: "", message: "", phone: ""});
      }
    } catch (err) {
      console.error("Network or parsing error:", err);
      setStatusMessage("There was a network error. Please try again.");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <main className="p-4 lg:p-0 flex-grow flex justify-center text-neutral-600">
      <div className="w-full max-w-4xl">
        <form onSubmit={handleSubmit} className="flex flex-col justify-between gap-4 font-extralight mb-12">
          <div className="flex flex-col gap-8">
            <input type="text" name="name" placeholder="First & Last Name" required value={formData.name} onChange={handleChange} className="p-3 bg-gray-200 w-full" />
            <div className="flex flex-row gap-4">
              <input type="text" name="phone" placeholder="Phone #" required value={formData.name} onChange={handleChange} className="p-3 bg-gray-200 w-full" />
              <input type="email" name="email" placeholder="Email" required value={formData.email} onChange={handleChange} className="p-3 bg-gray-200 w-full" />
            </div>
            <input type="text" name="subject" placeholder="Subject" required value={formData.subject} onChange={handleChange} className="p-3 bg-gray-200" />
            <textarea name="message" placeholder="Message" required rows={8} value={formData.message} onChange={handleChange} className="p-3 bg-gray-200 resize-none" />
          </div>
          <button type="submit" className="text-neutral-50 mx-auto text-sm font-semibold py-4 px-12 uppercase bg-secondary hover:opacity-70 flex items-center justify-center gap-2">
            {isSending ? (
              <Loader className="animate-spin" />
            ) : (
              <>
                Send Message <Send size={24} strokeWidth={1} />
              </>
            )}
          </button>
        </form>
        {statusMessage && <p className="text-center mt-4 text-sm text-green-600">{statusMessage}</p>}
      </div>
    </main>
  );
}
