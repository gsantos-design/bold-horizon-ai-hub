import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";

export default function CompensationStructure() {
  return (
    <section id="compensation" className="mb-16">
      <div className="text-center mb-10">
        <h2 className="font-heading font-bold text-3xl text-primary mb-2">Commission Structure</h2>
        <p className="text-neutral-600 max-w-3xl mx-auto">
          As you progress through our ranks, your commission percentage increases, providing greater earning potential.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <Card className="shadow-lg">
          <CardHeader className="bg-primary text-white p-4">
            <CardTitle className="font-heading font-semibold text-xl">
              Commission Percentages by Rank
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <Table>
              <TableHeader>
                <TableRow className="border-b-2 border-neutral-300">
                  <TableHead className="py-3 text-left">Rank</TableHead>
                  <TableHead className="py-3 text-right">Commission</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow className="border-b border-neutral-200">
                  <TableCell className="py-3">Training Associate</TableCell>
                  <TableCell className="py-3 text-right font-mono text-secondary font-semibold">30%</TableCell>
                </TableRow>
                <TableRow className="border-b border-neutral-200">
                  <TableCell className="py-3">Associate</TableCell>
                  <TableCell className="py-3 text-right font-mono text-secondary font-semibold">45%</TableCell>
                </TableRow>
                <TableRow className="border-b border-neutral-200">
                  <TableCell className="py-3">Senior Associate</TableCell>
                  <TableCell className="py-3 text-right font-mono text-secondary font-semibold">55%</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="py-3">Marketing Director</TableCell>
                  <TableCell className="py-3 text-right font-mono text-secondary font-semibold">62%</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card className="shadow-lg">
          <CardHeader className="bg-primary text-white p-4">
            <CardTitle className="font-heading font-semibold text-xl">
              Commission Payout Methods
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="mb-4">
              <h4 className="font-heading font-semibold text-lg mb-2">Advanced Commission Option 1</h4>
              <ul className="list-disc pl-5 space-y-1">
                <li>Submit application with premium</li>
                <li>Receive 40% advance within one week</li>
                <li>Remaining 60% after policy delivery</li>
              </ul>
            </div>
            
            <div className="mb-4">
              <h4 className="font-heading font-semibold text-lg mb-2">Advanced Commission Option 2</h4>
              <ul className="list-disc pl-5 space-y-1">
                <li>Submit trial application (no premium)</li>
                <li>Deliver approved policy with payment authorization</li>
                <li>Receive 100% commission advance within one week</li>
              </ul>
            </div>

            <div>
              <h4 className="font-heading font-semibold text-lg mb-2">Renewals</h4>
              <p>3-5% for approximately 15 years with Transamerica</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="shadow-lg mb-12">
        <CardHeader className="bg-primary text-white p-4">
          <CardTitle className="font-heading font-semibold text-xl">
            Points Calculation System
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h4 className="font-heading font-semibold text-lg mb-3">Transamerica</h4>
              <div className="space-y-2">
                <p><span className="font-semibold">Premium:</span> $100 monthly = $1,200 annual</p>
                <p><span className="font-semibold">Commission (62%):</span> $1,200 × 62% = $744</p>
                <p><span className="font-semibold">Points:</span> $1,200 × 1.25 = 1,500 points</p>
              </div>
            </div>
            
            <div>
              <h4 className="font-heading font-semibold text-lg mb-3">Other Insurance Companies</h4>
              <div className="space-y-2">
                <p><span className="font-semibold">Premium:</span> $100 monthly = $1,200 annual</p>
                <p><span className="font-semibold">Commission (variable):</span> Based on contract level</p>
                <p><span className="font-semibold">Points:</span> Same as annual premium (1,200 points)</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-lg">
        <CardHeader className="bg-primary text-white p-4">
          <CardTitle className="font-heading font-semibold text-xl">
            Rollover Opportunities
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <p className="mb-4">Many of our teams have ambitious rollover goals for 2025—around $20 million. Here's how rollover compensation works:</p>
          
          <Table>
            <TableHeader>
              <TableRow className="border-b-2 border-neutral-300">
                <TableHead className="py-3 text-left">Detail</TableHead>
                <TableHead className="py-3 text-right">Value</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow className="border-b border-neutral-200">
                <TableCell className="py-3">Average payout to WFG</TableCell>
                <TableCell className="py-3 text-right font-mono text-secondary font-semibold">6%</TableCell>
              </TableRow>
              <TableRow className="border-b border-neutral-200">
                <TableCell className="py-3">$100,000 rollover at Marketing Director level (50%)</TableCell>
                <TableCell className="py-3 text-right font-mono text-secondary font-semibold">$3,000 commission</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="py-3">Chargeback risk</TableCell>
                <TableCell className="py-3 text-right font-mono text-success font-semibold">Minimal to None</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </section>
  );
}
