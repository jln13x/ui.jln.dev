// Big shoutout to https://x.com/shadcn/ for creating this component or is the inspiration for this component

import { Separator } from "@/client/components/customizable/separator";
import * as Charts from "@/client/components/examples/pages/cards/charts/charts";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/client/components/ui/tabs";
import { cn } from "@/client/lib/cn";

export const ChartCards = () => {
  return (
    <div>
      <div className="mt-10 grid flex-1 gap-12">
        <h2 className="sr-only">Examples</h2>

        <Tabs defaultValue="area-chart">
          <TabsList className="mb-10 grid w-full grid-cols-7">
            <TabsTrigger value="area-chart">Area Chart</TabsTrigger>
            <TabsTrigger value="bar-chart">Bar Chart</TabsTrigger>
            <TabsTrigger value="line-chart">Line Chart</TabsTrigger>
            <TabsTrigger value="pie-chart">Pie Chart</TabsTrigger>
            <TabsTrigger value="radar-chart">Radar Chart</TabsTrigger>
            <TabsTrigger value="radial-chart">Radial Chart</TabsTrigger>
            <TabsTrigger value="tooltip">Tooltip</TabsTrigger>
          </TabsList>

          <TabsContent value="area-chart">
            <div
              id="area-chart"
              className="grid flex-1 scroll-mt-20 items-start gap-10 md:grid-cols-2 md:gap-6 lg:grid-cols-3 xl:gap-10"
            >
              <DemoContainer name="chart-area-default">
                <Charts.ChartAreaDefault />
              </DemoContainer>
              <DemoContainer name="chart-area-linear">
                <Charts.ChartAreaLinear />
              </DemoContainer>
              <DemoContainer name="chart-area-step">
                <Charts.ChartAreaStep />
              </DemoContainer>
              <DemoContainer name="chart-area-stacked">
                <Charts.ChartAreaStacked />
              </DemoContainer>
              <DemoContainer name="chart-area-stacked-expand">
                <Charts.ChartAreaStackedExpand />
              </DemoContainer>
              <DemoContainer name="chart-area-legend">
                <Charts.ChartAreaLegend />
              </DemoContainer>
              <DemoContainer name="chart-area-icons">
                <Charts.ChartAreaIcons />
              </DemoContainer>
              <DemoContainer name="chart-area-gradient">
                <Charts.ChartAreaGradient />
              </DemoContainer>
              <DemoContainer name="chart-area-axes">
                <Charts.ChartAreaAxes />
              </DemoContainer>
              <div className="md:col-span-2 lg:col-span-3">
                <DemoContainer name="chart-area-interactive">
                  <Charts.ChartAreaInteractive />
                </DemoContainer>
              </div>
            </div>
            <Separator />
          </TabsContent>
          <TabsContent value="bar-chart">
            <div
              id="bar-chart"
              className="grid flex-1 scroll-mt-20 items-start gap-10 md:grid-cols-2 md:gap-6 lg:grid-cols-3 xl:gap-10"
            >
              <DemoContainer name="chart-bar-default">
                <Charts.ChartBarDefault />
              </DemoContainer>
              <DemoContainer name="chart-bar-horizontal">
                <Charts.ChartBarHorizontal />
              </DemoContainer>
              <DemoContainer name="chart-bar-multiple">
                <Charts.ChartBarMultiple />
              </DemoContainer>
              <DemoContainer name="chart-bar-label">
                <Charts.ChartBarLabel />
              </DemoContainer>
              <DemoContainer name="chart-bar-label-custom">
                <Charts.ChartBarLabelCustom />
              </DemoContainer>
              <DemoContainer name="chart-bar-mixed">
                <Charts.ChartBarMixed />
              </DemoContainer>
              <DemoContainer name="chart-bar-stacked">
                <Charts.ChartBarStacked />
              </DemoContainer>
              <DemoContainer name="chart-bar-active">
                <Charts.ChartBarActive />
              </DemoContainer>
              <DemoContainer name="chart-bar-negative">
                <Charts.ChartBarNegative />
              </DemoContainer>
              <div className="md:col-span-2 lg:col-span-3">
                <DemoContainer name="chart-bar-interactive">
                  <Charts.ChartBarInteractive />
                </DemoContainer>
              </div>
            </div>
            <Separator />
          </TabsContent>
          <TabsContent value="line-chart">
            <div
              id="line-chart"
              className="grid flex-1 scroll-mt-20 items-start gap-10 md:grid-cols-2 md:gap-6 lg:grid-cols-3 xl:gap-10"
            >
              <DemoContainer name="chart-line-default">
                <Charts.ChartLineDefault />
              </DemoContainer>
              <DemoContainer name="chart-line-linear">
                <Charts.ChartLineLinear />
              </DemoContainer>
              <DemoContainer name="chart-line-step">
                <Charts.ChartLineStep />
              </DemoContainer>
              <DemoContainer name="chart-line-multiple">
                <Charts.ChartLineMultiple />
              </DemoContainer>
              <DemoContainer name="chart-line-dots">
                <Charts.ChartLineDots />
              </DemoContainer>
              <DemoContainer name="chart-line-dots-custom">
                <Charts.ChartLineDotsCustom />
              </DemoContainer>
              <DemoContainer name="chart-line-dots-colors">
                <Charts.ChartLineDotsColors />
              </DemoContainer>
              <DemoContainer name="chart-line-label">
                <Charts.ChartLineLabel />
              </DemoContainer>
              <DemoContainer name="chart-line-label-custom">
                <Charts.ChartLineLabelCustom />
              </DemoContainer>
              <div className="md:col-span-2 lg:col-span-3">
                <DemoContainer name="chart-line-interactive">
                  <Charts.ChartLineInteractive />
                </DemoContainer>
              </div>
            </div>
            <Separator />
          </TabsContent>
          <TabsContent value="pie-chart">
            <div
              id="pie-chart"
              className="grid flex-1 scroll-mt-20 items-start gap-10 md:grid-cols-2 md:gap-6 lg:grid-cols-3 xl:gap-10"
            >
              <DemoContainer name="chart-pie-simple">
                <Charts.ChartPieSimple />
              </DemoContainer>
              <DemoContainer name="chart-pie-separator-none">
                <Charts.ChartPieSeparatorNone />
              </DemoContainer>
              <DemoContainer name="chart-pie-label">
                <Charts.ChartPieLabel />
              </DemoContainer>
              <DemoContainer name="chart-pie-label-custom">
                <Charts.ChartPieLabelCustom />
              </DemoContainer>
              <DemoContainer name="chart-pie-label-list">
                <Charts.ChartPieLabelList />
              </DemoContainer>
              <DemoContainer name="chart-pie-legend">
                <Charts.ChartPieLegend />
              </DemoContainer>
              <DemoContainer name="chart-pie-donut">
                <Charts.ChartPieDonut />
              </DemoContainer>
              <DemoContainer name="chart-pie-donut-active">
                <Charts.ChartPieDonutActive />
              </DemoContainer>
              <DemoContainer name="chart-pie-donut-text">
                <Charts.ChartPieDonutText />
              </DemoContainer>
              <DemoContainer name="chart-pie-stacked">
                <Charts.ChartPieStacked />
              </DemoContainer>
              <DemoContainer name="chart-pie-interactive">
                <Charts.ChartPieInteractive />
              </DemoContainer>
            </div>
            <Separator />
          </TabsContent>
          <TabsContent value="radar-chart">
            <div
              id="radar-chart"
              className="grid flex-1 scroll-mt-20 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:gap-10"
            >
              <DemoContainer name="chart-radar-default">
                <Charts.ChartRadarDefault />
              </DemoContainer>
              <DemoContainer name="chart-radar-dots">
                <Charts.ChartRadarDots />
              </DemoContainer>
              <DemoContainer name="chart-radar-multiple">
                <Charts.ChartRadarMultiple />
              </DemoContainer>
              <DemoContainer name="chart-radar-lines-only">
                <Charts.ChartRadarLinesOnly />
              </DemoContainer>
              <DemoContainer name="chart-radar-label-custom">
                <Charts.ChartRadarLabelCustom />
              </DemoContainer>
              <DemoContainer name="chart-radar-radius">
                <Charts.ChartRadarRadius />
              </DemoContainer>
              <DemoContainer name="chart-radar-grid-custom">
                <Charts.ChartRadarGridCustom />
              </DemoContainer>
              <DemoContainer name="chart-radar-grid-fill">
                <Charts.ChartRadarGridFill />
              </DemoContainer>
              <DemoContainer name="chart-radar-grid-none">
                <Charts.ChartRadarGridNone />
              </DemoContainer>
              <DemoContainer name="chart-radar-grid-circle">
                <Charts.ChartRadarGridCircle />
              </DemoContainer>
              <DemoContainer name="chart-radar-grid-circle-no-lines">
                <Charts.ChartRadarGridCircleNoLines />
              </DemoContainer>
              <DemoContainer name="chart-radar-grid-circle-fill">
                <Charts.ChartRadarGridCircleFill />
              </DemoContainer>
              <DemoContainer name="chart-radar-legend">
                <Charts.ChartRadarLegend />
              </DemoContainer>
              <DemoContainer name="chart-radar-icons">
                <Charts.ChartRadarIcons />
              </DemoContainer>
            </div>
            <Separator />
          </TabsContent>
          <TabsContent value="radial-chart">
            <div
              id="radial-chart"
              className="grid flex-1 scroll-mt-20 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:gap-10"
            >
              <DemoContainer name="chart-radial-simple">
                <Charts.ChartRadialSimple />
              </DemoContainer>
              <DemoContainer name="chart-radial-label">
                <Charts.ChartRadialLabel />
              </DemoContainer>
              <DemoContainer name="chart-radial-grid">
                <Charts.ChartRadialGrid />
              </DemoContainer>
              <DemoContainer name="chart-radial-text">
                <Charts.ChartRadialText />
              </DemoContainer>
              <DemoContainer name="chart-radial-shape">
                <Charts.ChartRadialShape />
              </DemoContainer>
              <DemoContainer name="chart-radial-stacked">
                <Charts.ChartRadialStacked />
              </DemoContainer>
            </div>
            <Separator />
          </TabsContent>
          <TabsContent value="tooltip">
            <div
              id="tooltip"
              className="chart-wrapper grid flex-1 scroll-mt-20 items-start gap-10 md:grid-cols-2 md:gap-6 lg:grid-cols-3 xl:gap-10"
            >
              <DemoContainer name="chart-tooltip-default">
                <Charts.ChartTooltipDefault />
              </DemoContainer>
              <DemoContainer name="chart-tooltip-indicator-line">
                <Charts.ChartTooltipIndicatorLine />
              </DemoContainer>
              <DemoContainer name="chart-tooltip-indicator-none">
                <Charts.ChartTooltipIndicatorNone />
              </DemoContainer>
              <DemoContainer name="chart-tooltip-label-custom">
                <Charts.ChartTooltipLabelCustom />
              </DemoContainer>
              <DemoContainer name="chart-tooltip-label-formatter">
                <Charts.ChartTooltipLabelFormatter />
              </DemoContainer>
              <DemoContainer name="chart-tooltip-label-none">
                <Charts.ChartTooltipLabelNone />
              </DemoContainer>
              <DemoContainer name="chart-tooltip-formatter">
                <Charts.ChartTooltipFormatter />
              </DemoContainer>
              <DemoContainer name="chart-tooltip-icons">
                <Charts.ChartTooltipIcons />
              </DemoContainer>
              <DemoContainer name="chart-tooltip-advanced">
                <Charts.ChartTooltipAdvanced />
              </DemoContainer>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

function DemoContainer({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { name?: string }) {
  return (
    <div
      className={cn(
        "flex items-center justify-center [&>div]:w-full",
        className,
      )}
      {...props}
    />
  );
}
