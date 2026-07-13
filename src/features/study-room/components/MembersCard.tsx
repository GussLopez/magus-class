"use client";

import { Crown } from "lucide-react";

export default function MembersCard({ members }: any) {

  return (

    <div className="border rounded-2xl p-5 bg-card">

      <h2 className="font-bold text-xl mb-5">

        Participantes ({members.length})

      </h2>

      <div className="space-y-4">

        {members.map((member: any) => (

          <div
            key={member.profiles.id}
            className="flex justify-between items-center"
          >

            <div>

              <p className="font-semibold">

                {member.profiles.name} {member.profiles.last_name}

              </p>

              <p className="text-sm text-muted-foreground">

                {member.profiles.email}

              </p>

            </div>

            {member.role === "owner" ? (

              <Crown className="text-yellow-500"/>

            ) : (

              <span className="text-sm">

                Miembro

              </span>

            )}

          </div>

        ))}

      </div>

    </div>

  );

}