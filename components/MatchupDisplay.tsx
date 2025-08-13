import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Team } from "./TeamsDisplay";
import { Player } from "./PlayerCard";
import { ArrowLeftRight, Zap, Users } from "lucide-react";
import { MatchupCriteria } from "../App";

interface Matchup {
  playerA: Player;
  playerB: Player;
  difference: number;
}

interface MatchupDisplayProps {
  teams: Team[];
  matchupCriteria: MatchupCriteria;
  onMatchupCriteriaChange: (criteria: MatchupCriteria) => void;
}

function createMatchups(teamA: Player[], teamB: Player[], criteria: MatchupCriteria): Matchup[] {
  let sortedA: Player[];
  let sortedB: Player[];

  if (criteria === 'strength') {
    // Ordina i giocatori per forza (dal più forte al più debole)
    sortedA = [...teamA].sort((a, b) => b.strength - a.strength);
    sortedB = [...teamB].sort((a, b) => b.strength - a.strength);
  } else {
    // Raggruppa e ordina i giocatori per ruolo
    const roleOrder = ['Centro', 'Ala', 'Guardia', 'Playmaker'];
    
    sortedA = [...teamA].sort((a, b) => {
      const roleIndexA = roleOrder.indexOf(a.role);
      const roleIndexB = roleOrder.indexOf(b.role);
      if (roleIndexA !== roleIndexB) {
        return roleIndexA - roleIndexB;
      }
      // Se stesso ruolo, ordina per forza
      return b.strength - a.strength;
    });
    
    sortedB = [...teamB].sort((a, b) => {
      const roleIndexA = roleOrder.indexOf(a.role);
      const roleIndexB = roleOrder.indexOf(b.role);
      if (roleIndexA !== roleIndexB) {
        return roleIndexA - roleIndexB;
      }
      // Se stesso ruolo, ordina per forza
      return b.strength - a.strength;
    });
  }
  
  // Assicurati che entrambe le squadre abbiano lo stesso numero di giocatori
  const minLength = Math.min(sortedA.length, sortedB.length);
  
  return sortedA.slice(0, minLength).map((playerA, index) => {
    const playerB = sortedB[index];
    return {
      playerA,
      playerB,
      difference: Math.abs(playerA.strength - playerB.strength)
    };
  });
}

export function MatchupDisplay({ teams, matchupCriteria, onMatchupCriteriaChange }: MatchupDisplayProps) {
  if (teams.length !== 2) return null;

  const matchups = createMatchups(teams[0].players, teams[1].players, matchupCriteria);
  const averageDifference = matchups.reduce((sum, m) => sum + m.difference, 0) / matchups.length;

  return (
    <section className="w-full max-w-7xl mx-auto px-4 py-6 sm:px-6 sm:py-8">
      <div className="mb-6 text-center">
        <h2 className="text-lg sm:text-xl font-medium mb-2">Associazione Marcature</h2>
        <p className="text-muted-foreground text-sm mb-4">
          Matchup ottimizzati per equilibrio
          <br className="sm:hidden" />
          <span className="sm:ml-1">• Differenza media: {averageDifference.toFixed(1)} punti</span>
        </p>
        
        {/* Pulsanti per selezionare il criterio di matching */}
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 justify-center items-center">
          <span className="text-sm font-medium text-foreground">Criteri di matching:</span>
          <div className="flex gap-2">
            <Button
              variant={matchupCriteria === 'strength' ? 'default' : 'outline'}
              size="sm"
              onClick={() => onMatchupCriteriaChange('strength')}
              className="flex items-center gap-2"
            >
              <Zap className="w-4 h-4" />
              Forza
            </Button>
            <Button
              variant={matchupCriteria === 'role' ? 'default' : 'outline'}
              size="sm"
              onClick={() => onMatchupCriteriaChange('role')}
              className="flex items-center gap-2"
            >
              <Users className="w-4 h-4" />
              Ruolo
            </Button>
          </div>
        </div>
      </div>

      <Card className="p-4 sm:p-6">
        <div className="space-y-3 sm:space-y-4">
          {matchups.map((matchup, index) => {
            const roleMatch = matchup.playerA.role === matchup.playerB.role;
            
            return (
              <div 
                key={index}
                className="p-3 sm:p-4 bg-muted/30 rounded-lg border border-border/50"
              >
                {/* Layout mobile: stack verticale */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  {/* Giocatore Squadra A */}
                  <div className="flex items-center gap-3 flex-1">
                    <div className="w-3 h-3 rounded-full flex-shrink-0 bg-blue-500"></div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm sm:text-base truncate">{matchup.playerA.name}</p>
                      <p className="text-xs text-muted-foreground">{matchup.playerA.role}</p>
                    </div>
                    <Badge variant="outline" className="text-xs px-2 py-1 flex-shrink-0 tabular-nums">
                      {matchup.playerA.strength}
                    </Badge>
                  </div>

                  {/* Versus e Status - mobile - RIMOSSO IL PALLINO CENTRALE */}
                  <div className="flex items-center justify-center gap-3 sm:gap-4 py-2 sm:py-0 sm:px-6">
                    <ArrowLeftRight className="w-4 h-4 text-muted-foreground rotate-90 sm:rotate-0" />
                    <span className="text-xs font-medium text-muted-foreground tabular-nums">
                      ±{matchup.difference}
                    </span>
                    {matchupCriteria === 'role' && roleMatch && (
                      <Badge variant="secondary" className="text-xs px-1.5 py-0.5">
                        Stesso ruolo
                      </Badge>
                    )}
                  </div>

                  {/* Giocatore Squadra B */}
                  <div className="flex items-center gap-3 flex-1 sm:flex-row-reverse">
                    <div className="flex-1 min-w-0 sm:text-right">
                      <div className="flex items-center gap-2 sm:justify-end">
                        <p className="font-medium text-sm sm:text-base truncate">{matchup.playerB.name}</p>
                        <div className="w-3 h-3 rounded-full flex-shrink-0 bg-red-500"></div>
                      </div>
                      <p className="text-xs text-muted-foreground">{matchup.playerB.role}</p>
                    </div>
                    <Badge variant="outline" className="text-xs px-2 py-1 flex-shrink-0 tabular-nums">
                      {matchup.playerB.strength}
                    </Badge>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Informazioni sui criteri */}
        <div className="mt-6 pt-4 border-t border-border">
          {matchupCriteria === 'strength' && (
            <p className="text-xs text-muted-foreground text-center">
              I matchup sono basati sulla forza dei giocatori - i più forti marcano i più forti.
            </p>
          )}
          
          {matchupCriteria === 'role' && (
            <p className="text-xs text-muted-foreground text-center">
              I matchup sono basati sul ruolo dei giocatori - Centro vs Centro, Ala vs Ala, ecc.
            </p>
          )}
        </div>
      </Card>
    </section>
  );
}