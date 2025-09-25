import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Loader2, MailIcon } from 'lucide-react'
import { FaFacebookF, FaInstagram, FaLinkedin } from "react-icons/fa";
import { toast } from "sonner";
import { Link } from "react-router-dom";

const HeroSection = () => {
  const [email, setEmail] = useState({ label: 'I am a Clinician', id: '' });
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();

    // Ensure action selection
    if (!email.label) {
      toast("Please select if you are a Clinician or Patient.");
      return;
    }

    setLoading(true);

    try {
      // Fetch existing subscribers
      const res = await fetch("https://framerhealth-cs-default-rtdb.firebaseio.com/subscribers.json");
      const data = await res.json();

      // Check for duplicate email
      const isDuplicate = data
        ? Object.values<any>(data).some(
          (subscriber) =>
            subscriber.id &&
            subscriber.id.trim().toLowerCase() === email.id.trim().toLowerCase()
        )
        : false;

      if (isDuplicate) {
        toast("This email is already subscribed.");
        setLoading(false);
        return;
      }

      // Add new subscriber
      const response = await fetch("https://framerhealth-cs-default-rtdb.firebaseio.com/subscribers.json", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(email),
      });

      if (response.ok) {
        toast("Subscription successful");
        setEmail({ label: '', id: '' });
      } else {
        toast("Subscription failed");
        console.error("Subscription failed", response);
      }
    } catch (error) {
      toast("Error subscribing");
      console.error("Error subscribing:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="t-10 w-11/12 mx-auto bg-lightframer p-8 rounded-3xl">
      <div className="mx-auto text-center flex flex-col items-center gap-6 w-full">
        {/* Coming Soon Badge */}
        <div className="inline-flex items-center p-4">
          <img src="/comingsoon.svg" alt="Coming Soon" />
        </div>

        <div className="w-full md:w-9/12 mx-auto">
          {/* Main Heading */}
          <h1 className="mx-auto text-black font-montserrat-semibold text-2xl md:text-7xl text-healthcare-text mb-6 leading-tight md:leading-[5.8rem] tracking-wide">
            Premium Allied <span className="text-healthcare-teal font-montserrat-semibold">Healthcare</span>,<br className="hidden md:inline" />
            <span className="block md:inline font-montserrat-semibold">Thoughtfully Integrated</span>
          </h1>

          {/* Description */}
          <p className="text-black font-montserrat text-md md:text-3xl text-healthcare-text mx-auto leading-relaxed md:leading-[2.8rem] tracking-wide md:px-4">
            Join our platform to access comprehensive allied health services designed to
            modern healthcare delivery. Be the first to experience our revolutionary
            approach to integrated care.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="text-black flex flex-row bg-white rounded-full p-3 gap-2 mb-6 shadow-md">
          {["I am a Clinician", "I am a Patient"].map((label) => (
            <button
              key={label}
              type="button"
              className={`px-6 font-montserrat-semibold py-2 rounded-full tracking-wider text-xs md:text-lg md:text-balance font-medium transition-colors ${email.label === label
                  ? "bg-healthcare-teal text-white"
                  : "bg-transparent text-healthcare-text"
                }`}
              onClick={() => setEmail((prev) => ({ ...prev, label }))}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Email Subscription */}
        <form
          onSubmit={handleSubscribe}
          className="text-black flex flex-col md:flex-row justify-center items-center gap-4 w-full mx-auto mb-8"
        >
          <div className="flex items-center border border-healthcare-text-light rounded-full overflow-hidden focus-within:border-2 min-w-0 gap-3 w-full md:w-7/12 lg:w-4/12">
            <MailIcon className="w-5 h-5 md:w-6 md:h-6 text-healthcare-text-light ml-3" />
            <input
              type="email"
              placeholder="Enter your email address"
              value={email.id}
              onChange={(e) => setEmail((prev) => ({ ...prev, id: e.target.value }))}
              className="flex-1 border-none bg-transparent placeholder:text-healthcare-text-light font-montserrat-semibold tracking-wider text-sm md:text-base lg:text-lg placeholder:text-xs md:placeholder:text-base lg:placeholder:text-lg focus-visible:outline-none min-w-0 py-3 md:py-4 px-2"
              required
              disabled={loading}
            />
          </div>
          <button
            className="bg-healthcare-teal text-white font-montserrat-semibold py-3 md:py-4 px-6 md:px-8 rounded-full w-full md:w-auto text-base md:text-lg lg:text-xl flex justify-center items-center"
            disabled={loading}
            type="submit"
          >
            {loading ? <Loader2 className="animate-spin" size={24} /> : "Subscribe"}
          </button>
        </form>

        {/* Social Links */}
        <div className="flex justify-center gap-8">
          {/* Facebook */}
          <Link
            to="#"
            aria-label="Facebook"
            className="text-healthcare-text-light hover:text-healthcare-teal transition-colors"
          >
            <FaFacebookF size={28} />
          </Link>
          {/* Instagram */}
          <Link
            to="#"
            aria-label="Instagram"
            className="text-healthcare-text-light hover:text-healthcare-teal transition-colors"
          >
            <FaInstagram size={28} />
          </Link>
          {/* LinkedIn */}
          <Link
            to="#"
            aria-label="LinkedIn"
            className="text-healthcare-text-light hover:text-healthcare-teal transition-colors"
          >
            <FaLinkedin size={28} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;