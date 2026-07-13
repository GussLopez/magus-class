import {
    MessageCircle,
    Folder,
    Calendar,
    ClipboardList
} from "lucide-react";
export default function QuickActions(){
    const cards=[
        {
            title:"Chat",
            icon:MessageCircle
        },
        {
            title:"Archivos",
            icon:Folder
        },
        {
            title:"Calendario",
            icon:Calendar
        },
        {
            title:"Tareas",
            icon:ClipboardList
        }
    ];
    return(
        <div className="grid grid-cols-2 gap-4">
            {cards.map(card=>{
                const Icon=card.icon;
                return(
                    <div
                        key={card.title}
                        className="border rounded-xl p-6 hover:bg-muted cursor-pointer transition"
                    >
                        <Icon/>
                        <h3 className="font-semibold mt-4">
                            {card.title}
                        </h3>
                    </div>
                );
            })}
        </div>
    );
}