import { Cards } from "@/client/components/examples/pages/cards/cards";
import { ChartCards } from "@/client/components/examples/pages/cards/chart-cards";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/client/components/ui/tabs";

export const ThemeComponents = () => {
  return (
    <>
      <Tabs defaultValue="components">
        <TabsList className="mb-10 grid w-full grid-cols-2">
          <TabsTrigger value="components">Components</TabsTrigger>
          <TabsTrigger value="charts">Charts</TabsTrigger>
        </TabsList>
        <TabsContent value="components">
          <Cards />
        </TabsContent>
        <TabsContent value="charts">
          <ChartCards />
        </TabsContent>
      </Tabs>
    </>
  );
};
