"use client";

import { ContentLayout } from "@/components/admin-panel/content-layout";
import CrudSection from "./components/CrudSection";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";

export default function AdminConfigurationPage() {
  return (
    <ContentLayout title="Configuration">
           <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/dashboard">Home</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Configuration</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <Tabs defaultValue="theme" className="w-full mt-6">
        <TabsList className="flex flex-wrap gap-2 bg-violet-50 border border-violet-200 px-2  rounded-md">
          <TabsTrigger value="theme">Thèmes</TabsTrigger>
          <TabsTrigger value="companion">Compagnons</TabsTrigger>
          <TabsTrigger value="type">Types</TabsTrigger>
          <TabsTrigger value="confort">Confort</TabsTrigger>
          <TabsTrigger value="duration">Durées</TabsTrigger>
          <TabsTrigger value="intensity">Intensités</TabsTrigger>
        </TabsList>

        <TabsContent value="theme">
          <CrudSection title="Thème" apiUrl="/api/theme" field="themeName" />
        </TabsContent>
        <TabsContent value="companion">
          <CrudSection title="Compagnon" apiUrl="/api/companion" field="companionName" />
        </TabsContent>
        <TabsContent value="type">
          <CrudSection title="Type" apiUrl="/api/type" field="typeName" />
        </TabsContent>
        <TabsContent value="confort">
          <CrudSection title="Confort" apiUrl="/api/confort" field="confortLevel" />
        </TabsContent>
        <TabsContent value="duration">
          <CrudSection title="Durée" apiUrl="/api/duration" field="onSiteTime" />
        </TabsContent>
        <TabsContent value="intensity">
          <CrudSection title="Intensité" apiUrl="/api/intensity" field="intensityLevel" />
        </TabsContent>
      </Tabs>
    </ContentLayout>
  );
}
