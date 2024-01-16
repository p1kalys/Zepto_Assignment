// App.tsx

import React from 'react';
import ChipInput from './ChipInput.tsx';

const App: React.FC = () => {
  const items = ['John Doe', 'Jane Doe', 'Nick Giannopoulos', 'Alice Smith', 'Bob Johnson'];

  return (
    <div>
      <h1> MultiSelect Sorted Chips </h1>
      <ChipInput items={items} />
    </div>
  );
};

export default App;
