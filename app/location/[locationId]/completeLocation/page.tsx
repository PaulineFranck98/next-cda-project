'use client'

import React, {useState, useEffect } from 'react';
import { useUser } from '@clerk/nextjs';
import { Companion } from '@prisma/client';
import { Confort } from '@prisma/client';
import { Duration } from '@prisma/client';
import { Intensity } from '@prisma/client';
import { Theme } from '@prisma/client';
import { Type } from '@prisma/client';

const CompleteLocation: React.FC = () => {

    const [availableCompanions, setAvailableCompanions] = useState('')
    const [selectedCompanions, setSelectedCompanions] = useState('')
    const [availableConfortLevels, setAvailableConfortLevels] = useState('')
    const [selectedConfortLevel, setSelectedConfortLevel] = useState('')
    const [availableDurations, setAvailableDurations] = useState('')
    const [selectedDuration, setSelectedDuration] = useState('')
    const [availableIntensityLevels, setAvailableIntensityLevels] = useState('')
    const [selectedIntensityLevel, setSelectedIntensityLevel] = useState('')
    const [availableTypes, setAvailableTypes] = useState('')
    const [selectedType, setSelectedType] = useState('')
    const [availableThemes, setAvailableThemes] = useState('')
    const [selectedThemes, setSelectedThemes] = useState('')

    return(
        
    )

}

export default CompleteLocation