import React from "react";
import { Button, Input } from "@/components/atoms";
import { cn } from "@/lib/utils";

interface FormFieldProps {
  label: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  required?: boolean;
}

/**
 * FormField - Molecular Component
 * 
 * A compound component combining Input (atom) with additional context.
 * Used in forms to group label, input, and error message together.
 */
const FormField: React.FC<FormFieldProps> = ({
  label,
  placeholder,
  value,
  onChange,
  error,
  required,
}) => {
  return (
    <div className="flex flex-col gap-2">
      <Input
        label={label}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        error={error}
        required={required}
      />
    </div>
  );
};

interface SearchBarProps {
  placeholder?: string;
  onSearch?: (query: string) => void;
}

/**
 * SearchBar - Molecular Component
 * 
 * A specialized search input combining Button and Input atoms.
 * Used for filtering and searching across the application.
 */
const SearchBar: React.FC<SearchBarProps> = ({
  placeholder = "Search...",
  onSearch,
}) => {
  const [query, setQuery] = React.useState("");

  const handleSearch = () => {
    if (onSearch) {
      onSearch(query);
    }
  };

  return (
    <div className="flex gap-2">
      <Input
        placeholder={placeholder}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="flex-1"
      />
      <Button
        onClick={handleSearch}
        variant="primary"
        className="whitespace-nowrap"
      >
        Search
      </Button>
    </div>
  );
};

export { FormField, SearchBar };
