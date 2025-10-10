/// <reference types="jest" />

import { calculateCompletion } from "./location-completion"; 
import { LocationType } from "@/types/types";

describe("calculateCompletion", () => {
  it("Doit retourner 0 si aucun champ n'est rempli", () => {
    const location: LocationType = {
      id: "1",
      userId: "user123",
      locationName: "",
      description: "",
      address: "",
      latitude: 0,
      longitude: 0,
      city: "",
      zipcode: "",
      phoneNumber: "",
      website: "",
      type: undefined,
      duration: undefined,
      minPrice: undefined,
      maxPrice: undefined,
      confort: undefined,
      intensity: undefined,
      images: [],
      themes: [],
      companions: [],
      discounts:[]
    };

    expect(calculateCompletion(location)).toBe(0);
  });

  it("Doit retourner 100 si tous les champs sont remplis", () => {
    const location: LocationType = {
        id: "2",
        userId: "user123",
        locationName: "Test Place",
        description: "Nice",
        address: "123 Street",
        latitude: 45.0,
        longitude: 6.0,
        city: "City",
        zipcode: "12345",
        phoneNumber: "123456789",
        website: "https://example.com",
        type: { id: "1", typeName: "Détente" },
        duration: { id: "2", onSiteTime: 2 },
        minPrice: 3,
        maxPrice: 50,
        confort: {id: "4", confortLevel: "Niveau 2"},
        intensity: { id: "5", intensityLevel: "Niveau 2" },
        images: [
            { id: "img1", imageName: "image1.jpg" },
        ],
        themes: [
            {
            id: "themeLoc1",
            themeId: "theme1",
            locationId: "loc1",
            theme: {
                id: "theme1",
                themeName: "Nature",
            },
            },
        ],
        companions: [
            {
            id: "companionLoc1",
            companionId: "companion1",
            locationId: "loc1",
            companion: {
                id: "companion1",
                companionName: "Famille",
            },
            },
        ],
        discounts: [{
            id: "6",
            percentage: 70,
            code: 10,
            startDate:new Date("2025-10-10"),
            endDate:new Date("2025-12-10"),
            isActive: false,
        }],
        };
        expect(calculateCompletion(location)).toBe(100);
    });

  it("Doit calculer le bon pourcentage", () => {
    const location: LocationType = {
      id: "3",
      userId: "user123",
      locationName: "Test Place",
      description: "",
      address: "",
      latitude: 0,
      longitude: 0,
      city: "City",
      zipcode: "12345",
      phoneNumber: "",
      website: "",
      type: undefined,
      duration: undefined,
      minPrice: undefined,
      maxPrice: undefined,
      confort: undefined,
      intensity: undefined,
      images: [],
      themes: [],
      companions: [],
      discounts: [],
    };
    expect(calculateCompletion(location)).toBeGreaterThan(0);
  });
});
