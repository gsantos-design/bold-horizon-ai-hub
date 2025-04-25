import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { 
  MapPin, Phone, Mail, Clock, Facebook, Linkedin, Youtube, Smartphone,
  DollarSign, Zap, Award, Calendar, Users, CheckCircle, ChevronRight
} from "lucide-react";
import { interestOptions } from "@/lib/constants";

const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(50),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  interest: z.string().min(1, "Please select an area of interest"),
  message: z.string().min(10, "Message must be at least 10 characters").max(500),
  region: z.string().optional(),
  callTime: z.string().optional(),
});

type ContactFormInputs = z.infer<typeof contactFormSchema>;

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formStep, setFormStep] = useState(1);
  const { toast } = useToast();

  const {
    control,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<ContactFormInputs>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      interest: "",
      message: "",
      region: "florida",
      callTime: "morning",
    },
  });

  const selectedInterest = watch("interest");
  
  const getInterestMessage = (interest: string) => {
    switch(interest) {
      case "career":
        return "Great choice! Building your own WFG business can lead to financial independence and unlimited income potential.";
      case "more-info":
        return "Smart move! Understanding your income potential is the first step toward financial transformation.";
      case "meeting":
        return "Excellent! Personal consultations are the fastest way to get your specific questions answered.";
      case "social-presentation":
        return "Perfect! Our group presentations are informative, inspiring, and a great way to get started.";
      case "resources":
        return "We have comprehensive recruitment materials to help you build your team successfully.";
      default:
        return "Thanks for your interest! We'll help you with any questions you might have.";
    }
  };

  const nextStep = () => {
    setFormStep(2);
  };

  const prevStep = () => {
    setFormStep(1);
  };

  const onSubmit = async (data: ContactFormInputs) => {
    setIsSubmitting(true);
    try {
      await apiRequest("POST", "/api/inquiries", data);
      toast({
        title: "Success!",
        description: "Your inquiry has been submitted. We'll contact you soon.",
        variant: "default",
      });
      setIsSuccess(true);
      reset();
    } catch (error) {
      toast({
        title: "Error",
        description: "There was a problem submitting your inquiry. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="mb-16">
      <Card className="shadow-lg">
        <CardHeader className="bg-primary text-white p-6">
          <CardTitle className="font-heading font-bold text-3xl mb-2">
            Get Started Today
          </CardTitle>
          <CardDescription className="text-white opacity-90">
            Ready to build your future with WFG? Contact us for more information.
          </CardDescription>
        </CardHeader>
        
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-heading font-semibold text-xl mb-4">Begin Your Financial Transformation</h3>
              <div className="bg-neutral-100 p-4 rounded-lg mb-4">
                <p className="text-sm text-neutral-700">
                  Join our growing team of associates and leaders in the Caribbean, Florida, and New York regions. 
                  Complete the form below to learn how you can transform your financial future with WFG.
                </p>
              </div>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-4">
                  <Label htmlFor="name" className="block text-neutral-700 mb-2">Your Name</Label>
                  <Controller
                    name="name"
                    control={control}
                    render={({ field }) => (
                      <Input
                        id="name"
                        className="w-full p-3 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                        {...field}
                      />
                    )}
                  />
                  {errors.name && (
                    <p className="text-destructive text-sm mt-1">{errors.name.message}</p>
                  )}
                </div>
                
                <div className="mb-4">
                  <Label htmlFor="email" className="block text-neutral-700 mb-2">Email Address</Label>
                  <Controller
                    name="email"
                    control={control}
                    render={({ field }) => (
                      <Input
                        id="email"
                        type="email"
                        className="w-full p-3 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                        {...field}
                      />
                    )}
                  />
                  {errors.email && (
                    <p className="text-destructive text-sm mt-1">{errors.email.message}</p>
                  )}
                </div>
                
                <div className="mb-4">
                  <Label htmlFor="phone" className="block text-neutral-700 mb-2">Phone Number</Label>
                  <Controller
                    name="phone"
                    control={control}
                    render={({ field }) => (
                      <Input
                        id="phone"
                        type="tel"
                        className="w-full p-3 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                        {...field}
                      />
                    )}
                  />
                  {errors.phone && (
                    <p className="text-destructive text-sm mt-1">{errors.phone.message}</p>
                  )}
                </div>
                
                <div className="mb-4">
                  <Label htmlFor="interest" className="block text-neutral-700 mb-2">I'm Interested In:</Label>
                  <Controller
                    name="interest"
                    control={control}
                    render={({ field }) => (
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger className="w-full p-3 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary">
                          <SelectValue placeholder="Select an option" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="career">Building My Own WFG Business</SelectItem>
                          <SelectItem value="more-info">Learning About Income Potential</SelectItem>
                          <SelectItem value="meeting">Scheduling a Personal Consultation</SelectItem>
                          <SelectItem value="social-presentation">Attending a Group Presentation</SelectItem>
                          <SelectItem value="resources">Recruitment Materials</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  />
                  {errors.interest && (
                    <p className="text-destructive text-sm mt-1">{errors.interest.message}</p>
                  )}
                </div>
                
                <div className="mb-6">
                  <Label htmlFor="message" className="block text-neutral-700 mb-2">Tell us about your goals</Label>
                  <Controller
                    name="message"
                    control={control}
                    render={({ field }) => (
                      <Textarea
                        id="message"
                        rows={4}
                        placeholder="What are your financial goals? Are you looking for part-time income or building a full-time business? Let us know how we can help you achieve your dreams."
                        className="w-full p-3 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                        {...field}
                      />
                    )}
                  />
                  {errors.message && (
                    <p className="text-destructive text-sm mt-1">{errors.message.message}</p>
                  )}
                </div>
                
                <Button 
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-accent hover:bg-accent-dark text-white font-semibold px-6 py-3 rounded-md transition-colors duration-300 w-full"
                >
                  {isSubmitting ? "Submitting..." : "Start My Financial Transformation"}
                </Button>
                <p className="text-xs text-center text-neutral-500 mt-2">
                  We typically respond within 24 hours to schedule your consultation.
                </p>
              </form>
            </div>
            
            <div>
              <h3 className="font-heading font-semibold text-xl mb-4">Connect With Us</h3>
              <div className="space-y-6">
                <div className="flex items-start">
                  <MapPin className="text-primary h-6 w-6 mr-3" />
                  <div>
                    <h4 className="font-semibold text-lg">Office Location</h4>
                    <p className="text-neutral-600">
                      WFG Financial Headquarters<br />
                      11200 Rockville Pike, Suite 500<br />
                      Rockville, MD 20852
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Phone className="text-primary h-6 w-6 mr-3" />
                  <div>
                    <h4 className="font-semibold text-lg">Phone</h4>
                    <p className="text-neutral-600">(800) 555-0123</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Mail className="text-primary h-6 w-6 mr-3" />
                  <div>
                    <h4 className="font-semibold text-lg">Email</h4>
                    <p className="text-neutral-600">careers@wfgfinancial.com</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Clock className="text-primary h-6 w-6 mr-3" />
                  <div>
                    <h4 className="font-semibold text-lg">Business Hours</h4>
                    <p className="text-neutral-600">
                      Monday - Friday: 9:00 AM - 6:00 PM<br />
                      Saturday: 10:00 AM - 2:00 PM<br />
                      Sunday: Closed
                    </p>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold text-lg mb-3">Follow Us</h4>
                  <div className="flex space-x-4">
                    <a href="#" className="text-primary hover:text-primary-dark transition-colors duration-300">
                      <Facebook className="h-6 w-6" />
                    </a>
                    <a href="#" className="text-primary hover:text-primary-dark transition-colors duration-300">
                      <Linkedin className="h-6 w-6" />
                    </a>
                    <a href="#" className="text-primary hover:text-primary-dark transition-colors duration-300">
                      <Youtube className="h-6 w-6" />
                    </a>
                    <a href="#" className="text-primary hover:text-primary-dark transition-colors duration-300">
                      <Smartphone className="h-6 w-6" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
