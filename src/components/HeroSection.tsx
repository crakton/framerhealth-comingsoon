import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Loader2, MailIcon} from 'lucide-react'
import { FaFacebookF, FaInstagram, FaInstagramSquare, FaLinkedin, FaLinkedinIn } from "react-icons/fa";
import { toast } from "sonner";
import { Link } from "react-router-dom";

const HeroSection = () => {
   const [email, setEmail] = useState({ label: '', id: '' });
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
    <div className="min-h-[80vh] t-10 max-w-[95%] mx-auto bg-lightframer p-8 rounded-[50px] flex items-center justify-center">
      <div className="mx-auto text-center flex flex-col items-center gap-6">
        {/* Coming Soon Badge */}
        <div className="inline-flex items-center p-4">
          <img src="/comingsoon.svg" alt="Coming Soon" />
        </div>
 
        {/* Main Heading */}
        <h1 className="font-sans text-4xl md:text-7xl space-y-4 gap-4 font-bold text-healthcare-text mb-6 leading-loose md:leading-[5.8rem] tracking-wide">
          Premium Allied{" "}
          <span className="text-healthcare-teal">Healthcare</span>,<br />
          Thoughtfully Integrated
        </h1>

        {/* Description */}
        <p className="font-sans text-lg md:text-3xl text-healthcare-text max-w-6xl mx-auto leading-relaxed md:leading-[2.8rem] tracking-wide">
          Join our platform to access comprehensive allied health services designed to 
          modern healthcare delivery. Be the first to experience our revolutionary 
          approach to integrated care.
        </p>

        {/* Action Buttons */}
         <div className="flex flex-row bg-white rounded-full p-3 gap-2 mb-6 shadow-sm">
          {["I am a Clinician", "I am a Patient"].map((label) => (
            <button
              key={label}
              type="button"
              className={`px-6 py-2 rounded-full tracking-wide font-medium transition-colors ${
                email.label === label
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
        <form onSubmit={handleSubscribe} className="flex flex-row gap-4 max-w-full mx-auto mb-8">
          <div className="flex-1 p-3 w-full flex items-center border-2 border-healthcare-text-light rounded-full overflow-hidden focus-visible:ring-healthcare-teal">
            <MailIcon className="w-6 h-6 text-healthcare-text-light" />
            <Input
              type="email"
              placeholder="Enter your email address"
              value={email.id}
              onChange={(e) => setEmail((prev) => ({ ...prev, id: e.target.value }))}
              className="flex-1 w-fu border-none bg-transparent focus-visible:ring-none focus-visible:ring-offset-[none]"
              required
              disabled={loading}
            />
          </div>
          <button
            className="bg-healthcare-teal text-white text-xl text-bold py-2 px-4 rounded-full"
            disabled={loading}
          >
            {loading ? (<Loader2 className="animate-spin" size={24}/>) : "Subscribe"}
          </button>
        </form>

        {/* Social Links */}
        <div className="flex justify-center gap-6">
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
          <FaLinkedin size={28}/>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;