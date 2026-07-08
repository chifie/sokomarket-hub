import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, Globe } from "lucide-react";
import { languages } from "@/lib/constants";
import { motion, AnimatePresence } from "framer-motion";

export function LanguageSelector() {
  const [currentLang, setCurrentLang] = useState(languages[0]);
  const [open, setOpen] = useState(false);

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="h-9 gap-1.5 rounded-full border border-border/40 px-3 text-xs font-medium hover:bg-accent transition-all duration-200"
        >
          <Globe className="h-3.5 w-3.5 text-muted-foreground" />
          {currentLang.code.toUpperCase()}
          <ChevronDown className="h-3 w-3 text-muted-foreground/60" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-40">
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.15 }}
            >
              {languages.map((lang) => (
                <DropdownMenuItem
                  key={lang.code}
                  onClick={() => {
                    setCurrentLang(lang);
                    setOpen(false);
                  }}
                  className={`gap-3 cursor-pointer ${
                    currentLang.code === lang.code ? "bg-primary/5 font-medium" : ""
                  }`}
                >
                  <span className="text-xs">{lang.nativeName}</span>
                  <span className="text-[10px] text-muted-foreground ml-auto">
                    {lang.name}
                  </span>
                </DropdownMenuItem>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
