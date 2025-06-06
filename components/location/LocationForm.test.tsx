
//  render : pour afficher un composant de un environnement de test
//  screen : pour accéder aux éléments rendus 
//  fireEvent : pour simuler des événements utilisateur
//  waitFor : pour attendre une action asynchrone 
import { render, screen, fireEvent, waitFor } from "@testing-library/react";

//  composant à tester
import LocationForm from "@/components/location/LocationForm";

describe("Formulaire d'ajout de lieu", () => {
  
  it("permet de remplir le formulaire et de soumettre", async () => {

    //  création d'une fonction simulée (mock) pour handleSubmit
    //  jest.fn() crée une fausse fonction qui enregistre comment elle est appelée
    const handleSubmit = jest.fn((e) => e.preventDefault()); // pour éviter un vrai envoie du formulaire
    const handleChange = jest.fn(); // mock du changement

    //  affichage du formulaire pour simuler le rendu comme dans le navigateur
    render(
      <LocationForm
        locationName=""
        description=""
        address=""
        latitude=""
        longitude=""
        city=""
        zipcode=""
        phoneNumber=""
        website=""
        isSubmitting={false}
        onChange={handleChange}
        onSubmit={handleSubmit}
      />
    );

    // Simulation d'un utilisateur qui remplit les champs 

    // screen.getByLabelText : cherche un champ par son label
    // fireEvent.change : simule l'événement "change" sur un champ input 
    fireEvent.change(screen.getByLabelText(/Nom du lieu/i), {  
        target: { name: "locationName", value: "Mon super lieu" },
    });

    fireEvent.change(screen.getByLabelText(/Adresse/i), {
        target: { name: "address", value: "123 rue de test" },
    });

    fireEvent.change(screen.getByLabelText(/Code postal/i), {
        target: { name: "zipcode", value: "75000" },
    });

    fireEvent.change(screen.getByLabelText(/Ville/i), {
        target: { name: "city", value: "Paris" },
    });

    fireEvent.change(screen.getByLabelText(/Numéro de téléphone/i), {
        target: { name: "phoneNumber", value: "0123456789" },
    });

    fireEvent.change(screen.getByLabelText(/Site web/i), {
        target: { name: "website", value: "https://monsite.com" },
    });

    fireEvent.change(screen.getByLabelText(/Description/i), {
        target: { name: "description", value: "Description du lieu" },
    });

    fireEvent.change(screen.getByLabelText(/Latitude/i), {
        target: { name: "latitude", value: "48.8566" },
    });

    fireEvent.change(screen.getByLabelText(/Longitude/i), {
        target: { name: "longitude", value: "2.3522" },
    });

    // Submit le formulaire
    // screen.getByTestId : sélectionne le formulaire via data-testId
    // fireEvent.submit : simule l'envoi du formulaire
    fireEvent.submit(screen.getByTestId('location-form'));

    // Vérifie que onSubmit a bien été déclenché (que la fonction handleSUbmit a été appelée 1 fois)
    await waitFor(() => {
      expect(handleSubmit).toHaveBeenCalledTimes(1);
    });
  });
});
