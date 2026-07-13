export default function DescriptionCard({ room }: any) {
    return (
        <div className="border rounded-2xl p-5 bg-card">
            <h2 className="font-bold text-xl mb-3">
                Descripción
            </h2>
            <p>
                {room.description || "Esta sala aún no tiene descripción."}
            </p>
        </div>
    );
}