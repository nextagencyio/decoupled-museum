import Header from '../components/Header'
import { Mail, Phone, MapPin, Clock } from 'lucide-react'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Contact Heritage Museum of Art & History. We\'d love to hear from you about exhibitions, group visits, or membership.',
  keywords: ['Contact Heritage Museum of Art & History', 'Support', 'Help', 'Get in Touch'],
}

export default function Contact() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Header />
      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 md:py-12 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8 text-center md:mb-12">
            <div className="mx-auto mb-6 h-px w-20 bg-gradient-to-r from-transparent via-accent-400 to-transparent" />
            <h1 className="mb-4 font-display text-3xl font-semibold md:text-4xl lg:text-5xl">Contact Us</h1>
            <p className="text-base text-slate-300 md:text-lg">
              Have questions about exhibitions, group visits, or membership? We&#39;d love to hear from you.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
            <div className="rounded-[2rem] border border-slate-800 bg-slate-900/80 p-8">
              <h2 className="mb-6 text-2xl font-semibold text-white">Get in Touch</h2>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <Mail className="w-6 h-6 text-accent-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-white">Email</h3>
                    <p className="text-slate-300">info@heritagemuseum.org</p>
                    <p className="text-slate-300">support@heritagemuseum.org</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <Phone className="w-6 h-6 text-accent-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-white">Phone</h3>
                    <p className="text-slate-300">(555) 234-5627</p>
                    <p className="text-sm text-slate-500">Monday to Friday, 9 AM - 6 PM EST</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <MapPin className="w-6 h-6 text-accent-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-white">Office</h3>
                    <p className="text-slate-300">
                      1000 Museum Mile<br />
                      Cultural District<br />
                      Philadelphia, PA 19103
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <Clock className="w-6 h-6 text-accent-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-white">Business Hours</h3>
                    <p className="text-slate-300">
                      Wednesday - Monday: 10:00 AM - 5:00 PM<br />
                      Thursday: 10:00 AM - 8:00 PM<br />
                      Tuesday: Closed
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-[2rem] border border-slate-800 bg-slate-900/80 p-8">
              <h2 className="mb-6 text-2xl font-semibold text-white">Send us a Message</h2>

              <form className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="firstName" className="mb-2 block text-sm font-medium text-slate-300">
                      First Name
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white shadow-sm outline-none transition-colors placeholder:text-slate-500 focus:border-accent-400 focus:ring-2 focus:ring-accent-500/20"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="mb-2 block text-sm font-medium text-slate-300">
                      Last Name
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white shadow-sm outline-none transition-colors placeholder:text-slate-500 focus:border-accent-400 focus:ring-2 focus:ring-accent-500/20"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="mb-2 block text-sm font-medium text-slate-300">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white shadow-sm outline-none transition-colors placeholder:text-slate-500 focus:border-accent-400 focus:ring-2 focus:ring-accent-500/20"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="mb-2 block text-sm font-medium text-slate-300">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white shadow-sm outline-none transition-colors placeholder:text-slate-500 focus:border-accent-400 focus:ring-2 focus:ring-accent-500/20"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="message" className="mb-2 block text-sm font-medium text-slate-300">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white shadow-sm outline-none transition-colors placeholder:text-slate-500 focus:border-accent-400 focus:ring-2 focus:ring-accent-500/20"
                    placeholder="Tell us how we can help you..."
                    required
                  />
                </div>

                <div>
                  <button
                    type="submit"
                    className="w-full rounded-full bg-accent-500 px-4 py-3 font-semibold uppercase tracking-[0.18em] text-slate-950 transition-colors duration-200 hover:bg-accent-400 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:ring-offset-2 focus:ring-offset-slate-950"
                  >
                    Send Message
                  </button>
                </div>
              </form>
            </div>
          </div>

          <div className="mt-8 rounded-[2rem] border border-slate-800 bg-slate-900/70 p-6 md:mt-12 md:p-8">
            <div className="text-center">
              <h2 className="mb-4 text-xl font-semibold text-white md:text-2xl">Need Immediate Help?</h2>
              <p className="mb-6 text-sm text-slate-300 md:text-base">
                Check out our documentation and community resources for quick answers to common questions.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="#"
                  className="inline-flex items-center justify-center rounded-full border border-slate-700 px-6 py-3 font-medium text-slate-200 transition-colors duration-200 hover:border-accent-400 hover:text-white"
                >
                  View Documentation
                </a>
                <a
                  href="#"
                  className="inline-flex items-center justify-center rounded-full bg-accent-500 px-6 py-3 font-medium text-slate-950 transition-colors duration-200 hover:bg-accent-400"
                >
                  Join Community
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
