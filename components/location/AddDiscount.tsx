import React, {useState} from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

interface Props {
    locationId: string;
}

const AddDiscount: React.FC<Props> = ({ locationId }) => {

    const router = useRouter();

    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [percentage, setPercentage] = useState('');
    const [code, setCode] = useState('');

    const [isSubmitting, setIsSubmitting] = useState(false);


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const discountPayload = {
                locationId,
                startDate,
                endDate,
                percentage: parseInt(percentage, 10),
                code: code,
            };
 
            const response = await fetch(`/api/discount`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify(discountPayload),
            });

            if(response.ok)
            {
                toast.success('Ajouté avec succès', { duration: 3000 });
                router.push(`/dashboard/location/${locationId}`)
            } else {
                toast.error("Erreur lors de l'ajout", { duration: 3000, style: { background: '#FFC8C9' } });
            }
        } catch(error){
            console.error("Error submitting discount: ", error);
            toast.error("Erreur lors de l'ajout", { duration: 3000,  style: { background: '#FFC8C9' } });
        } finally {
            
            setIsSubmitting(false);
        }
    }

    return(    
        <div className="mx-auto  max-w-5xl">
            <h1 className="text-2xl font-bold mb-6 text-center">Ajouter une promotion</h1>
            <form onSubmit={handleSubmit} className="flex flex-col gap-6 items-center">
                <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-6 w-full mx-auto">           
                    <div className="flex flex-col gap-2">
                        <label htmlFor="percentage">Pourcentage de remise</label>
                        <input
                            id="percentage"
                            type="number"
                            value={percentage}
                            onChange={(e) => setPercentage(e.target.value)}
                            required
                            min={1}
                            max={100}
                            className="bg-gray-100 rounded-md border border-gray-300 h-9 px-3"
                        />
                    </div> 
                    <div className="flex flex-col gap-2">
                        <label htmlFor="code">Code</label>
                        <input
                            id="code"
                            type="text"
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                            required
                            className="bg-gray-100 rounded-md border border-gray-300 h-9 px-3"
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label htmlFor="startDate">Date de début</label>
                        <input
                            id="startDate"
                            type="date"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                            required
                            className="bg-gray-100 rounded-md border border-gray-300 h-9 px-3"
                        />
                    </div>
                
                    <div className="flex flex-col gap-2">
                        <label htmlFor="endDate">Date de fin</label>
                        <input
                            id="endDate"
                            type="date"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                            required
                            className="bg-gray-100 rounded-md border border-gray-300 h-9 px-3"
                        />
                    </div>                
                 
                </div>        
               <div className="mt-6 flex justify-center">
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="bg-violet-800 text-white px-6 py-3 rounded-md disabled:opacity-50 cursor-pointer hover:opacity-80 transition-all"
                        >
                            {isSubmitting ? 'Enregistrement ...' : 'Enregistrer'}
                    </button>            
                </div>
            </form>
        </div>
    )
}

export default AddDiscount



 