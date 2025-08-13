import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Zap } from "lucide-react";

export interface Player {
  id: string;
  name: string;
  role: string;
  strength: number;
}

interface PlayerCardProps {
  player: Player;
  isSelected: boolean;
  onToggleSelect: (playerId: string) => void;
}

export function PlayerCard({ player, isSelected, onToggleSelect }: PlayerCardProps) {
  return (
    <Card 
      className={`p-4 sm:p-4 cursor-pointer transition-all duration-200 hover:shadow-lg active:scale-95 touch-manipulation ${
        isSelected 
          ? "border-primary bg-primary/5 shadow-md ring-2 ring-primary/20" 
          : "border-border hover:border-primary/50 active:border-primary"
      }`}
      onClick={() => onToggleSelect(player.id)}
    >
      <div className="flex flex-col gap-3">
        <div className="flex items-center">
          <h3 className="font-medium text-foreground text-base sm:text-sm leading-tight flex-1 min-w-0">
            {player.name}
          </h3>
        </div>
        
        <div className="flex items-center justify-between gap-2">
          <Badge variant="secondary" className="text-xs px-2 py-1 flex-shrink-0">
            {player.role}
          </Badge>
          
          <div className="flex items-center gap-1.5 text-sm">
            <Zap className="w-4 h-4 text-chart-1 flex-shrink-0" />
            <span className="font-medium text-chart-1 tabular-nums">{player.strength}</span>
          </div>
        </div>
      </div>
    </Card>
  );
}