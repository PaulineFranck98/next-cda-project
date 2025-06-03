
import { DiscountType } from '@/types/types';
import { formatDate } from '@/lib/utils/utils';


// peut-être pas utile ??

interface DiscountDetailProps {
  discount: DiscountType | null;
}

const DiscountDetail = ({ discount }: DiscountDetailProps) => {

    if(!discount){ return null; }

  return (
    <div>
      {discount && (
        <div className="max-w-5xl mx-auto p-6 space-y-8">
            <div className='space-y-2'>
                <h2 className='text-md font-semibold'>
                   Réduction
                </h2>
                <p>Date de début : {formatDate(discount.startDate)}</p>
                <p>Date de fin : {formatDate(discount.endDate)}</p>
                <p>Pourcentage : {discount.percentage}%</p>
                <p>Code promotionnel : {discount.code}</p>
            </div>
        
        </div>
      )}
    </div>
  );
};

export default DiscountDetail;
