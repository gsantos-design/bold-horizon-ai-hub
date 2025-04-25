import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function TeamBuilding() {
  const incomeData = [
    { name: 'Training Associate', income: 3600 },
    { name: 'Associate', income: 5400 },
    { name: 'Senior Associate', income: 6600 },
    { name: 'Marketing Director', income: 7400 },
    { name: 'Senior Marketing Director', income: 9600 },
  ];

  return (
    <section id="team-building" className="mb-16">
      <div className="text-center mb-10">
        <h2 className="font-heading font-bold text-3xl text-primary mb-2">
          Life-Changing Income Through Team Building
        </h2>
        <p className="text-neutral-600 max-w-3xl mx-auto">
          The real power of WFG comes from building a successful team. Our associates in the Caribbean, Florida, 
          and New York have transformed their financial futures by following our proven system.
        </p>
        <div className="mt-4 max-w-xl mx-auto bg-accent/10 p-3 rounded-md">
          <p className="text-sm text-accent-dark font-semibold">
            Your income potential grows exponentially as you build your team, allowing you to escape 
            the time-for-money trap of traditional careers.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <Card className="shadow-lg col-span-1 md:col-span-2">
          <CardHeader className="bg-primary text-white p-4">
            <CardTitle className="font-heading font-semibold text-xl">
              Marketing Director Team Income Example
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <p className="mb-4">
              As a Marketing Director at 62% contract level with 10,000 annual premium, you earn $6,200 personally. But the real power comes from building a team of four solid producers:
            </p>
            
            <Table>
              <TableHeader>
                <TableRow className="border-b-2 border-neutral-300">
                  <TableHead className="py-3 text-left">Team Member</TableHead>
                  <TableHead className="py-3 text-center">Production</TableHead>
                  <TableHead className="py-3 text-center">Override</TableHead>
                  <TableHead className="py-3 text-right">Monthly Income</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow className="border-b border-neutral-200">
                  <TableCell className="py-3">Training Associate</TableCell>
                  <TableCell className="py-3 text-center">10,000 premium</TableCell>
                  <TableCell className="py-3 text-center">+32%</TableCell>
                  <TableCell className="py-3 text-right font-mono text-secondary font-semibold">$3,200</TableCell>
                </TableRow>
                <TableRow className="border-b border-neutral-200">
                  <TableCell className="py-3">Associate</TableCell>
                  <TableCell className="py-3 text-center">10,000 premium</TableCell>
                  <TableCell className="py-3 text-center">+17%</TableCell>
                  <TableCell className="py-3 text-right font-mono text-secondary font-semibold">$1,700</TableCell>
                </TableRow>
                <TableRow className="border-b border-neutral-200">
                  <TableCell className="py-3">Senior Associate</TableCell>
                  <TableCell className="py-3 text-center">10,000 premium</TableCell>
                  <TableCell className="py-3 text-center">+7%</TableCell>
                  <TableCell className="py-3 text-right font-mono text-secondary font-semibold">$700</TableCell>
                </TableRow>
                <TableRow className="border-b border-neutral-200">
                  <TableCell className="py-3">Training Associate</TableCell>
                  <TableCell className="py-3 text-center">10,000 premium</TableCell>
                  <TableCell className="py-3 text-center">+32%</TableCell>
                  <TableCell className="py-3 text-right font-mono text-secondary font-semibold">$3,200</TableCell>
                </TableRow>
                <TableRow className="border-b border-neutral-200">
                  <TableCell className="py-3 font-semibold">Personal Production</TableCell>
                  <TableCell className="py-3 text-center">10,000 premium</TableCell>
                  <TableCell className="py-3 text-center">62%</TableCell>
                  <TableCell className="py-3 text-right font-mono text-secondary font-semibold">$6,200</TableCell>
                </TableRow>
                <TableRow className="bg-neutral-100">
                  <TableCell className="py-3 font-semibold" colSpan={3}>Total Monthly Income</TableCell>
                  <TableCell className="py-3 text-right font-mono text-secondary font-bold">$15,000</TableCell>
                </TableRow>
                <TableRow className="bg-neutral-100">
                  <TableCell className="py-3 font-semibold" colSpan={3}>Total Annual Income</TableCell>
                  <TableCell className="py-3 text-right font-mono text-secondary font-bold">$180,000</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card className="shadow-lg">
          <CardHeader className="bg-primary text-white p-4">
            <CardTitle className="font-heading font-semibold text-xl">
              Your Action Plan
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <p className="mb-4">Success in this business requires consistent execution:</p>
            
            <ol className="list-decimal pl-5 mb-6 space-y-2">
              <li>Book 10 kitchen table presentations weekly</li>
              <li>Expect 50% to cancel</li>
              <li>Close 50% of the appointments you conduct</li>
              <li>Target $1,000 in monthly premium</li>
              <li>Create one new Top 25 list weekly</li>
            </ol>
            
            <div className="p-4 bg-neutral-100 rounded-md">
              <h4 className="font-heading font-semibold text-lg mb-2">Monthly Income Potential</h4>
              <div className="space-y-1">
                <p><span className="font-semibold">Training Associate:</span> $3,600</p>
                <p><span className="font-semibold">Associate:</span> $5,400</p>
                <p><span className="font-semibold">Senior Associate:</span> $6,600</p>
                <p><span className="font-semibold">Marketing Director:</span> $7,400</p>
                <p><span className="font-semibold">Senior Marketing Director:</span> $9,600</p>
              </div>
            </div>

            <div className="mt-4 h-60">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={incomeData}
                  margin={{
                    top: 5,
                    right: 10,
                    left: 0,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" tick={{ fontSize: 10 }} />
                  <YAxis />
                  <Tooltip formatter={(value) => `$${value}`} />
                  <Bar dataKey="income" fill="#1A4785" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="shadow-lg">
        <CardHeader className="bg-primary text-white p-4">
          <CardTitle className="font-heading font-semibold text-xl">
            SMD Earnings Potential
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h4 className="font-heading font-semibold text-lg mb-3">Base Shop Income</h4>
              <div className="space-y-2 mb-4">
                <p><span className="font-semibold">Personal commission (80%):</span> $16,000</p>
                <p><span className="font-semibold">Team override (35% avg on 30,000 pts):</span> $10,500</p>
                <p><span className="font-semibold">3% SMD bonus:</span> $1,500</p>
                <p><span className="font-semibold">Total monthly:</span> <span className="font-mono text-secondary font-bold">$28,000</span></p>
                <p><span className="font-semibold">Total annually:</span> <span className="font-mono text-secondary font-bold">$336,000</span></p>
              </div>
            </div>
            
            <div>
              <h4 className="font-heading font-semibold text-lg mb-3">Expanded Organization</h4>
              <div className="space-y-2 mb-4">
                <p><span className="font-semibold">Base shop monthly income:</span> $28,000</p>
                <p><span className="font-semibold">3 additional SMDs ($8,500 override each):</span> $25,500</p>
                <p><span className="font-semibold">Total monthly:</span> <span className="font-mono text-secondary font-bold">$53,500</span></p>
                <p><span className="font-semibold">Total annually:</span> <span className="font-mono text-secondary font-bold">$642,000</span></p>
              </div>
              <p className="text-neutral-600">Building ten key SMDs can generate over $1.5 million annually!</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
