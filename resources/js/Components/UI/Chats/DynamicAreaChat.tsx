"use client"

import * as React from "react"
import { Maximize2, Minimize2, Calendar } from "lucide-react"
import { Area, AreaChart, CartesianGrid, XAxis, ResponsiveContainer } from "recharts"
import { cn } from "@/Utils/helpers"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
interface DynamicAreaChartProps {
  title: string
  description?: string
  data: any[]
  config: ChartConfig
  dataKey: string // e.g., "amount"
  categoryKey: string // e.g., "date"
  className?: string
}

export function DynamicAreaChart({
  title,
  description,
  data,
  config,
  dataKey,
  categoryKey,
  className
}: DynamicAreaChartProps) {
  const [isFullScreen, setIsFullScreen] = React.useState(false)
  const containerRef = React.useRef<HTMLDivElement>(null)

  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen()
      setIsFullScreen(true)
    } else {
      document.exitFullscreen()
      setIsFullScreen(false)
    }
  }

  // Sync state if user presses 'Esc'
  React.useEffect(() => {
    const handler = () => setIsFullScreen(!!document.fullscreenElement)
    document.addEventListener("fullscreenchange", handler)
    return () => document.removeEventListener("fullscreenchange", handler)
  }, [])

  return (
    <Card 
      ref={containerRef}
      className={cn(
        "transition-all duration-300",
        isFullScreen ? "fixed inset-0 z-100  rounded-none  w-screen h-screen bg-surface-container-lowest" : "w-full",
        className
      )}
    >
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-7">
        <div className="grid gap-1">
          <CardTitle className="text-xl font-black tracking-tight">{title}</CardTitle>
          <CardDescription className="text-on-surface-variant/60">{description}</CardDescription>
        </div>
        <div className="flex items-center gap-2">
           
          <button 
            onClick={toggleFullScreen}
            className="p-2 hover:bg-on-primary rounded-full transition-colors text-on-surface-variant"
          >
            {isFullScreen ? <Minimize2 className="size-5" /> : <Maximize2 className="size-5" />}
          </button>
        </div>
      </CardHeader>
      
      <CardContent className="px-2 sm:p-6">
        <ChartContainer 
          config={config} 
          className={cn(
            "aspect-auto w-full", 
            isFullScreen ? "h-[80vh]" : "h-75"
          )}
        >
          <AreaChart
            data={data}
            margin={{ left: 2, right: 2, top: 10 }}
          >
            <defs>
              <linearGradient id="fillColor" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-primary)" stopOpacity={0.3} />
                <stop offset="95%" stopColor="var(--color-secondary)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="var(--outline-variant)" opacity={0.2} />
            <XAxis
              dataKey={categoryKey}
              type="auto"
              tickLine={true}
              axisLine={true}
              tickMargin={12}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value)
                return date.toLocaleDateString("en-US", { month: "short", day: "numeric" })
              }}
              className="text-[10px] font-bold text-on-surface-variant"
            />
            <ChartTooltip
              cursor={{ stroke: 'var(--primary)', strokeWidth: 1 }}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Area
              dataKey={dataKey}
              type="bump"
              fill="url(#fillColor)"
              stroke="var(--color-primary)"
              strokeWidth={2}
              stackId="a"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}