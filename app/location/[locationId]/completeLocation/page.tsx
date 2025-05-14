import CompleteLocation from "./CompleteLocationClient";

interface Props {
    params: { locationId: string };
}

export default function CompleteLocationPage({ params }: Props) {
    return <CompleteLocation locationId={params.locationId}/>;
}