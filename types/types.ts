export interface TypeType {
    id: string;
    typeName: string;
}

export interface DurationType {
    id: string;
    onSiteTime: number;
}


export interface ConfortType {
    id: string;
    confortLevel: string;
}

export interface IntensityType {
    id: string;
    intensityLevel: string;
}

export interface DiscountType {
    id: string;
    startDate: Date;
    endDate: Date;
    percentage: number;
    code: number;
    isActive: boolean;
}

export interface ThemeLocationType {
    id: string;
    themeId?: string;
    locationId?: string;
    theme: {
      id: string;
      themeName: string;
    } | null;
  }
  
export interface CompanionLocationType {
    id: string;
    companionId?: string;
    locationId?: string;
    companion: {
        id: string;
        companionName: string;
    } | null;
}

export interface ImageType {
    id: string;
    imageName: string;
}
  
export interface LocationType {
    id: string;
    locationName: string;
    description: string; 
    address: string;
    latitude: number;
    longitude: number;
    city: string;
    zipcode: string;
    phoneNumber: string;
    website: string;
    minPrice?: number;
    maxPrice?: number;

    userId: string;

    geo?: {
        type: "Point";
        coordinates: [number, number];
    }

    type?: TypeType | null; 
    duration?: DurationType | null;   
    confort?: ConfortType | null; 
    intensity?: IntensityType | null; 

    themes: ThemeLocationType[];
    companions: CompanionLocationType[];

    images: ImageType[];
    discounts: DiscountType[];
}