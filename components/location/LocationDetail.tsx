import BaseInfoCard from './BaseInfoCard';
import AdvancedInfoCard from './AdvancedInfoCard';
import { LocationType } from '@/types/types';
import { calculateCompletion } from '@/lib/utils/locationCompletion';
import ProgressBar from '../ui/progress-bar';

interface LocationDetailProps {
  location: LocationType | null;
}

const LocationDetail = ({ location }: LocationDetailProps) => {

    if(!location){ return null; }

    const completion = calculateCompletion(location)
  return (
    <div>
      {location && (
        <div className="max-w-5xl mx-auto p-6 space-y-8">
            <div className='space-y-2'>
                <h2 className='text-md font-semibold'>
                    Vous avez complété {completion}% des informations
                </h2>
                <ProgressBar completion={completion} />
            </div>
          <BaseInfoCard location={location} />
          <AdvancedInfoCard location={location} />
        </div>
      )}
    </div>
  );
};

export default LocationDetail;

