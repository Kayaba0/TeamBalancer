import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Player } from "./PlayerCard";
import { Zap, Target } from "lucide-react";

export interface Team {
  id: string;
  name: string;
  players: Player[];
  totalStrength: number;
  color: string;
}

interface TeamsDisplayProps {
  teams: Team[];
}

export function TeamsDisplay({ teams }: TeamsDisplayProps) {
  if (teams.length === 0) return null;

  const teamStrengths = teams.map(team => team.totalStrength);
  const maxStrength = Math.max(...teamStrengths);
  const minStrength = Math.min(...teamStrengths);
  const strengthDifference = maxStrength - minStrength;
  const isBalanced = strengthDifference <= 10;

  // Layout grid responsive basato sul numero di squadre
  const getGridClasses = () => {
    switch (teams.length) {
      case 2:
        return "grid-cols-1 lg:grid-cols-2";
      case 3:
        return "grid-cols-1 md:grid-cols-2 lg:grid-cols-3";
      case 4:
        return "grid-cols-1 md:grid-cols-2 xl:grid-cols-4";
      default:
        return "grid-cols-1 lg:grid-cols-2";
    }
  };

  return (
    <section className="w-full max-w-7xl mx-auto px-4 py-6 sm:px-6 sm:py-8">
      <div className="mb-6 text-center">
        <h2 className="text-lg sm:text-xl font-medium mb-2">
          {teams.length} Squadre Generate
        </h2>
        <div className="flex items-center justify-center gap-2">
          <Target className={`w-4 h-4 ${isBalanced ? "text-green-500" : "text-yellow-500"}`} />
          <span className={`text-sm ${isBalanced ? "text-green-600 dark:text-green-400" : "text-yellow-600 dark:text-yellow-400"}`}>
            {isBalanced ? "Squadre bilanciate" : `Differenza max: ${strengthDifference} punti`}
          </span>
        </div>
      </div>

      <div className={`grid ${getGridClasses()} gap-4 sm:gap-6`}>
        {teams.map((team) => (
          <Card key={team.id} className="border-2" style={{ borderColor: team.color }}>
            {/* Header della squadra */}
            <div className="p-4 sm:p-6 pb-3 sm:pb-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2 sm:gap-3">
                  <div 
                    className="w-5 h-5 sm:w-6 sm:h-6 rounded-full flex-shrink-0" 
                    style={{ backgroundColor: team.color }}
                  ></div>
                  <h3 className="text-base sm:text-lg font-medium">{team.name}</h3>
                </div>
                
                <div className="flex items-center gap-1.5">
                  <Zap className="w-4 h-4 text-chart-1" />
                  <span className="font-medium text-chart-1 text-base tabular-nums">{team.totalStrength}</span>
                </div>
              </div>
            </div>

            {/* Lista giocatori */}
            <div className="px-4 sm:px-6 pb-4 sm:pb-6">
              <div className="space-y-2 sm:space-y-3">
                {team.players.map((player) => (
                  <div 
                    key={player.id}
                    className="flex items-center justify-between p-3 bg-muted/50 rounded-lg"
                  >
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm sm:text-base truncate">{player.name}</p>
                      <p className="text-xs text-muted-foreground">{player.role}</p>
                    </div>
                    
                    <Badge variant="outline" className="text-xs px-2 py-1 flex-shrink-0 tabular-nums">
                      {player.strength}
                    </Badge>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}