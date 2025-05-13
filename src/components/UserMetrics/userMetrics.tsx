import { Card, CardContent } from "@/components/ui/card";

interface UserMetricsProps {
  totalUsers: number;
  activeUsers: number;
  inactiveUsers: number;
  avgSessionTime?: string;
}

export function UserMetrics({
  totalUsers,
  activeUsers,
  inactiveUsers,
  avgSessionTime = "31m 20s",
}: UserMetricsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[1.25rem]">
      <MetricCard label="Usuários" value={totalUsers.toString()} />
      <MetricCard label="Tempo de sessão" value={avgSessionTime} />
      <MetricCard label="Ativos" value={activeUsers.toString()} />
      <MetricCard label="Inativos" value={inactiveUsers.toString()} />
    </div>
  );
}

function MetricCard({ label, value }: { label: string; value: string }) {
  return (
    <Card className="bg-[#FAFAFA] rounded-lg">
      <CardContent className="p-[1.5rem] flex flex-col gap-[0.5rem]">
        <p className="font-sans font-normal text-[0.75rem] leading-[1] tracking-[-0.025em] text-[#71717A]">
          {label}
        </p>
        <p className="font-serif font-normal text-[1.875rem] leading-[2.25rem] tracking-tighter text-[#18181B]">
          {value}
        </p>
      </CardContent>
    </Card>
  );
}
