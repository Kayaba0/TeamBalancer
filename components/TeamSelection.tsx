import { Button } from "./ui/button";
import { Users } from "lucide-react";
import { NumberOfTeams } from "../App";

interface TeamSelectionProps {
  numberOfTeams: NumberOfTeams;
  onNumberOfTeamsChange: (numberOfTeams: NumberOfTeams) => void;
}

export function TeamSelection({ numberOfTeams, onNumberOfTeamsChange }: TeamSelectionProps) {
  return (
    <section className="w-full max-w-7xl mx-auto px-4 py-4 sm:px-6">
      <div className="text-center mb-4">
        <h3 className="text-base font-medium mb-3">Numero di Squadre</h3>
        <div className="flex flex-row gap-2 justify-center items-center">
          <Button
            variant={numberOfTeams === 2 ? 'default' : 'outline'}
            size="sm"
            onClick={() => onNumberOfTeamsChange(2)}
            className="flex items-center gap-2 min-w-24"
          >
            <Users className="w-4 h-4" />
            2 Squadre
          </Button>
          <Button
            variant={numberOfTeams === 3 ? 'default' : 'outline'}
            size="sm"
            onClick={() => onNumberOfTeamsChange(3)}
            className="flex items-center gap-2 min-w-24"
          >
            <Users className="w-4 h-4" />
            3 Squadre
          </Button>
          <Button
            variant={numberOfTeams === 4 ? 'default' : 'outline'}
            size="sm"
            onClick={() => onNumberOfTeamsChange(4)}
            className="flex items-center gap-2 min-w-24"
          >
            <Users className="w-4 h-4" />
            4 Squadre
          </Button>
        </div>
      </div>
    </section>
  );
}