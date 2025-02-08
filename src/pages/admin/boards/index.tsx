import React, { useState } from 'react';
import { Select } from '@/components/ui/select';

const BoardIndex: React.FC = () => {
  const [categoryFilter, setCategoryFilter] = useState('');

  return (
    <div>
      <Select 
        value={categoryFilter}
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setCategoryFilter(e.target.value)}
      >
        {/* Add your options here */}
      </Select>
    </div>
  );
};

export default BoardIndex; 