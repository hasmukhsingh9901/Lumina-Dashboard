
import { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useDebounce } from '@/hooks/useDebounce';

interface SearchFilterProps {
  onSearchChange: (value: string) => void;
  onIdFilterChange: (value: string) => void;
}

const SearchFilter = ({ onSearchChange, onIdFilterChange }: SearchFilterProps) => {
  const [searchInput, setSearchInput] = useState('');
  const [idFilter, setIdFilter] = useState('');
  
  const debouncedSearch = useDebounce(searchInput, 300);
  const debouncedIdFilter = useDebounce(idFilter, 300);
  
  useEffect(() => {
    onSearchChange(debouncedSearch);
  }, [debouncedSearch, onSearchChange]);
  
  useEffect(() => {
    onIdFilterChange(debouncedIdFilter);
  }, [debouncedIdFilter, onIdFilterChange]);

  return (
    <div className="flex flex-col sm:flex-row gap-4">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search posts..."
          className="pl-10 glass-input w-full"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
      </div>
      
      <div className="w-full sm:w-32">
        <Input
          type="number"
          placeholder="Filter by ID"
          className="glass-input w-full"
          value={idFilter}
          onChange={(e) => setIdFilter(e.target.value)}
          min={1}
        />
      </div>
    </div>
  );
};

export default SearchFilter;
