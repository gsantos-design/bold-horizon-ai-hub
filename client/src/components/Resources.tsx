import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { FileText, Calculator, Users, PlayCircle, Calendar, Headset } from "lucide-react";

type ResourceItemProps = {
  icon: React.ReactNode;
  title: string;
  description: string;
  actionLink: string;
  actionText: string;
};

function ResourceItem({ icon, title, description, actionLink, actionText }: ResourceItemProps) {
  return (
    <div className="border border-neutral-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
      <div className="bg-neutral-100 p-4 flex items-center">
        {icon}
        <h3 className="font-heading font-semibold text-lg">{title}</h3>
      </div>
      <div className="p-4">
        <p className="mb-4 text-neutral-600">{description}</p>
        <a 
          href={actionLink} 
          className="inline-flex items-center text-primary font-semibold hover:text-primary-dark"
        >
          {actionText} <span className="ml-1">→</span>
        </a>
      </div>
    </div>
  );
}

export default function Resources() {
  const resources = [
    {
      icon: <FileText className="text-primary h-6 w-6 mr-3" />,
      title: "Compensation Guide",
      description: "Complete breakdown of the WFG compensation structure and bonus programs.",
      actionLink: "#",
      actionText: "Download PDF",
    },
    {
      icon: <Calculator className="text-primary h-6 w-6 mr-3" />,
      title: "Commission Spreadsheet",
      description: "Advanced Excel tool for tracking your sales, commissions, and team overrides.",
      actionLink: "#",
      actionText: "Download Excel",
    },
    {
      icon: <Users className="text-primary h-6 w-6 mr-3" />,
      title: "Recruitment Kit",
      description: "Templates and scripts to help you build your team more effectively.",
      actionLink: "#",
      actionText: "Download ZIP",
    },
    {
      icon: <PlayCircle className="text-primary h-6 w-6 mr-3" />,
      title: "Training Videos",
      description: "Comprehensive video library covering sales techniques, product knowledge, and team building.",
      actionLink: "#",
      actionText: "Access Library",
    },
    {
      icon: <Calendar className="text-primary h-6 w-6 mr-3" />,
      title: "Event Calendar",
      description: "Stay updated on upcoming training sessions, webinars, and recognition events.",
      actionLink: "#",
      actionText: "View Calendar",
    },
    {
      icon: <Headset className="text-primary h-6 w-6 mr-3" />,
      title: "Support Resources",
      description: "Contact information for various departments and technical support.",
      actionLink: "#",
      actionText: "View Directory",
    },
  ];

  return (
    <section id="resources" className="mb-16">
      <Card className="shadow-lg">
        <CardHeader className="bg-primary text-white p-6">
          <CardTitle className="font-heading font-bold text-3xl mb-2">
            Resources
          </CardTitle>
          <CardDescription className="text-white opacity-90">
            Access tools and materials to help you succeed.
          </CardDescription>
        </CardHeader>
        
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {resources.map((resource, index) => (
              <ResourceItem key={index} {...resource} />
            ))}
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
