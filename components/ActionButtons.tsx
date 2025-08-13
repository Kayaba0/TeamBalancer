import { Button } from "./ui/button";
import { Users, Shuffle } from "lucide-react";
import { NumberOfTeams } from "../App";

interface ActionButtonsProps {
  selectedCount: number;
  numberOfTeams: NumberOfTeams;
  onGenerateTeams: () => void;
  onShuffleTeams: () => void;
  hasTeams: boolean;
}

export function ActionButtons({ 
  selectedCount, 
  numberOfTeams,
  onGenerateTeams, 
  onShuffleTeams, 
  hasTeams 
}: ActionButtonsProps) {
  const canGenerate = selectedCount >= numberOfTeams * 2 && selectedCount % numberOfTeams === 0;

  const getValidationMessage = () => {
    if (selectedCount === 0) return "";
    
    if (selectedCount < numberOfTeams * 2) {
      return `Seleziona almeno ${numberOfTeams * 2} giocatori per ${numberOfTeams} squadre`;
    }
    
    if (selectedCount % numberOfTeams !== 0) {
      return `Seleziona un numero di giocatori divisibile per ${numberOfTeams}`;
    }
    
    return "";
  };

  return (
    <section className="w-full max-w-7xl mx-auto px-4 py-4 sm:px-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:gap-4 justify-center items-stretch sm:items-center">
        <Button
          onClick={onGenerateTeams}
          disabled={!canGenerate}
          size="lg"
          className="w-full sm:w-auto sm:min-w-48 h-12 sm:h-12 text-base font-medium touch-manipulation"
        >
          <Users className="w-5 h-5 mr-2 flex-shrink-0" />
          Genera {numberOfTeams} Squadre
        </Button>
        
        {hasTeams && (
          <Button
            onClick={onShuffleTeams}
            variant="outline"
            size="lg"
            className="w-full sm:w-auto sm:min-w-48 h-12 sm:h-12 text-base font-medium touch-manipulation"
          >
            <Shuffle className="w-5 h-5 mr-2 flex-shrink-0" />
            Rimescola Squadre
          </Button>
        )}
      </div>
      
      {!canGenerate && selectedCount > 0 && (
        <div className="text-center text-sm text-muted-foreground mt-4 px-4">
          {getValidationMessage()}
        </div>
      )}
    </section>
  );
}