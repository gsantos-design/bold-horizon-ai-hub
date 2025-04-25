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
import { MapPin, Phone, Mail, Clock, Facebook, Linkedin, Youtube, Smartphone } from "lucide-react";

const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(50),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  interest: z.string().min(1, "Please select an area of interest"),
  message: z.string().min(10, "Message must be at least 10 characters").max(500),
});

type ContactFormInputs = z.infer<typeof contactFormSchema>;

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const {
    control,
    handleSubmit,
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
    },
  });

  const onSubmit = async (data: ContactFormInputs) => {
    setIsSubmitting(true);
    try {
      await apiRequest("POST", "/api/inquiries", data);
      toast({
        title: "Success!",
        description: "Your inquiry has been submitted. We'll contact you soon.",
        variant: "default",
      });
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
              <h3 className="font-heading font-semibold text-xl mb-4">Contact Form</h3>
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
                          <SelectItem value="career">Starting a Career with WFG</SelectItem>
                          <SelectItem value="more-info">Learning More About Compensation</SelectItem>
                          <SelectItem value="meeting">Scheduling a Meeting</SelectItem>
                          <SelectItem value="resources">Accessing Resources</SelectItem>
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
                  <Label htmlFor="message" className="block text-neutral-700 mb-2">Message</Label>
                  <Controller
                    name="message"
                    control={control}
                    render={({ field }) => (
                      <Textarea
                        id="message"
                        rows={4}
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
                  className="bg-primary hover:bg-primary-dark text-white font-semibold px-6 py-3 rounded-md transition-colors duration-300"
                >
                  {isSubmitting ? "Submitting..." : "Submit Request"}
                </Button>
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
