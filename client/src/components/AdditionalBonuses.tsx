import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DollarSign, CircleDollarSign } from "lucide-react";

export default function AdditionalBonuses() {
  return (
    <section id="bonuses" className="mb-16">
      <Card className="shadow-lg">
        <CardHeader className="bg-primary text-white p-6">
          <CardTitle className="font-heading font-bold text-3xl mb-2">
            Additional Bonuses
          </CardTitle>
          <CardDescription className="text-white opacity-90">
            WFG offers multiple bonus programs to enhance your earnings potential.
          </CardDescription>
        </CardHeader>
        
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-heading font-semibold text-xl mb-4">Bonus Programs</h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <li className="bg-neutral-100 p-3 rounded-md">Base shop bonus</li>
                <li className="bg-neutral-100 p-3 rounded-md">Super base bonus</li>
                <li className="bg-neutral-100 p-3 rounded-md">Super team bonus</li>
                <li className="bg-neutral-100 p-3 rounded-md">Advisory base bonus</li>
                <li className="bg-neutral-100 p-3 rounded-md">Advisory super base bonus</li>
                <li className="bg-neutral-100 p-3 rounded-md">Advisory super team bonus</li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-heading font-semibold text-xl mb-4">Consistency Bonuses</h3>
              <div className="space-y-4">
                <div className="flex items-start p-4 bg-neutral-100 rounded-md">
                  <DollarSign className="text-secondary h-6 w-6 mr-3" />
                  <div>
                    <p className="font-semibold">$8,000 Quarterly Bonus</p>
                    <p>Maintain 50,000 points for three consecutive months</p>
                  </div>
                </div>
                
                <div className="flex items-start p-4 bg-neutral-100 rounded-md">
                  <CircleDollarSign className="text-secondary h-6 w-6 mr-3" />
                  <div>
                    <p className="font-semibold">$16,000 Quarterly Bonus</p>
                    <p>Maintain 100,000 points for three consecutive months</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-8">
            <h3 className="font-heading font-semibold text-xl mb-4">Executive Bonuses</h3>
            <Table>
              <TableHeader>
                <TableRow className="border-b-2 border-neutral-300">
                  <TableHead className="py-3 text-left">Level</TableHead>
                  <TableHead className="py-3 text-left">Bonus Type</TableHead>
                  <TableHead className="py-3 text-right">Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow className="border-b border-neutral-200">
                  <TableCell className="py-3">EVC</TableCell>
                  <TableCell className="py-3">Annual Bonus</TableCell>
                  <TableCell className="py-3 text-right font-mono text-secondary font-semibold">$10,000-$25,000</TableCell>
                </TableRow>
                <TableRow className="border-b border-neutral-200">
                  <TableCell className="py-3">SCBC</TableCell>
                  <TableCell className="py-3">Annual Bonus + Presidential Rolex</TableCell>
                  <TableCell className="py-3 text-right font-mono text-secondary font-semibold">$50,000-$200,000</TableCell>
                </TableRow>
                <TableRow className="border-b border-neutral-200">
                  <TableCell className="py-3">FC</TableCell>
                  <TableCell className="py-3">Team Override</TableCell>
                  <TableCell className="py-3 text-right">Additional 21 basis points</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="py-3">EC</TableCell>
                  <TableCell className="py-3">Company-Wide Override</TableCell>
                  <TableCell className="py-3 text-right">Additional 13 basis points</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
