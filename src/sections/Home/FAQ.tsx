import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

const faqs = [
  {
    question: "What services do you offer exactly?",
    answer: "We offer professional digital services including video editing (YouTube, cinematic, shorts), photo editing (retouching, color grading), logo design, graphic design (social media, branding assets), and web development using modern technologies like React and TypeScript."
  },
  {
    question: "How long does a typical project take?",
    answer: "The timeline depends on the complexity of the project. Video edits can take anywhere from 3 to 10 days, while a full branding package or custom web development project can take 4 to 8 weeks. We'll provide a clear timeline during our initial consultation."
  },
  {
    question: "Can you handle ongoing work or retainers?",
    answer: "Yes, many of our clients work with us on a retainer basis for consistent video content creation, monthly design support, or ongoing web maintenance. We offer customized packages to suit your long-term needs."
  },
  {
    question: "Do you offer revisions?",
    answer: "Absolutely! We want you to be 100% satisfied with the result. Our standard packages typically include 2-3 rounds of revisions, but this can be adjusted based on the specific project scope."
  },
  {
    question: "How do we start a project?",
    answer: "The easiest way is to click the 'Start a Project' button and fill out our contact form. We'll get back to you within 24-48 hours to schedule a discovery call and discuss your vision in more detail."
  }
]

const FAQItem = ({ question, answer, isOpen, onClick }: { question: string, answer: string, isOpen: boolean, onClick: () => void }) => {
  return (
    <div className={cn(
      "border border-white/5 rounded-2xl overflow-hidden transition-all duration-300",
      isOpen ? "bg-white/5 border-mocha/20" : "bg-transparent hover:bg-white/5 hover:border-white/10"
    )}>
      <button
        onClick={onClick}
        className="w-full p-6 flex items-center justify-between text-left focus:outline-none"
      >
        <span className={cn(
          "text-lg font-bold transition-colors",
          isOpen ? "text-mocha" : "text-white/80"
        )}>
          {question}
        </span>
        <div className={cn(
          "w-8 h-8 rounded-full border border-white/10 flex items-center justify-center transition-all duration-300",
          isOpen ? "rotate-180 bg-mocha/10 border-mocha/30 text-mocha" : "text-white/40"
        )}>
          <ChevronDown className="w-5 h-5" />
        </div>
      </button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <div className="px-6 pb-6 text-white/60 leading-relaxed">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section className="py-20 bg-background relative overflow-hidden">
      {/* Decorative Glow */}
      <div className="absolute top-1/2 -right-40 w-80 h-80 bg-mocha/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 md:px-12 max-w-4xl relative z-10">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
            Frequently Asked <span className="text-mocha">Questions</span>
          </h2>
          <p className="text-white/60 text-lg">
            Find answers to common questions about our creative process, 
            timelines, and services.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <FAQItem
              key={index}
              question={faq.question}
              answer={faq.answer}
              isOpen={openIndex === index}
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default FAQ
