import {
  IconTrendingDown,
  IconTrendingUp,
  IconClock,
  IconCheck,
  IconX,
} from "@tabler/icons-react"

import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export function SectionCards({ thisMonth }) {
  return (
    <div className="grid grid-cols-1 gap-4 px-4 lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">

      {/* PRESENT */}
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Present Days</CardDescription>
          <CardTitle className="text-2xl font-semibold">
            {thisMonth.present}
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <IconCheck className="mr-1" />
              Present
            </Badge>
          </CardAction>
        </CardHeader>
      </Card>

      {/* LATE */}
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Late Days</CardDescription>
          <CardTitle className="text-2xl font-semibold">
            {thisMonth.late}
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <IconClock className="mr-1" />
              Late
            </Badge>
          </CardAction>
        </CardHeader>
      </Card>

      {/* ABSENT */}
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Absent Days</CardDescription>
          <CardTitle className="text-2xl font-semibold">
            {thisMonth.absent}
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <IconX className="mr-1" />
              Absent
            </Badge>
          </CardAction>
        </CardHeader>
      </Card>

      {/* TOTAL HOURS */}
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Total Hours Worked</CardDescription>
          <CardTitle className="text-2xl font-semibold">
            {thisMonth.totalHours.toFixed(2)}
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <IconTrendingUp className="mr-1" />
              Hours
            </Badge>
          </CardAction>
        </CardHeader>
      </Card>

    </div>
  )
}
