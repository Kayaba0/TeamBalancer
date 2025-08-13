import { PlayerCard, Player } from "./PlayerCard";

interface PlayerListProps {
  players: Player[];
  selectedPlayerIds: string[];
  onToggleSelect: (playerId: string) => void;
}

export function PlayerList({ players, selectedPlayerIds, onToggleSelect }: PlayerListProps) {
  return (
    <section className="w-full max-w-7xl mx-auto px-4 py-6 sm:px-6 sm:py-8">
      <div className="mb-6">
        <h2 className="text-lg sm:text-xl font-medium mb-2">Seleziona Giocatori</h2>
        <p className="text-muted-foreground text-sm sm:text-base">
          Seleziona i giocatori che parteciperanno al match 
          <span className="block sm:inline sm:ml-1">
            ({selectedPlayerIds.length} selezionati)
          </span>
        </p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
        {players.map((player) => (
          <PlayerCard
            key={player.id}
            player={player}
            isSelected={selectedPlayerIds.includes(player.id)}
            onToggleSelect={onToggleSelect}
          />
        ))}
      </div>
    </section>
  );
}