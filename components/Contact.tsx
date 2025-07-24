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
    <main className="w-full md:max-w-5xl lg:py-2 lg:px-12 mb-22 text-neutral-600">
      <div className="w-full bg-[#e0e5ec] p-8 lg:rounded-2xl ">
        <form onSubmit={handleSubmit} className="flex flex-col justify-between gap-4 mb-12">
          <div className="flex flex-col gap-4">
            <input type="text" name="name" placeholder="First & Last Name" required value={formData.name} onChange={handleChange} className="p-3 w-full rounded-xl border-none bg-[#e0e5ec] shadow-[10px_10px_30px_#c2c8d0,-10px_-10px_30px_#ffffff]" />
            <div className="flex flex-row gap-4">
              <input type="text" name="phone" placeholder="Phone #" required value={formData.phone} onChange={handleChange} className="p-3 w-full rounded-xl border-none bg-[#e0e5ec] shadow-[10px_10px_30px_#c2c8d0,-10px_-10px_30px_#ffffff]" />
              <input type="email" name="email" placeholder="Email" required value={formData.email} onChange={handleChange} className="p-3 w-full rounded-xl border-none bg-[#e0e5ec] shadow-[10px_10px_30px_#c2c8d0,-10px_-10px_30px_#ffffff]" />
            </div>
            <input type="text" name="subject" placeholder="Subject" required value={formData.subject} onChange={handleChange} className="p-3 rounded-xl border-none bg-[#e0e5ec] shadow-[10px_10px_30px_#c2c8d0,-10px_-10px_30px_#ffffff]" />
            <textarea name="message" placeholder="Message" required rows={8} value={formData.message} onChange={handleChange} className="p-3 rounded-xl border-none bg-[#e0e5ec]  resize-none shadow-[10px_10px_30px_#c2c8d0,-10px_-10px_30px_#ffffff]"  />
          </div>
          <button type="submit" className="w-full cursor-pointer mt-3 p-3 font-semibold uppercase rounded-xl bg-[#e0e5ec] shadow-[2px_2px_10px_#c2c8d0,-6px_-6px_10px_#ffffff] hover:bg-[#d6dce4] flex items-center justify-center gap-2 text-neutral-500">
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
