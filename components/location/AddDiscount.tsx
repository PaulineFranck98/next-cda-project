import React, {useState} from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

const AddDiscount: React.FC = () => {

    const router = useRouter();

    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [percentage, setPercentage] = useState('');
    const [code, setCode] = useState('');
    const [isActive, setIsActive] = useState(false);

    const [isSubmitting, setIsSubmitting] = useState(false);


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const discountPayload = {
              startDate,
              endDate,
              percentage,
              code,
              isActive,
            };

            console.log("discountPayload : ", discountPayload)

            const response = await fetch('/api/discount', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify(discountPayload),
            });

            if(response.ok)
            {
                const discount = await response.json();
                router.push(`/dashboard/location/${location.id}`)
            }
        } catch(error){
            console.error("Error submitting discount: ", error);
            toast.error("Erreur lors de l'ajout", { duration: 3000,  style: { background: '#FFC8C9' } });
        } finally {
            toast.success('Ajouté avec succès', { duration: 3000 });
            setIsSubmitting(false);
        }
    }

    return(    
        <div className="mx-auto  max-w-5xl">
            <h1 className="text-2xl font-bold mb-6 text-center">Ajouter une promotion</h1>
            <form onSubmit={handleSubmit} className="flex flex-col gap-6 items-center">
                <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-6 w-full mx-auto">           
                    <div className="flex flex-col gap-2">
                        <label htmlFor="locationName">Date de début</label>
                        <input
                            id="locationName"
                            type="text"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                            required
                            className="bg-gray-100 rounded-md border border-gray-300 h-9 px-3"
                        />
                    </div>
                
                    <div className="flex flex-col gap-2">
                        <label htmlFor="address">Date de fin</label>
                        <input
                            id="address"
                            type="text"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            required
                            className="bg-gray-100 rounded-md border border-gray-300 h-9 px-3"
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label htmlFor="zipcode">Code postal</label>
                        <input
                            id="zipcode"
                            type="text"
                            value={zipcode}
                            onChange={(e) => setZipcode(e.target.value)}
                            required
                            className="bg-gray-100 rounded-md border border-gray-300 h-9 px-3"
                        />
                    </div> 
                    <div className="flex flex-col gap-2">
                        <label htmlFor="city">Ville</label>
                        <input
                            id="city"
                            type="text"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            required
                            className="bg-gray-100 rounded-md border border-gray-300 h-9 px-3"
                        />
                    </div>                
                    <div className="flex flex-col gap-2">
                        <label htmlFor="phoneNumber">Numéro de téléphone</label>
                        <input
                            id="phoneNumber"
                            type="text"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            required
                            className="bg-gray-100 rounded-md border border-gray-300 h-9 px-3"
                        />
                    </div>       
                    <div className="flex flex-col gap-2">
                        <label htmlFor="website">Site web</label>
                        <input
                            id="website"
                            type="text"
                            value={website}
                            onChange={(e) => setWebsite(e.target.value)}
                            required
                            className="bg-gray-100 rounded-md border border-gray-300 h-9 px-3"
                        />
                    </div>              
                    <div className="flex flex-col gap-2 lg:col-span-2">
                        <label htmlFor="description">Description</label>
                        <textarea
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                            rows={4}
                            className="bg-gray-100 rounded-md resize-none border border-gray-300 px-3 py-2"
                        />
                    </div>   
                      {/* TODO hide section  */}
                    <div className="">
                        <label htmlFor="latitude">Latitude</label>
                        <input
                            id="latitude"
                            type="number"
                            value={latitude}
                            onChange={(e) => setLatitude(e.target.value)}
                        />
                    </div>
                    <div className="">
                        <label htmlFor="longitude">Longitude</label>
                        <input
                            id="longitude"
                            type="number"
                            value={longitude}
                            onChange={(e) => setLongitude(e.target.value)}
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



 