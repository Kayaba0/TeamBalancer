import { useState, useEffect } from "react";
import { Header } from "./components/Header";
import { PlayerList } from "./components/PlayerList";
import { ActionButtons } from "./components/ActionButtons";
import { TeamsDisplay, Team } from "./components/TeamsDisplay";
import { MatchupDisplay } from "./components/MatchupDisplay";
import { Player } from "./components/PlayerCard";
import { TeamSelection } from "./components/TeamSelection";
import { toast } from "sonner@2.0.3";
import { Toaster } from "./components/ui/sonner";

// Dati di esempio dei giocatori
const SAMPLE_PLAYERS: Player[] = [
  { id: "1", name: "Marco Rossi", role: "Playmaker", strength: 85 },
  { id: "2", name: "Luca Bianchi", role: "Guardia", strength: 78 },
  { id: "3", name: "Andrea Verdi", role: "Ala", strength: 82 },
  { id: "4", name: "Matteo Neri", role: "Centro", strength: 90 },
  { id: "5", name: "Francesco Bruno", role: "Ala", strength: 76 },
  { id: "6", name: "Davide Gialli", role: "Guardia", strength: 80 },
  { id: "7", name: "Roberto Viola", role: "Centro", strength: 88 },
  { id: "8", name: "Simone Rosa", role: "Playmaker", strength: 83 },
  { id: "9", name: "Alessandro Celeste", role: "Ala", strength: 79 },
  { id: "10", name: "Tommaso Grigio", role: "Guardia", strength: 77 },
  { id: "11", name: "Federico Oro", role: "Centro", strength: 86 },
  { id: "12", name: "Gabriele Argento", role: "Ala", strength: 81 },
];

export type MatchupCriteria = 'strength' | 'role';
export type NumberOfTeams = 2 | 3 | 4;

