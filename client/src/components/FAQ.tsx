import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useLanguage } from "@/lib/LanguageContext";

export default function FAQ() {
  const { t } = useLanguage();

  const faqs = [
    {
      question: "What is World Financial Group (WFG)?",
      answer: "World Financial Group (WFG) is a leading financial services company that provides comprehensive financial solutions including life insurance, retirement planning, and investment services. We help families and individuals secure their financial future through personalized planning and professional guidance."
    },
    {
      question: "Why Should I Talk to a WFG Agent?",
      answer: "Our agents are trained professionals who can help you understand your financial options and create a customized plan that fits your specific needs and goals. We provide unbiased advice and access to products from multiple top-rated insurance companies."
    },
    {
      question: "Why join WFG?",
      answer: "WFG offers an exceptional opportunity to build your own financial services business with unlimited income potential, flexible scheduling, comprehensive training, and ongoing support. You can help families while building financial security for yourself."
    },
    {
      question: "How do I join WFG?",
      answer: "Getting started with WFG is simple. Contact us to schedule an interview, complete our licensing process, and begin your training. We provide all the tools and support you need to succeed in the financial services industry."
    },
    {
      question: "Where does WFG conduct business?",
      answer: "WFG operates across the United States and Canada, with thousands of agents serving communities nationwide. We have a strong presence in all major metropolitan areas and growing rural markets."
    },
    {
      question: "How long does it take to become a licensed agent with WFG?",
      answer: "The licensing process typically takes 2-4 weeks, depending on your state requirements and how quickly you complete the necessary training and examinations. We provide comprehensive support throughout the entire process."
    },
    {
      question: "What types of providers and other companies are available through WFG?",
      answer: "WFG partners with over 20 top-rated insurance companies and financial service providers, giving you access to a wide range of products to meet your clients' diverse needs. This includes term life, whole life, universal life insurance, and retirement solutions."
    },
    {
      question: "How is WFGIA regulated?",
      answer: "World Financial Group Insurance Agency (WFGIA) is regulated by state insurance departments in each state where we operate. We maintain all required licenses and comply with strict regulatory standards to protect our clients and agents."
    },
    {
      question: "How large is WFGIA?",
      answer: "WFGIA is one of the largest insurance agencies in North America, with thousands of licensed agents serving hundreds of thousands of clients. Our size gives us the resources and stability to provide exceptional service and competitive products."
    },
    {
      question: "Who owns WFGIA?",
      answer: "WFGIA is owned by Transamerica Corporation, a leading provider of life insurance, retirement, and investment solutions. This relationship provides us with financial strength and access to innovative products and services."
    },
    {
      question: "Who is President of WFG?",
      answer: "WFG is led by an experienced executive team with decades of experience in the financial services industry. Our leadership is committed to helping agents succeed and serving families across North America."
    },
    {
      question: "When was the company founded?",
      answer: "WFG was founded in 1991 and has been helping families build financial security for over 30 years. Our long history demonstrates our commitment to stability and excellence in the financial services industry."
    },
    {
      question: "Does WFG go by other names?",
      answer: "WFG operates under several related names including World Financial Group Insurance Agency (WFGIA), WFG National Title Company, and other subsidiary companies that provide specialized financial services."
    },
    {
      question: "What is FIQ?",
      answer: "FIQ (Financial Independence Quotient) is our proprietary assessment tool that helps determine your current financial situation and creates a personalized roadmap to achieve financial independence. It's a comprehensive analysis that guides our recommendations."
    }
  ];

  return (
    <section className="bg-white py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
            Frequently Asked Questions
          </h2>
          
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="border border-gray-200 rounded-lg px-6 bg-gray-50"
              >
                <AccordionTrigger className="text-left hover:no-underline py-6">
                  <span className="font-semibold text-gray-900">{faq.question}</span>
                </AccordionTrigger>
                <AccordionContent className="pb-6">
                  <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}