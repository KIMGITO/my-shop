import React, { useEffect, useState } from "react";
import axios from "axios";
import { DynamicAreaChart } from "@/Components/UI/Chats/DynamicAreaChat";
import { cn } from "@/lib/utils";
import { ChartRangeSelector } from "./ChartRangeSelector";
import { format, subDays } from "date-fns";

export default function FinancialChart() {
    const [chartData, setChartData] = useState([]);
    const [loading, setLoading] = useState(true);

    const [range, setRange] = useState("7d");
    const [dateRange, setDateRange] = useState({
        from: subDays(new Date(), 7),
        to: new Date(),
    });

    useEffect(() => {
        if (range === "7d")
            setDateRange({ from: subDays(new Date(), 7), to: new Date() });
        if (range === "30d")
            setDateRange({ from: subDays(new Date(), 30), to: new Date() });
        if (range === "90d")
            setDateRange({ from: subDays(new Date(), 90), to: new Date() });
        if (range === "1y")
            setDateRange({ from: subDays(new Date(), 365), to: new Date() });
    }, [range]);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                // Example API: /api/analytics/expenses?range=30d
                const response = await axios.get(`/api/v1/admin/chart/income`, {
                    params: {
                        start: format(dateRange.from, "yyyy-MM-dd"),
                        end: format(dateRange.to, "yyyy-MM-dd"),
                    },
                });
                setChartData(response.data);
            } catch (err) {
                console.error("Failed to load data");
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [dateRange]);

    const config = {
        amount: {
            label: "Income",
            color: "hsl(var(--primary))",
        },
    };

    return (
        <div className="p-0 space-y-4">
            {/* Time Range Selector */}
            <ChartRangeSelector range={range} setRange={setRange} dateRange={dateRange} setDateRange={setDateRange} />

            {!loading ? (
                <DynamicAreaChart
                    title="Income"
                    description={`Visualizing income for the last  ${range}`}
                    data={chartData}
                    config={config}
                    dataKey="amount"
                    categoryKey="date"
                />
            ) : (
                <div>Loading</div>
            )}
        </div>
    );
}