function balanceTeams(players: Player[], numberOfTeams: NumberOfTeams, useRandomBalance = false): Team[] {
  if (players.length < numberOfTeams * 2 || players.length % numberOfTeams !== 0) return [];

  const playersPerTeam = players.length / numberOfTeams;
  const teams: Player[][] = Array.from({ length: numberOfTeams }, () => []);
  const teamColors = ["#3B82F6", "#EF4444", "#10B981", "#F59E0B"];
  const teamNames = ["Squadra A", "Squadra B", "Squadra C", "Squadra D"];
  
  if (useRandomBalance) {
    // Per il rimescolamento, usa un approccio più randomico ma mantieni il bilanciamento
    const shuffledPlayers = [...players];
    
    // Fisher-Yates shuffle più efficace
    for (let i = shuffledPlayers.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledPlayers[i], shuffledPlayers[j]] = [shuffledPlayers[j], shuffledPlayers[i]];
    }
    
    // Distribuzione iniziale
    for (let i = 0; i < shuffledPlayers.length; i++) {
      teams[i % numberOfTeams].push(shuffledPlayers[i]);
    }
    
    // Bilancia le squadre tramite scambi intelligenti
    let attempts = 0;
    const maxAttempts = 50;
    
    while (attempts < maxAttempts) {
      const teamStrengths = teams.map(team => team.reduce((sum, p) => sum + p.strength, 0));
      const maxStrength = Math.max(...teamStrengths);
      const minStrength = Math.min(...teamStrengths);
      const strengthDiff = maxStrength - minStrength;
      
      // Se la differenza è accettabile, fermati
      if (strengthDiff <= 15) break;
      
      // Trova il miglior scambio
      let bestSwap = null;
      let bestImprovement = strengthDiff;
      
      for (let i = 0; i < numberOfTeams; i++) {
        for (let j = i + 1; j < numberOfTeams; j++) {
          for (let pi = 0; pi < teams[i].length; pi++) {
            for (let pj = 0; pj < teams[j].length; pj++) {
              // Simula lo scambio
              const newStrengthI = teamStrengths[i] - teams[i][pi].strength + teams[j][pj].strength;
              const newStrengthJ = teamStrengths[j] - teams[j][pj].strength + teams[i][pi].strength;
              
              const newTeamStrengths = [...teamStrengths];
              newTeamStrengths[i] = newStrengthI;
              newTeamStrengths[j] = newStrengthJ;
              
              const newMaxStrength = Math.max(...newTeamStrengths);
              const newMinStrength = Math.min(...newTeamStrengths);
              const newDiff = newMaxStrength - newMinStrength;
              
              if (newDiff < bestImprovement) {
                bestImprovement = newDiff;
                bestSwap = { teamI: i, teamJ: j, playerI: pi, playerJ: pj };
              }
            }
          }
        }
      }
      
      // Esegui il miglior scambio trovato
      if (bestSwap) {
        const tempPlayer = teams[bestSwap.teamI][bestSwap.playerI];
        teams[bestSwap.teamI][bestSwap.playerI] = teams[bestSwap.teamJ][bestSwap.playerJ];
        teams[bestSwap.teamJ][bestSwap.playerJ] = tempPlayer;
      } else {
        break; // Nessun miglioramento possibile
      }
      
      attempts++;
    }
  } else {
    // Algoritmo "snake draft" per distribuzione iniziale
    const sortedPlayers = [...players].sort((a, b) => b.strength - a.strength);
    
    for (let i = 0; i < sortedPlayers.length; i++) {
      const round = Math.floor(i / numberOfTeams);
      const isEvenRound = round % 2 === 0;
      
      let teamIndex;
      if (isEvenRound) {
        teamIndex = i % numberOfTeams;
      } else {
        teamIndex = numberOfTeams - 1 - (i % numberOfTeams);
      }
      
      teams[teamIndex].push(sortedPlayers[i]);
    }
  }
  
  return teams.map((teamPlayers, index) => ({
    id: `team${String.fromCharCode(65 + index)}`,
    name: teamNames[index],
    players: teamPlayers,
    totalStrength: teamPlayers.reduce((sum, p) => sum + p.strength, 0),
    color: teamColors[index]
  }));
}

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [selectedPlayerIds, setSelectedPlayerIds] = useState<string[]>([]);
  const [teams, setTeams] = useState<Team[]>([]);
  const [matchupCriteria, setMatchupCriteria] = useState<MatchupCriteria>('strength');
  const [numberOfTeams, setNumberOfTeams] = useState<NumberOfTeams>(2);

  useEffect(() => {
    // Applica/rimuovi la classe dark dal document
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  const handleTogglePlayer = (playerId: string) => {
    setSelectedPlayerIds(prev => 
      prev.includes(playerId)
        ? prev.filter(id => id !== playerId)
        : [...prev, playerId]
    );
  };

  const handleGenerateTeams = () => {
    const selectedPlayers = SAMPLE_PLAYERS.filter(p => 
      selectedPlayerIds.includes(p.id)
    );
    const newTeams = balanceTeams(selectedPlayers, numberOfTeams);
    setTeams(newTeams);
    
    if (newTeams.length > 0) {
      const teamStrengths = newTeams.map(team => team.totalStrength);
      const maxStrength = Math.max(...teamStrengths);
      const minStrength = Math.min(...teamStrengths);
      const strengthDiff = maxStrength - minStrength;
      toast.success(`${numberOfTeams} squadre generate! Differenza forza: ${strengthDiff} punti`);
    }
  };

  const handleShuffleTeams = () => {
    const selectedPlayers = SAMPLE_PLAYERS.filter(p => 
      selectedPlayerIds.includes(p.id)
    );
    // Mescola i giocatori più volte per un risultato più random
    const shuffledPlayers = [...selectedPlayers];
    for (let i = shuffledPlayers.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledPlayers[i], shuffledPlayers[j]] = [shuffledPlayers[j], shuffledPlayers[i]];
    }
    const newTeams = balanceTeams(shuffledPlayers, numberOfTeams, true);
    setTeams(newTeams);
    
    if (newTeams.length > 0) {
      const teamStrengths = newTeams.map(team => team.totalStrength);
      const maxStrength = Math.max(...teamStrengths);
      const minStrength = Math.min(...teamStrengths);
      const strengthDiff = maxStrength - minStrength;
      toast.success(`${numberOfTeams} squadre rimescolate! Differenza forza: ${strengthDiff} punti`);
    }
  };

  const handleMatchupCriteriaChange = (criteria: MatchupCriteria) => {
    setMatchupCriteria(criteria);
    toast.info(`Criteri di matching cambiati: ${criteria === 'strength' ? 'Forza' : 'Ruolo'}`);
  };

  const handleNumberOfTeamsChange = (newNumberOfTeams: NumberOfTeams) => {
    setNumberOfTeams(newNumberOfTeams);
    setTeams([]); // Reset teams when changing number
    toast.info(`Modalità cambiata: ${newNumberOfTeams} squadre`);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header 
        isDarkMode={isDarkMode}
        onToggleDarkMode={() => setIsDarkMode(!isDarkMode)}
      />
      
      <main>
        <PlayerList
          players={SAMPLE_PLAYERS}
          selectedPlayerIds={selectedPlayerIds}
          onToggleSelect={handleTogglePlayer}
        />
        
        <TeamSelection
          numberOfTeams={numberOfTeams}
          onNumberOfTeamsChange={handleNumberOfTeamsChange}
        />
        
        <ActionButtons
          selectedCount={selectedPlayerIds.length}
          numberOfTeams={numberOfTeams}
          onGenerateTeams={handleGenerateTeams}
          onShuffleTeams={handleShuffleTeams}
          hasTeams={teams.length > 0}
        />
        
        {teams.length > 0 && (
          <>
            <TeamsDisplay teams={teams} />
            {numberOfTeams === 2 && (
              <MatchupDisplay 
                teams={teams} 
                matchupCriteria={matchupCriteria}
                onMatchupCriteriaChange={handleMatchupCriteriaChange}
              />
            )}
          </>
        )}
      </main>
      <Toaster />
    </div>
  );
}