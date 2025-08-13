import { Moon, Sun } from "lucide-react";
import { Switch } from "./ui/switch";
import basketballLogo from "figma:asset/b8551905cbd5bc1b776643e85ea2e6abd3ecc465.png";

interface HeaderProps {
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
}

export function Header({ isDarkMode, onToggleDarkMode }: HeaderProps) {
  return (
    <header className="w-full px-4 py-3 sm:px-6 sm:py-4 border-b border-border">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo e icona - più piccolo su mobile */}
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center">
            <img 
              src={basketballLogo} 
              alt="Basketball Logo" 
              className="w-full h-full object-contain"
            />
          </div>
          {/* Titolo visibile solo su mobile quando centrato */}
          <h1 className="sm:hidden text-xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            TeamBalancer
          </h1>
        </div>

        {/* Titolo centrato - nascosto su mobile */}
        <div className="hidden sm:block absolute left-1/2 transform -translate-x-1/2">
          <h1 className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            TeamBalancer
          </h1>
        </div>

        {/* Toggle Dark Mode - più compatto su mobile */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          <Sun className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          <Switch
            checked={isDarkMode}
            onCheckedChange={onToggleDarkMode}
            className="data-[state=checked]:bg-primary scale-90 sm:scale-100"
          />
          <Moon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
        </div>
      </div>
    </header>
  );
}