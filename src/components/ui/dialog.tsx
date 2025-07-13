import * as React from "react"
import { X } from "lucide-react"

interface DialogProps {
  open: boolean;
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
}

interface DialogContentProps {
  className?: string;
  children: React.ReactNode;
}

interface DialogHeaderProps {
  className?: string;
  children: React.ReactNode;
}

interface DialogFooterProps {
  className?: string;
  children: React.ReactNode;
}

interface DialogTitleProps {
  className?: string;
  children: React.ReactNode;
}

interface DialogDescriptionProps {
  className?: string;
  children: React.ReactNode;
}

interface DialogCloseProps {
  asChild?: boolean;
  children: React.ReactNode;
}

const Dialog: React.FC<DialogProps> = ({ open, onOpenChange, children }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm" 
        onClick={() => onOpenChange?.(false)}
      />
      <div className="relative">
        {children}
      </div>
    </div>
  );
};

const DialogContent: React.FC<DialogContentProps> = ({ className = "", children }) => {
  return (
    <div className={`
      relative w-full max-w-lg bg-slate-800/95 backdrop-blur-xl border border-slate-600/50 
      rounded-2xl p-6 shadow-2xl
      ${className}
    `}>
      {children}
    </div>
  );
};

const DialogHeader: React.FC<DialogHeaderProps> = ({ className = "", children }) => {
  return (
    <div className={`flex flex-col space-y-3 text-center sm:text-left ${className}`}>
      {children}
    </div>
  );
};

const DialogFooter: React.FC<DialogFooterProps> = ({ className = "", children }) => {
  return (
    <div className={`
      flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-3 
      space-y-3 space-y-reverse sm:space-y-0 mt-6
      ${className}
    `}>
      {children}
    </div>
  );
};

const DialogTitle: React.FC<DialogTitleProps> = ({ className = "", children }) => {
  return (
    <h2 className={`text-xl font-bold leading-none tracking-tight text-white ${className}`}>
      {children}
    </h2>
  );
};

const DialogDescription: React.FC<DialogDescriptionProps> = ({ className = "", children }) => {
  return (
    <p className={`text-sm text-slate-400 leading-relaxed ${className}`}>
      {children}
    </p>
  );
};

const DialogClose: React.FC<DialogCloseProps> = ({ asChild, children }) => {
  if (asChild) {
    return <>{children}</>;
  }
  
  return (
    <button className="absolute right-4 top-4 rounded-xl p-2 opacity-70 hover:opacity-100 hover:bg-slate-700/50 transition-all hover:scale-110">
      <X className="h-4 w-4 text-slate-400" />
      <span className="sr-only">Close</span>
    </button>
  );
};

export {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  DialogClose,
};
