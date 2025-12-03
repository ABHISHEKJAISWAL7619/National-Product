import FinancialInputField from '@/components/atoms/FinancialInputField';
import React from 'react';

const Financial = () => {
  const arr = [
    { 
      title: "Price", 
      type: "text", 
      value: "1200", 
      description: "Item's Per Unit Price" 
    },
    { 
      title: "Inventory Value", 
      type: "text", 
      value: "8,00,000", 
      description: "Per unit cost * Quantity" 
    },
    { 
      title: "Total Sales", 
      type: "text", 
      value: "24,32,000", 
      description: "Lifetime Sales" 
    },
  ];

  return (
    <div className="p-4 w-full bg-white"> 
      <h2 className="text-xl mt-5 font-bold mb-6">Financial</h2>
      <div>
        {arr.map((item, i) => (
          <FinancialInputField
            key={i}
            title={item.title}
            type={item.type}
            placeholder={item.value}
            description={item.description}
          />
        ))}
      </div>
    </div>
  );
};

export default Financial;





