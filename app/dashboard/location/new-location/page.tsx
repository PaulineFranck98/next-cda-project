"use client";

import Link from "next/link";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

import { ContentLayout } from "@/components/admin-panel/content-layout";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import LocationForm from "@/components/location/LocationForm";

export default function AccountPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    locationName: '',
    description: '',
    address: '',
    latitude: '',
    longitude: '',
    city: '',
    zipcode: '',
    phoneNumber: '',
    website: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/location', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const location = await response.json();
        toast.success('Ajouté avec succès', { duration: 3000 });
        router.push(`/dashboard/location/${location.id}`);
      } else {
        toast.error("Erreur lors de l'ajout", { duration: 3000 });
      }
    } catch (error) {
      console.error("Error submitting location: ", error);
      toast.error("Erreur serveur", { duration: 3000 });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ContentLayout title="Nouvel établissement">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/dashboard">Home</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/dashboard">Dashboard</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Nouvel établissement</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="mt-6">
        <LocationForm
          {...formData}
          isSubmitting={isSubmitting}
          onChange={handleChange}
          onSubmit={handleSubmit}
        />
      </div>
    </ContentLayout>
  );
}